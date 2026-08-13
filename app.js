import { removeBackground } from "https://jsdelivr.net";

// Node bindings
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const urlInput = document.getElementById('url-input');
const urlBtn = document.getElementById('url-btn');

const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const previewSection = document.getElementById('preview-section');

const inputImage = document.getElementById('input-image');
const outputImage = document.getElementById('output-image');
const downloadBtn = document.getElementById('download-btn');
const imgSpecs = document.getElementById('img-specs');

// Core Listeners
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => processIncomingFiles(e.target.files));

// URL Input Fetcher
urlBtn.addEventListener('click', async () => {
    const url = urlInput.value.trim();
    if (!url) return;
    updateStatus(true, "Fetching remote resource link...");
    try {
        const response = await fetch(url);
        const blob = await response.blob();
        processFileBlob(blob, "url-image.png");
    } catch (err) {
        alert("Failed to read image source URL. It may be blocked by CORS protections.");
        updateStatus(false);
    }
});

// Clipboard paste listener anywhere across the screen
window.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            const blob = item.getAsFile();
            processFileBlob(blob, "pasted-clip-image.png");
            break;
        }
    }
});

// Native Drag Operations
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.add('border-purple-500', 'bg-slate-950/70');
    }, false);
});
['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.classList.remove('border-purple-500', 'bg-slate-950/70');
    }, false);
});
dropZone.addEventListener('drop', (e) => {
    const dt = e.dataTransfer;
    if (dt.files.length > 0) processIncomingFiles(dt.files);
});

function processIncomingFiles(files) {
    if (files.length === 0) return;
    processFileBlob(files[0], files[0].name);
}

// Normalized workflow controller for rendering variations of graphics files
async function processFileBlob(blob, nativeFileName) {
    // Escape check to filter basic non-image text items
    if (!blob.type.startsWith('image/')) {
        alert("Selected asset is not a standardized image format structural file.");
        return;
    }

    updateStatus(true, "Normalizing file format parameters...");
    
    // Safety Canvas normalizer to support exotic formats (HEIC, RAW, BMP) properly
    try {
        const structuralImage = await createImageBitmap(blob);
        const processingCanvas = document.createElement('canvas');
        processingCanvas.width = structuralImage.width;
        processingCanvas.height = structuralImage.height;
        
        const context = processingCanvas.getContext('2d');
        context.drawImage(structuralImage, 0, 0);
        
        imgSpecs.innerText = `${structuralImage.width} × ${structuralImage.height}`;

        // Convert cleanly to an actionable blob format standard
        processingCanvas.toBlob(async (normalizedBlob) => {
            const dynamicLocalUrl = URL.createObjectURL(normalizedBlob);
            
            // Build Interface UI state views
            previewSection.classList.remove('hidden');
            inputImage.src = dynamicLocalUrl;
            outputImage.src = "";
            outputImage.classList.add('opacity-30');
            setDownloadButtonState(false);

            await runBackgroundRemovalAI(normalizedBlob, nativeFileName);
        }, 'image/png');

    } catch (error) {
        console.error("Renderer translation error: ", error);
        // Fallback to straight processing if context bitmap loading fails on specific configurations
        const standardUrl = URL.createObjectURL(blob);
        previewSection.classList.remove('hidden');
        inputImage.src = standardUrl;
        await runBackgroundRemovalAI(blob, nativeFileName);
    }
}

async function runBackgroundRemovalAI(targetBlob, outputName) {
    updateStatus(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        // Execute core ONNX layer
        const resultMaskBlob = await removeBackground(targetBlob, {
            progress: (instance, current, total) => {
                const percent = Math.round((current / total) * 100);
                updateStatus(true, `Processing asset structure... (${isNaN(percent) ? 0 : percent}%)`);
            }
        });

        const maskUrl = URL.createObjectURL(resultMaskBlob);
        outputImage.src = maskUrl;
        outputImage.classList.remove('opacity-30');
        
        // Wire interface command buttons
        setDownloadButtonState(true, () => {
            const anchor = document.createElement('a');
            anchor.href = maskUrl;
            const strippedName = outputName.substring(0, outputName.lastIndexOf('.')) || outputName;
            anchor.download = `${strippedName}_clearcut.png`;
            anchor.click();
        });

        updateStatus(false);
    } catch (aiError) {
        console.error(aiError);
        updateStatus(true, "Error running localized segmentation models. Reverting layout context.");
        setTimeout(() => updateStatus(false), 4000);
    }
}

function updateStatus(visible, textContent = "") {
    if (visible) {
        statusCard.classList.remove('hidden');
        statusText.innerText = textContent;
    } else {
        statusCard.classList.add('hidden');
    }
}

function setDownloadButtonState(active, callback = null) {
    if (active) {
        downloadBtn.classList.remove('opacity-50', 'pointer-events-none');
        downloadBtn.onclick = callback;
    } else {
        downloadBtn.classList.add('opacity-50', 'pointer-events-none');
        downloadBtn.onclick = null;
    }
}
