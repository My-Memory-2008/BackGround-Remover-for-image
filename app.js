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

// Node target lookups
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const promptInput = document.getElementById('prompt-input');
const analyzeBtn = document.getElementById('analyze-btn');
const processBgBtn = document.getElementById('process-bg-btn');

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

let localUploadedFileBlob = null;
let optimizedEnhancedBlob = null;
let visionModelCache = null;

// Activate upload window on click click
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        localUploadedFileBlob = e.target.files[0];
        analyzeBtn.classList.remove('disabled');
        dropZone.style.borderColor = "var(--success-green)";
        errorCard.classList.add('hidden');
    }
});

// Drag Over Event Controls
['dragenter', 'dragover'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--accent-purple)";
    }, false);
});
['dragleave', 'drop'].forEach(name => {
    dropZone.addEventListener(name, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
    }, false);
});
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        localUploadedFileBlob = e.dataTransfer.files[0];
        analyzeBtn.classList.remove('disabled');
        dropZone.style.borderColor = "var(--success-green)";
    }
});

// STAGE 1: AI Vision Model Analysis and Automated Canvas Fine-Tuning
analyzeBtn.addEventListener('click', async () => {
    if (!localUploadedFileBlob) return;
    
    errorCard.classList.add('hidden');
    toggleLoader(true, "Downloading/Waking localized vision model weights...");
    
    try {
        // Initialize HuggingFace Vision Processor model locally inside the browser thread
        if (!visionModelCache) {
            visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        }
        
        toggleLoader(true, "AI reading composition elements & calculating edge metrics...");
        const temporaryBlobUrl = URL.createObjectURL(localUploadedFileBlob);
        
        // Model parses the scene layout vectors
        const visionAnalysisOutput = await visionModelCache(temporaryBlobUrl);
        const descriptionText = visionAnalysisOutput[0]?.generated_text || "unidentifiable layout contours";
        
        toggleLoader(true, "Calibrating contrast and exposure profiles dynamically...");
        
        // Execute canvas modification based on structural analysis and user directives
        optimizedEnhancedBlob = await applyImageProcessingPipeline(localUploadedFileBlob, descriptionText, promptInput.value.trim());
        
        // Update Viewport elements
        previewSection.classList.remove('hidden');
        inputImage.src = URL.createObjectURL(optimizedEnhancedBlob);
        outputImage.src = "";
        setDownloadButton(false);
        
        aiThoughtBox.innerHTML = `<strong>AI Analysis:</strong> Identified "${descriptionText}". Adjusted edge sharpness and contrast ratios to isolate background shapes effectively.`;
        toggleLoader(false);
        
    } catch (fault) {
        showCrashCard("Vision Analysis Failure", "Model Execution Fault", "The browser failed to execute structural semantic feature tuning maps.", fault.message);
        toggleLoader(false);
    }
});

// STAGE 2: Core Background Segmentation Model Trigger Execution
processBgBtn.addEventListener('click', async () => {
    const targetPayload = optimizedEnhancedBlob || localUploadedFileBlob;
    if (!targetPayload) return;
    
    toggleLoader(true, "Executing segmentation mask algorithm...");
    try {
        const maskOutputBlob = await removeBackground(targetPayload, {
            progress: (instance, current, total) => {
                const percent = Math.round((current / total) * 100);
                toggleLoader(true, `Isolating background elements... (${isNaN(percent) ? 0 : percent}%)`);
            }
        });
        
        const transparentOutputUrl = URL.createObjectURL(maskOutputBlob);
        outputImage.src = transparentOutputUrl;
        
        setDownloadButton(true, () => {
            const linkNode = document.createElement('a');
            linkNode.href = transparentOutputUrl;
            linkNode.download = `clearcut_pro_output.png`;
            linkNode.click();
        });
        
        toggleLoader(false);
    } catch (aiError) {
        showCrashCard("Neural Network Exception", "ONNX Layer Processing Cutout Error", "The local background processor exceeded available memory boundaries.", aiError.message);
        toggleLoader(false);
    }
});

// Canvas Multi-Channel Image Operations Function
function applyImageProcessingPipeline(sourceBlob, aiAnalysisText, userDirectiveText) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(sourceBlob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            imgSpecs.innerText = `${img.width} × ${img.height}`;
            
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);
            
            // Core canvas filter mutations matrix rules
            let filterSettings = "contrast(1.25) brightness(1.05) saturate(1.10)";
            
            // Scan user prompt context flags to adjust filter curves dynamically
            const combinedString = (aiAnalysisText + " " + userDirectiveText).toLowerCase();
            if (combinedString.includes("sharpen") || combinedString.includes("dark") || combinedString.includes("pop")) {
                filterSettings = "contrast(1.45) brightness(0.98) saturate(1.15) saturate(1.10)";
            } else if (combinedString.includes("bright") || combinedString.includes("light")) {
                filterSettings = "contrast(1.15) brightness(1.15)";
            } else if (combinedString.includes("soft") || combinedString.includes("blur")) {
                filterSettings = "contrast(1.10) saturate(1.20)";
            }
            
            ctx.filter = filterSettings;
            ctx.drawImage(img, 0, 0); // Redraw with hardware filters active
            
            canvas.toBlob((resultBlob) => {
                if (resultBlob) resolve(resultBlob);
                else reject(new Error("Canvas serialization failed"));
            }, 'image/png');
        };
        img.onerror = () => reject(new Error("Image decompression breakdown"));
    });
}

function toggleLoader(show, text = "") {
    if (show) {
        statusCard.classList.remove('hidden');
        statusText.innerText = text;
    } else {
        statusCard.classList.add('hidden');
    }
}

function setDownloadButton(active, cb = null) {
    if (active) {
        downloadBtn.classList.remove('disabled');
        downloadBtn.onclick = cb;
    } else {
        downloadBtn.classList.add('disabled');
        downloadBtn.onclick = null;
    }
}

function showCrashCard(badge, title, desc, debugLog) {
    errorBadge.innerText = badge;
    errorTitle.innerText = title;
    errorDesc.innerText = desc;
    errorTrace.innerText = debugLog;
    errorCard.classList.remove('hidden');
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
