import { removeBackground } from "https://jsdelivr.net";

// User Interface Node Bindings
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

// Error Reporting Panel Node Bindings
const errorCard = document.getElementById('error-card');
const errorTitle = document.getElementById('error-title');
const errorBadge = document.getElementById('error-badge');
const errorDesc = document.getElementById('error-desc');
const errorTrace = document.getElementById('error-trace');

// Clear error banner on click
const errorClose = document.getElementById('error-close');
if (errorClose) {
    errorClose.addEventListener('click', () => errorCard.classList.add('hidden'));
}

// Global Core Script Error Interceptor
window.onerror = function (message, source, lineno, colno, error) {
    displayDiagnosticError(
        "Script Runtime Fault", 
        "Application JavaScript Error", 
        "An unexpected script issue occurred on the interface thread layer.", 
        `Message: ${message}\nSource: ${source}\nLine: ${lineno}:${colno}`
    );
    toggleLoadingState(false);
    return false;
};

// Click dropzone to open native file browser dialog
dropZone.addEventListener('click', () => fileInput.click());

// Handle standard manual button clicks
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        errorCard.classList.add('hidden');
        evaluateIncomingBlob(e.target.files[0], e.target.files[0].name);
    }
});

// Drag and Drop Layout Event Interceptors
['dragenter', 'dragover'].forEach(interactionTag => {
    dropZone.addEventListener(interactionTag, (eventState) => {
        eventState.preventDefault();
        dropZone.style.borderColor = "var(--accent-purple)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
    }, false);
});

['dragleave', 'drop'].forEach(interactionTag => {
    dropZone.addEventListener(interactionTag, (eventState) => {
        eventState.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
    }, false);
});

dropZone.addEventListener('drop', (dropEvent) => {
    dropEvent.preventDefault();
    errorCard.classList.add('hidden');
    
    const transferPayload = dropEvent.dataTransfer;
    if (transferPayload && transferPayload.files.length > 0) {
        const droppedFile = transferPayload.files[0];
        evaluateIncomingBlob(droppedFile, droppedFile.name);
    }
});

// Web Address URL Asset Import Engine
urlBtn.addEventListener('click', async () => {
    const targetUrl = urlInput.value.trim();
    if (!targetUrl) return;
    
    errorCard.classList.add('hidden'); 
    toggleLoadingState(true, "Fetching remote resource link standard parameters...");
    
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP Error Code: ${response.status}`);
        const blobStream = await response.blob();
        evaluateIncomingBlob(blobStream, "downloaded-url-resource.png");
    } catch (networkError) {
        displayDiagnosticError(
            "CORS or Network Blocked",
            "Network Request Failure",
            "Could not pull the graphic from the external web link. The target domain likely prevents script access due to Cross-Origin Resource Sharing (CORS) isolation laws.",
            networkError.message
        );
        toggleLoadingState(false);
    }
});

// OS Clipboard Instant Paste Event Handling Hook
window.addEventListener('paste', async (pasteEvent) => {
    const clipItems = pasteEvent.clipboardData?.items;
    if (!clipItems) return;
    for (let currentItem of clipItems) {
        if (currentItem.type.indexOf("image") !== -1) {
            errorCard.classList.add('hidden');
            const dataBlob = currentItem.getAsFile();
            evaluateIncomingBlob(dataBlob, "pasted-clipboard-asset.png");
            break;
        }
    }
});

// Normalized Data Controller: Normalizes raw formats into standard 2D contexts
async function evaluateIncomingBlob(fileBlob, outputReferenceName) {
    if (!fileBlob || !fileBlob.type.startsWith('image/')) {
        displayDiagnosticError(
            "Invalid Structural Type",
            "File Verification Fault",
            "The chosen asset presents an invalid structural MIME standard tag signature.",
            "Processing cancelled."
        );
        return;
    }

    toggleLoadingState(true, "Aligning image boundary coordinate streams...");
    
    try {
        const visualBitmap = await createImageBitmap(fileBlob);
        const transformCanvas = document.createElement('canvas');
        transformCanvas.width = visualBitmap.width;
        transformCanvas.height = visualBitmap.height;
        
        const render2DContext = transformCanvas.getContext('2d');
        if (!render2DContext) throw new Error("Could not initialize 2D context canvas.");
        
        render2DContext.drawImage(visualBitmap, 0, 0);
        imgSpecs.innerText = `${visualBitmap.width} × ${visualBitmap.height}`;

        transformCanvas.toBlob(async (pngBlobPayload) => {
            if (!pngBlobPayload) throw new Error("Canvas payload export pipeline failure.");
            const sourceUrlReference = URL.createObjectURL(pngBlobPayload);
            
            previewSection.classList.remove('hidden');
            inputImage.src = sourceUrlReference;
            outputImage.src = "";
            outputImage.classList.add('opacity-dim');
            configureDownloadTriggerState(false);

            await executeONNXSegmentationAI(pngBlobPayload, outputReferenceName);
        }, 'image/png');

    } catch (renderingFault) {
        // Fallback processing attempt if canvas acceleration framework fails
        try {
            const secondarySourceUrl = URL.createObjectURL(fileBlob);
            previewSection.classList.remove('hidden');
            inputImage.src = secondarySourceUrl;
            await executeONNXSegmentationAI(fileBlob, outputReferenceName);
        } catch (fallbackFault) {
            displayDiagnosticError(
                "Decompression Crash",
                "Canvas Context Loss",
                "The browser failed to cleanly read or draw this binary image file structure onto the layout view.",
                renderingFault.message
            );
            toggleLoadingState(false);
        }
    }
}

// Executes background extraction model operation locally
async function executeONNXSegmentationAI(binaryTargetBlob, finalNameString) {
    toggleLoadingState(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        const processedBlobOutput = await removeBackground(binaryTargetBlob, {
            progress: (instance, computedUnits, maxUnits) => {
                const extractionPercentage = Math.round((computedUnits / maxUnits) * 100);
                toggleLoadingState(true, `Analyzing focal subject shapes... (${isNaN(extractionPercentage) ? 0 : extractionPercentage}%)`);
            }
        });

        const explicitMaskUrl = URL.createObjectURL(processedBlobOutput);
        outputImage.src = explicitMaskUrl;
        outputImage.classList.remove('opacity-dim');
        
        configureDownloadTriggerState(true, () => {
            const anchorElement = document.createElement('a');
            anchorElement.href = explicitMaskUrl;
            const absoluteCleanName = finalNameString.substring(0, finalNameString.lastIndexOf('.')) || finalNameString;
            anchorElement.download = `${absoluteCleanName}_clearcut.png`;
            anchorElement.click();
        });

        toggleLoadingState(false);
    } catch (aiModelProcessingFault) {
        displayDiagnosticError(
            "Neural Engine Failure",
            "ONNX Pipeline Break",
            "The localized background extraction model crashed. This typically happens if the browser tab runs low on memory space.",
            aiModelProcessingFault.message || "WASM Memory limits reached."
        );
        toggleLoadingState(false);
    }
}

function displayDiagnosticError(badgeString, headlineString, paragraphString, stackTraceData) {
    errorBadge.innerText = badgeString;
    errorTitle.innerText = headlineString;
    errorDesc.innerText = paragraphString;
    errorTrace.innerText = stackTraceData || "No technical logs provided.";
    errorCard.classList.remove('hidden');
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleLoadingState(shouldDisplay, dynamicText = "") {
    if (shouldDisplay) {
        statusCard.classList.remove('hidden');
        statusText.innerText = dynamicText;
    } else {
        statusCard.classList.add('hidden');
    }
}

function configureDownloadTriggerState(isAvailable, executionCallback = null) {
    if (isAvailable) {
        downloadBtn.classList.remove('disabled');
        downloadBtn.onclick = executionCallback;
    } else {
        downloadBtn.classList.add('disabled');
        downloadBtn.onclick = null;
    }
}
