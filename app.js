// import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm";

// // User Interface DOM Target Connections
// const dropZone = document.getElementById('drop-zone');
// const fileInput = document.getElementById('file-input');
// const urlInput = document.getElementById('url-input');
// const urlBtn = document.getElementById('url-btn');

// const statusCard = document.getElementById('status-card');
// const statusText = document.getElementById('status-text');
// const previewSection = document.getElementById('preview-section');

// const inputImage = document.getElementById('input-image');
// const outputImage = document.getElementById('output-image');
// const downloadBtn = document.getElementById('download-btn');
// const imgSpecs = document.getElementById('img-specs');

// const errorCard = document.getElementById('error-card');
// const errorTitle = document.getElementById('error-title');
// const errorBadge = document.getElementById('error-badge');
// const errorDesc = document.getElementById('error-desc');
// const errorTrace = document.getElementById('error-trace');

// // Core Click Setup: Click the box area to activate browsing windows
// dropZone.addEventListener('click', () => fileInput.click());

// // Handle explicit system browse selection uploads
// fileInput.addEventListener('change', (event) => {
//     if (event.target.files && event.target.files.length > 0) {
//         clearActiveErrors();
//         // UNPACK ACTION: Safely extract the raw File element from the wrapper collection array
//         const rawFileObj = event.target.files[0];
//         processTargetBlob(rawFileObj);
//     }
// });

// // Drag and Drop Layout Event Interceptors
// ['dragenter', 'dragover'].forEach(eventName => {
//     dropZone.addEventListener(eventName, (e) => {
//         e.preventDefault();
//         dropZone.style.borderColor = "var(--accent-purple)";
//         dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
//     }, false);
// });

// ['dragleave', 'drop'].forEach(eventName => {
//     dropZone.addEventListener(eventName, (e) => {
//         e.preventDefault();
//         dropZone.style.borderColor = "var(--border-color)";
//         dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
//     }, false);
// });

// // Drop zone drop trigger processor
// dropZone.addEventListener('drop', (e) => {
//     e.preventDefault();
//     clearActiveErrors();
    
//     const dataPayload = e.dataTransfer;
//     if (dataPayload && dataPayload.files && dataPayload.files.length > 0) {
//         // UNPACK ACTION: Safely pull index zero from the drag file collection stream
//         const rawFileObj = dataPayload.files[0];
//         processTargetBlob(rawFileObj);
//     }
// });

// // Clipboard Paste Actions Loader Tracker
// window.addEventListener('paste', async (e) => {
//     const clipboardPayload = e.clipboardData?.items;
//     if (!clipboardPayload) return;
    
//     for (let item of clipboardPayload) {
//         if (item.type.indexOf("image") !== -1) {
//             clearActiveErrors();
//             const matchingFile = item.getAsFile();
//             processTargetBlob(matchingFile);
//             break;
//         }
//     }
// });

// // Fetch Remote Web Address URLs
// urlBtn.addEventListener('click', async () => {
//     const rawUrl = urlInput.value.trim();
//     if (!rawUrl) return;
    
//     clearActiveErrors();
//     toggleLoaderDisplay(true, "Downloading image file from URL stream...");
    
//     try {
//         const response = await fetch(rawUrl);
//         if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
//         const imageBlob = await response.blob();
//         processTargetBlob(imageBlob, "downloaded_image.png");
//     } catch (err) {
//         showDiagnosticCrashCard(
//             "Network Request Blocked",
//             "CORS Access Error",
//             "Could not load the image from that URL. The website hosting this image blocks direct script access due to Cross-Origin Security Laws.",
//             err.message
//         );
//         toggleLoaderDisplay(false);
//     }
// });

// // Core File Processor
// async function processTargetBlob(incomingFileOrBlob) {
//     if (!incomingFileOrBlob) return;

//     // Check file structure type configurations safely
//     if (!incomingFileOrBlob.type || !incomingFileOrBlob.type.startsWith('image/')) {
//         showDiagnosticCrashCard(
//             "Format Rejection",
//             "Unsupported Extension Type",
//             "The upload failed because this file type is not a valid format. Please choose an image like PNG, JPG, or WEBP.",
//             `Received Type: ${incomingFileOrBlob.type || 'Unknown'}`
//         );
//         return;
//     }

//     toggleLoaderDisplay(true, "Decoding graphical layout arrays...");
//     const dynamicFallbackName = incomingFileOrBlob.name || "processed_asset.png";

//     try {
//         const decodedBitmap = await createImageBitmap(incomingFileOrBlob);
//         const internalCanvas = document.createElement('canvas');
//         internalCanvas.width = decodedBitmap.width;
//         internalCanvas.height = decodedBitmap.height;
        
//         const context = internalCanvas.getContext('2d');
//         if (!context) throw new Error("Could not draw local pixel buffer allocations.");
        
//         context.drawImage(decodedBitmap, 0, 0);
//         imgSpecs.innerText = `${decodedBitmap.width} × ${decodedBitmap.height}`;

//         internalCanvas.toBlob(async (compiledPngBlob) => {
//             if (!compiledPngBlob) throw new Error("Canvas pipeline compilation failed.");
            
//             const liveUrlView = URL.createObjectURL(compiledPngBlob);
            
//             previewSection.classList.remove('hidden');
//             inputImage.src = liveUrlView;
//             outputImage.src = "";
//             outputImage.classList.add('opacity-dim');
//             setDownloadButtonState(false);

//             await runNeuralBackgroundAI(compiledPngBlob, dynamicFallbackName);
//         }, 'image/png');

//     } catch (pipelineFault) {
//         console.warn("Canvas hardware accelerator unavailable. Reverting to direct link layout streams: ", pipelineFault);
//         try {
//             const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
//             previewSection.classList.remove('hidden');
//             inputImage.src = rawDirectUrl;
//             await runNeuralBackgroundAI(incomingFileOrBlob, dynamicFallbackName);
//         } catch (finalCrashState) {
//             showDiagnosticCrashCard(
//                 "Image Loading Error",
//                 "Layout Reader Fault",
//                 "The browser failed to read or display this image layout structure.",
//                 pipelineFault.message
//             );
//             toggleLoaderDisplay(false);
//         }
//     }
// }

// // Executes background removal model natively via ONNX WebAssembly
// async function runNeuralBackgroundAI(cleanPngBlob, originalFileName) {
//     toggleLoaderDisplay(true, "AI executing background segmentation layer (Computing locally)...");
//     try {
//         const outputResultBlob = await removeBackground(cleanPngBlob, {
//             progress: (instance, doneAmount, totalAmount) => {
//                 const percentDone = Math.round((doneAmount / totalAmount) * 100);
//                 toggleLoaderDisplay(true, `Isolating subject shapes... (${isNaN(percentDone) ? 0 : percentDone}%)`);
//             }
//         });

//         const maskObjectURL = URL.createObjectURL(outputResultBlob);
//         outputImage.src = maskObjectURL;
//         outputImage.classList.remove('opacity-dim');
        
//         setDownloadButtonState(true, () => {
//             const transferAnchor = document.createElement('a');
//             transferAnchor.href = maskObjectURL;
//             const basicCleanedName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
//             transferAnchor.download = `${basicCleanedName}_clearcut.png`;
//             transferAnchor.click();
//         });

//         toggleLoaderDisplay(false);
//     } catch (aiComputeFault) {
//         showDiagnosticCrashCard(
//             "AI Core Engine Issue",
//             "ONNX Model Memory Exception",
//             "The background removal failed. This usually happens if your browser tab runs out of memory while processing very large high-resolution images.",
//             aiComputeFault.message || "WASM Stack limit reached"
//         );
//         toggleLoaderDisplay(false);
//     }
// }

// function clearActiveErrors() {
//     errorCard.classList.add('hidden');
// }

// function showDiagnosticCrashCard(badge, title, message, stackTrace) {
//     errorBadge.innerText = badge;
//     errorTitle.innerText = title;
//     errorDesc.innerText = message;
//     errorTrace.innerText = stackTrace || "No structural trace reporting active.";
//     errorCard.classList.remove('hidden');
//     errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
// }

// function toggleLoaderDisplay(visible, trackingText = "") {
//     if (visible) {
//         statusCard.classList.remove('hidden');
//         statusText.innerText = trackingText;
//     } else {
//         statusCard.classList.add('hidden');
//     }
// }

// function setDownloadButtonState(enabled, clickCallback = null) {
//     if (enabled) {
//         downloadBtn.classList.remove('disabled');
//         downloadBtn.onclick = clickCallback;
//     } else {
//         downloadBtn.classList.add('disabled');
//         downloadBtn.onclick = null;
//     }
// }








import { removeBackground } from "https://jsdelivr.net";
import { pipeline } from "https://jsdelivr.net";

// Connect to your exact DOM element structures
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const urlInput = document.getElementById('url-input');
const urlBtn = document.getElementById('url-btn');
const promptInput = document.getElementById('prompt-input');

const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const previewSection = document.getElementById('preview-section');
const aiThoughtBox = document.getElementById('ai-thought-box');

const inputImage = document.getElementById('input-image');
const outputImage = document.getElementById('output-image');
const downloadBtn = document.getElementById('download-btn');
const imgSpecs = document.getElementById('img-specs');

const errorCard = document.getElementById('error-card');
const errorTitle = document.getElementById('error-title');
const errorBadge = document.getElementById('error-badge');
const errorDesc = document.getElementById('error-desc');
const errorTrace = document.getElementById('error-trace');

// Model Memory Cache states
let visionModelCache = null;

// Activate upload window on clicking your working container
dropZone.addEventListener('click', () => fileInput.click());

// Hand over your selected file using your previous working array extractor logic
fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        clearActiveErrors();
        processMasterUploadPipeline(e.target.files[0]);
    }
});

// Drag and drop controls matched directly to your layout styles
['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--accent-purple)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
    }, false);
});
['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
    }, false);
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    clearActiveErrors();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processMasterUploadPipeline(e.dataTransfer.files[0]);
    }
});

// OS Clipboard Instant Paste Event Handling Hook
window.addEventListener('paste', async (e) => {
    const clipItems = e.clipboardData?.items;
    if (!clipItems) return;
    for (let item of clipItems) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            processMasterUploadPipeline(item.getAsFile());
            break;
        }
    }
});

// Fetch Remote URL addresses smoothly
urlBtn.addEventListener('click', async () => {
    const rawUrl = urlInput.value.trim();
    if (!rawUrl) return;
    clearActiveErrors();
    toggleLoader(true, "Downloading web image file URL stream...");
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const imageBlob = await response.blob();
        processMasterUploadPipeline(imageBlob);
    } catch (err) {
        showCrashCard("URL Blocked", "CORS Restriction Exception", "Could not fetch image. The server hosting it blocks browser script access.", err.message);
        toggleLoader(false);
    }
});
// ==========================================
// TWO-STAGE AI PIPELINE COMPUTE OPERATIONS
// ==========================================
async function processMasterUploadPipeline(rawFileOrBlob) {
    if (!rawFileOrBlob) return;
    
    // Safety file format verification check
    if (!rawFileOrBlob.type || !rawFileOrBlob.type.startsWith('image/')) {
        showCrashCard("Format Denied", "Unsupported Extension File", "Please upload a standardized image format like PNG, JPG, or WEBP.", "");
        return;
    }

    toggleLoader(true, "Stage 1: Waking local AI Vision Analysis model...");
    const temporarySourceUrl = URL.createObjectURL(rawFileOrBlob);

    try {
        // Initialize HuggingFace Vision Processor model completely inside the browser client thread
        if (!visionModelCache) {
            visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        }
        
        toggleLoader(true, "AI reading composition elements & checking edge contrast parameters...");
        const visionAnalysisOutput = await visionModelCache(temporarySourceUrl);
        const classificationText = visionAnalysisOutput?.[0]?.generated_text || "unidentified image scenery contours";

        toggleLoader(true, "Normalizing file pixel curves & enhancing edge details...");
        
        // Execute canvas filter modifications dynamically
        const enhancedBlobPayload = await applyImageProcessingPipeline(rawFileOrBlob, classificationText, promptInput.value.trim());
        const dynamicEnhancedUrl = URL.createObjectURL(enhancedBlobPayload);

        // Update Viewport frames
        previewSection.classList.remove('hidden');
        inputImage.src = dynamicEnhancedUrl;
        outputImage.src = "";
        outputImage.classList.add('opacity-dim');
        setDownloadButton(false);
        aiThoughtBox.innerHTML = `<strong>AI Analysis:</strong> Found "${classificationText}". Pre-tuned contrast matrix to optimize background removal sharpness!`;

        // STAGE 2: Pass the optimized image straight into the background removal tool instantly
        toggleLoader(true, "Stage 2: AI calculating background extraction mask contours (Computing locally)...");
        
        const clearCutoutBlob = await removeBackground(enhancedBlobPayload, {
            progress: (instance, done, max) => {
                const percentageDone = Math.round((done / max) * 100);
                toggleLoader(true, `Stripping background elements... (${isNaN(percentageDone) ? 0 : percentageDone}%)`);
            }
        });

        const cleanMaskObjectURL = URL.createObjectURL(clearCutoutBlob);
        outputImage.src = cleanMaskObjectURL;
        outputImage.classList.remove('opacity-dim');

        setDownloadButton(true, () => {
            const anchor = document.createElement('a');
            anchor.href = cleanMaskObjectURL;
            anchor.download = `clearcut_pro_${rawFileOrBlob.name || 'asset.png'}`;
            anchor.click();
        });

        toggleLoader(false);

    } catch (pipelineCrash) {
        showCrashCard("Pipeline Error", "Processing Layer Exception", "An error occurred during image compilation steps.", pipelineCrash.message);
        toggleLoader(false);
    }
}

// Canvas Matrix Image Processing Operations Filter Engine
function applyImageProcessingPipeline(blobSource, aiClassification, userDirectivePrompt) {
    return new Promise((resolve, reject) => {
        const imageFrame = new Image();
        imageFrame.src = URL.createObjectURL(blobSource);
        imageFrame.onload = () => {
            const processingCanvas = document.createElement('canvas');
            processingCanvas.width = imageFrame.width;
            processingCanvas.height = imageFrame.height;
            imgSpecs.innerText = `${imageFrame.width} × ${imageFrame.height}`;
            
            const context2D = processingCanvas.getContext('2d');
            let structuralFilterMatrix = "contrast(1.20) brightness(1.05) saturate(1.10)";
            
            const evaluateCombinedPrompts = (aiClassification + " " + userDirectivePrompt).toLowerCase();
            
            // Adjust canvas balance sliders automatically based on vision analysis or prompt tags
            if (evaluateCombinedPrompts.includes("sharpen") || evaluateCombinedPrompts.includes("dark") || evaluateCombinedPrompts.includes("pop")) {
                structuralFilterMatrix = "contrast(1.40) brightness(0.98) saturate(1.15)";
            } else if (evaluateCombinedPrompts.includes("bright") || evaluateCombinedPrompts.includes("light")) {
                structuralFilterMatrix = "contrast(1.15) brightness(1.18)";
            }
            
            context2D.filter = structuralFilterMatrix;
            context2D.drawImage(imageFrame, 0, 0);
            
            processingCanvas.toBlob((compiledBlobChunk) => {
                if (compiledBlobChunk) resolve(compiledBlobChunk);
                else reject(new Error("Canvas compilation tracking failure"));
            }, 'image/png');
        };
        imageFrame.onerror = () => reject(new Error("Image data translation failure"));
    });
}

function clearActiveErrors() { errorCard.classList.add('hidden'); }
function toggleLoader(show, labelText = "") {
    if (show) { statusCard.classList.remove('hidden'); statusText.innerText = labelText; }
    else { statusCard.classList.add('hidden'); }
}
function setDownloadButton(active, executionCallback = null) {
    if (active) { downloadBtn.classList.remove('disabled'); downloadBtn.onclick = executionCallback; }
    else { downloadBtn.classList.add('disabled'); downloadBtn.onclick = null; }
}
function showCrashCard(badge, title, bodyMessage, logs) {
    errorBadge.innerText = badge; errorTitle.innerText = title; errorDesc.innerText = bodyMessage; errorTrace.innerText = logs;
    errorCard.classList.remove('hidden'); errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
