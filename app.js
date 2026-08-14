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

// Node target lookups - Section 1 (Vision Optimizer)
const dropZoneVision = document.getElementById('drop-zone-vision');
const fileInputVision = document.getElementById('file-input-vision');
const promptInput = document.getElementById('prompt-input');
const analyzeBtn = document.getElementById('analyze-btn');
const visionPreviewArea = document.getElementById('vision-preview-area');
const enhancedPreviewImage = document.getElementById('enhanced-preview-image');
const aiThoughtBox = document.getElementById('ai-thought-box');

// Node target lookups - Section 2 (Background Remover)
const dropZoneRemover = document.getElementById('drop-zone-remover');
const fileInputRemover = document.getElementById('file-input-remover');
const processBgBtn = document.getElementById('process-bg-btn');
const previewSection = document.getElementById('preview-section');
const inputImage = document.getElementById('input-image');
const outputImage = document.getElementById('output-image');
const downloadBtn = document.getElementById('download-btn');
const imgSpecs = document.getElementById('img-specs');

// Shared UI Components
const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const errorCard = document.getElementById('error-card');
const errorTitle = document.getElementById('error-title');
const errorBadge = document.getElementById('error-badge');
const errorDesc = document.getElementById('error-desc');
const errorTrace = document.getElementById('error-trace');

// Data State variables
let visionFileBlobObject = null;
let removerFileBlobObject = null;
let enhancedBlobResult = null;
let visionModelCache = null;

// ==========================================
// SECTION 1 ACTIONS (Vision Tuning Panel)
// ==========================================
dropZoneVision.addEventListener('click', () => fileInputVision.click());

fileInputVision.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        visionFileBlobObject = e.target.files[0];
        analyzeBtn.classList.remove('disabled');
        dropZoneVision.style.borderColor = "var(--success-green)";
        errorCard.classList.add('hidden');
    }
});

// Drag and drop for Section 1
setupDragAndDropEvents(dropZoneVision, (files) => {
    visionFileBlobObject = files[0];
    analyzeBtn.classList.remove('disabled');
    dropZoneVision.style.borderColor = "var(--success-green)";
});

// Run Vision Optimization Execution Script Loop
analyzeBtn.addEventListener('click', async () => {
    if (!visionFileBlobObject) return;
    
    errorCard.classList.add('hidden');
    toggleLoader(true, "Loading local vision model into browser memory space...");
    
    try {
        if (!visionModelCache) {
            visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        }
        
        toggleLoader(true, "AI parsing lighting values and checking feature definition...");
        const imageURL = URL.createObjectURL(visionFileBlobObject);
        
        const visionAnalysisOutput = await visionModelCache(imageURL);
        const descriptionText = visionAnalysisOutput?.[0]?.generated_text || "unidentifiable visual layers";
        
        toggleLoader(true, "Compiling balance filters and rendering adjustments...");
        enhancedBlobResult = await applyImageProcessingPipeline(visionFileBlobObject, descriptionText, promptInput.value.trim());
        
        // Show Vision Output block
        visionPreviewArea.classList.remove('hidden');
        enhancedPreviewImage.src = URL.createObjectURL(enhancedBlobResult);
        aiThoughtBox.innerHTML = `<strong>AI Diagnosis:</strong> Identified "${descriptionText}". Adjusted separation ratios & contrast dynamically. <em>This optimized output has been auto-queued to Section 2 below!</em>`;
        
        // AUTO-FORWARD OUTPUT: Send this tuned version straight to Section 2's holding bay
        removerFileBlobObject = enhancedBlobResult;
        processBgBtn.classList.remove('disabled');
        dropZoneRemover.style.borderColor = "var(--accent-purple)";
        
        toggleLoader(false);
    } catch (fault) {
        showCrashCard("Vision Fault", "Analysis Loop Interrupted", "The vision module ran into an initialization context error.", fault.message);
        toggleLoader(false);
    }
});
// ==========================================
// SECTION 2 ACTIONS (Background Eraser)
// ==========================================
dropZoneRemover.addEventListener('click', () => fileInputRemover.click());

fileInputRemover.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        removerFileBlobObject = e.target.files[0];
        processBgBtn.classList.remove('disabled');
        dropZoneRemover.style.borderColor = "var(--success-green)";
        errorCard.classList.add('hidden');
    }
});

// Drag and drop for Section 2
setupDragAndDropEvents(dropZoneRemover, (files) => {
    removerFileBlobObject = files[0];
    processBgBtn.classList.remove('disabled');
    dropZoneRemover.style.borderColor = "var(--success-green)";
});

// Main Background Stripping Action Execution
processBgBtn.addEventListener('click', async () => {
    if (!removerFileBlobObject) return;
    
    errorCard.classList.add('hidden');
    toggleLoader(true, "AI evaluating subject masks (Processing completely locally)...");
    
    try {
        // Render source view frames
        previewSection.classList.remove('hidden');
        inputImage.src = URL.createObjectURL(removerFileBlobObject);
        outputImage.src = "";
        outputImage.classList.add('opacity-dim');
        setDownloadButton(false);

        const transparentOutputBlob = await removeBackground(removerFileBlobObject, {
            progress: (instance, current, total) => {
                const percent = Math.round((current / total) * 100);
                toggleLoader(true, `Extracting core subject vectors... (${isNaN(percent) ? 0 : percent}%)`);
            }
        });
        
        const explicitResultUrl = URL.createObjectURL(transparentOutputBlob);
        outputImage.src = explicitResultUrl;
        outputImage.classList.remove('opacity-dim');
        
        setDownloadButton(true, () => {
            const downloadNode = document.createElement('a');
            downloadNode.href = explicitResultUrl;
            downloadNode.download = `clearcut_pipeline_asset.png`;
            downloadNode.click();
        });
        
        toggleLoader(false);
    } catch (aiError) {
        showCrashCard("Neural Network Exception", "ONNX Execution Space Overflow", "The background remover script encountered an execution limit.", aiError.message);
        toggleLoader(false);
    }
});

// Shared Clipboard paste hook listener
window.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            const binaryFile = item.getAsFile();
            // Paste populates both holding states for convenience
            visionFileBlobObject = binaryFile;
            removerFileBlobObject = binaryFile;
            analyzeBtn.classList.remove('disabled');
            processBgBtn.classList.remove('disabled');
            dropZoneVision.style.borderColor = "var(--success-green)";
            dropZoneRemover.style.borderColor = "var(--success-green)";
            break;
        }
    }
});

// Helper setup method for parsing layout drops cleanly
function setupDragAndDropEvents(elementNode, customCallback) {
    ['dragenter', 'dragover'].forEach(name => {
        elementNode.addEventListener(name, (e) => {
            e.preventDefault();
            elementNode.style.borderColor = "var(--accent-purple)";
        }, false);
    });
    ['dragleave', 'drop'].forEach(name => {
        elementNode.addEventListener(name, (e) => {
            e.preventDefault();
            elementNode.style.borderColor = "var(--border-color)";
        }, false);
    });
    elementNode.addEventListener('drop', (e) => {
        e.preventDefault();
        clearActiveErrors();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            customCallback(e.dataTransfer.files);
        }
    });
}

// Canvas Tuning Operations Engine
function applyImageProcessingPipeline(blobData, modelTags, userPrompt) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blobData);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            imgSpecs.innerText = `${img.width} × ${img.height}`;
            
            const ctx = canvas.getContext('2d');
            let canvasFilterMatrix = "contrast(1.25) brightness(1.05) saturate(1.10)";
            
            const combinedString = (modelTags + " " + userPrompt).toLowerCase();
            if (combinedString.includes("sharpen") || combinedString.includes("pop") || combinedString.includes("dark")) {
                canvasFilterMatrix = "contrast(1.40) brightness(0.98) saturate(1.15)";
            } else if (combinedString.includes("bright") || combinedString.includes("light")) {
                canvasFilterMatrix = "contrast(1.15) brightness(1.18)";
            }
            
            ctx.filter = canvasFilterMatrix;
            ctx.drawImage(img, 0, 0);
            
            canvas.toBlob((finishedBlob) => {
                if (finishedBlob) resolve(finishedBlob);
                else reject(new Error("Canvas serialization breakdown"));
            }, 'image/png');
        };
        img.onerror = () => reject(new Error("Image normalization tracking failure"));
    });
}

function clearActiveErrors() { errorCard.classList.add('hidden'); }
function toggleLoader(show, text = "") {
    if (show) { statusCard.classList.remove('hidden'); statusText.innerText = text; }
    else { statusCard.classList.add('hidden'); }
}
function setDownloadButton(active, cb = null) {
    if (active) { downloadBtn.classList.remove('disabled'); downloadBtn.onclick = cb; }
    else { downloadBtn.classList.add('disabled'); downloadBtn.onclick = null; }
}
function showCrashCard(badge, title, desc, debugLog) {
    errorBadge.innerText = badge; errorTitle.innerText = title; errorDesc.innerText = desc; errorTrace.innerText = debugLog;
    errorCard.classList.remove('hidden'); errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

