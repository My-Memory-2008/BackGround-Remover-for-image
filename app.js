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
const errorClose = document.getElementById('error-close');

// Global Core Script Error Interceptor (Catches syntax slipups, script loading cuts)
window.onerror = function (message, source, lineno, colno, error) {
    displayDiagnosticError(
        "Script Runtime Fault", 
        "Application JavaScript Error", 
        "An unexpected script issue occurred on the interface thread layer.", 
        `Message: ${message}\nSource: ${source}\nLine: ${lineno}:${colno}\nStack: ${error?.stack || 'N/A'}`
    );
    toggleLoadingState(false);
    return false;
};

// Clear error banner on click
errorClose.addEventListener('click', () => errorCard.classList.add('hidden'));

// Main Target Upload Event Hooks
dropZone.addEventListener('click', () => fileInput.click());
fileInput.addEventListener('change', (e) => handleSelectedFileGroup(e.target.files));

// Web Address URL Asset Import Engine
urlBtn.addEventListener('click', async () => {
    const targetUrl = urlInput.value.trim();
    if (!targetUrl) return;
    
    errorCard.classList.add('hidden'); // Clear past crash cards
    toggleLoadingState(true, "Fetching remote resource link standard parameters...");
    
    try {
        const response = await fetch(targetUrl);
        if (!response.ok) throw new Error(`HTTP Error Code status context: ${response.status} - ${response.statusText}`);
        const blobStream = await response.blob();
        evaluateIncomingBlob(blobStream, "downloaded-url-resource.png");
    } catch (networkError) {
        displayDiagnosticError(
            "CORS or Network Blocked",
            "Network Request Failure",
            "Could not pull the graphic from the external web link. The target domain likely prevents script access due to Cross-Origin Resource Sharing (CORS) isolation laws.",
            networkError.stack || networkError.message
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

// Native Layout Drag Overlay Mechanics
['dragenter', 'dragover'].forEach(interactionTag => {
    dropZone.addEventListener(interactionTag, (eventState) => {
        eventState.preventDefault();
        dropZone.classList.add('border-purple-500', 'bg-slate-950/60');
    }, false);
});
['dragleave', 'drop'].forEach(interactionTag => {
    dropZone.addEventListener(interactionTag, (eventState) => {
        eventState.preventDefault();
        dropZone.classList.remove('border-purple-500', 'bg-slate-950/60');
    }, false);
});
dropZone.addEventListener('drop', (dropEvent) => {
    const transferPayload = dropEvent.dataTransfer;
    if (transferPayload.files.length > 0) handleSelectedFileGroup(transferPayload.files);
});

function handleSelectedFileGroup(fileList) {
    if (fileList.length === 0) return;
    errorCard.classList.add('hidden');
    evaluateIncomingBlob(fileList[0], fileList[0].name);
}

// Normalized Data Controller: Normalizes raw formats into standard 2D contexts
async function evaluateIncomingBlob(fileBlob, outputReferenceName) {
    if (!fileBlob.type.startsWith('image/')) {
        displayDiagnosticError(
            "Invalid Structural Type",
            "File Verification Fault",
            `The chosen asset presents an invalid structural MIME standard tag signature: "${fileBlob.type || 'Unknown'}"`,
            "Validation check blocked. Processing cancelled."
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
        if (!render2DContext) throw new Error("Could not initialize 2D context engine canvas layouts.");
        
        render2DContext.drawImage(visualBitmap, 0, 0);
        imgSpecs.innerText = `${visualBitmap.width} × ${visualBitmap.height}`;

        transformCanvas.toBlob(async (pngBlobPayload) => {
            if (!pngBlobPayload) throw new Error("Canvas payload export pipeline failure.");
            const sourceUrlReference = URL.createObjectURL(pngBlobPayload);
            
            previewSection.classList.remove('hidden');
            inputImage.src = sourceUrlReference;
            outputImage.src = "";
            outputImage.classList.add('opacity-30');
            configureDownloadTriggerState(false);

            await executeONNXSegmentationAI(pngBlobPayload, outputReferenceName);
        }, 'image/png');

    } catch (renderingFault) {
        console.warn("Hardware rendering context fallback active: ", renderingFault);
        try {
            const secondarySourceUrl = URL.createObjectURL(fileBlob);
            previewSection.classList.remove('hidden');
            inputImage.src = secondarySourceUrl;
            await executeONNXSegmentationAI(fileBlob, outputReferenceName);
        } catch (fallbackFault) {
            displayDiagnosticError(
                "Decompression Crash",
                "Canvas Context Loss",
                "The browser failed to cleanly read, step through, or draw this binary image file structure onto the layout view.",
                `${renderingFault.stack || renderingFault.message}\nFallback log trail: ${fallbackFault.message}`
            );
            toggleLoadingState(false);
        }
    }
}

// Interacts with ONNX WASM neural network weights entirely in local storage memory spaces
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
        outputImage.classList.remove('opacity-30');
        
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
            "The localized background extraction model crashed. This typically happens if the browser tabs run low on accessible device RAM or if WebAssembly parallel textures are blocked.",
            aiModelProcessingFault.stack || aiModelProcessingFault.message || JSON.stringify(aiModelProcessingFault)
        );
        toggleLoadingState(false);
    }
}

function displayDiagnosticError(badgeString, headlineString, paragraphString, stackTraceData) {
    errorBadge.innerText = badgeString;
    errorTitle.innerText = headlineString;
    errorDesc.innerText = paragraphString;
    errorTrace.innerText = stackTraceData || "No technical stack frames provided by the engine thread.";
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
        downloadBtn.classList.remove('opacity-40', 'pointer-events-none');
        downloadBtn.onclick = executionCallback;
    } else {
        downloadBtn.classList.add('opacity-40', 'pointer-events-none');
        downloadBtn.onclick = null;
    }
}
