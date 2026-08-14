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

// Connect to Section 1 Nodes (AI Vision Analyzer)
const dropZoneVision = document.getElementById('drop-zone-vision');
const fileInputVision = document.getElementById('file-input-vision');
const promptInput = document.getElementById('prompt-input');
const analyzeBtn = document.getElementById('analyze-btn');
const visionPreviewSection = document.getElementById('vision-preview-section');
const visionInputImage = document.getElementById('vision-input-image');
const visionImgSpecs = document.getElementById('vision-img-specs');
const aiThoughtBox = document.getElementById('ai-thought-box');
const sendToRemoverBtn = document.getElementById('send-to-remover-btn');

// Connect to Section 2 Nodes (Your original functional layout nodes)
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const urlInput = document.getElementById('url-input');
const urlBtn = document.getElementById('url-btn');
const processBgBtn = document.getElementById('process-bg-btn');
const previewSection = document.getElementById('preview-section');
const inputImage = document.getElementById('input-image');
const outputImage = document.getElementById('output-image');
const downloadBtn = document.getElementById('download-btn');
const imgSpecs = document.getElementById('img-specs');

// Shared layout controls
const statusCard = document.getElementById('status-card');
const statusText = document.getElementById('status-text');
const errorCard = document.getElementById('error-card');
const errorTitle = document.getElementById('error-title');
const errorBadge = document.getElementById('error-badge');
const errorDesc = document.getElementById('error-desc');
const errorTrace = document.getElementById('error-trace');

// Holding state containers
let masterVisionFile = null;
let masterRemoverFile = null;
let dynamicOptimizedBlob = null;
let visionModelCache = null;

// ==========================================
// SECTION 1 BINDINGS (AI Vision Panel)
// ==========================================
dropZoneVision.addEventListener('click', () => fileInputVision.click());

fileInputVision.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        clearActiveErrors();
        masterVisionFile = e.target.files[0]; // Extract file directly
        analyzeBtn.classList.remove('disabled');
        dropZoneVision.style.borderColor = "var(--success-green)";
    }
});

setupDropEvents(dropZoneVision, (unpackedFile) => {
    masterVisionFile = unpackedFile;
    analyzeBtn.classList.remove('disabled');
    dropZoneVision.style.borderColor = "var(--success-green)";
});

analyzeBtn.addEventListener('click', async () => {
    if (!masterVisionFile) return;
    clearActiveErrors();
    toggleLoader(true, "Downloading/Waking on-device AI vision model...");
    
    try {
        if (!visionModelCache) {
            visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
        }
        toggleLoader(true, "AI assessing image structures and layout textures...");
        const localURL = URL.createObjectURL(masterVisionFile);
        
        const result = await visionModelCache(localURL);
        const classification = result[0]?.generated_text || "unidentified creative objects";
        
        toggleLoader(true, "Modifying clarity channels and contrast boundaries...");
        dynamicOptimizedBlob = await applyImageProcessingPipeline(masterVisionFile, classification, promptInput.value.trim(), visionImgSpecs);
        
        visionPreviewSection.classList.remove('hidden');
        visionInputImage.src = URL.createObjectURL(dynamicOptimizedBlob);
        aiThoughtBox.innerHTML = `<strong>AI Discovery:</strong> Detected "${classification}". Calibrated details based on prompt layers. Click the forward button below to push it to the eraser.`;
        toggleLoader(false);
    } catch (err) {
        showCrashCard("Vision Exception", "Model Load Blocked", "Failed to compile feature analytics layer.", err.message);
        toggleLoader(false);
    }
});

sendToRemoverBtn.addEventListener('click', () => {
    if (!dynamicOptimizedBlob) return;
    masterRemoverFile = dynamicOptimizedBlob;
    processBgBtn.classList.remove('disabled');
    dropZone.style.borderColor = "var(--accent-purple)";
    dropZone.style.backgroundColor = "rgba(168, 85, 247, 0.1)";
    document.getElementById('remover-card-section').scrollIntoView({ behavior: 'smooth', block: 'center' });
});
// ==========================================
// SECTION 2 BINDINGS (Your Original Background Remover)
// ==========================================
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files.length > 0) {
        clearActiveErrors();
        masterRemoverFile = e.target.files[0]; // Extract file directly
        processBgBtn.classList.remove('disabled');
        dropZone.style.borderColor = "var(--success-green)";
    }
});

setupDropEvents(dropZone, (unpackedFile) => {
    masterRemoverFile = unpackedFile;
    processBgBtn.classList.remove('disabled');
    dropZone.style.borderColor = "var(--success-green)";
});

window.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            const file = item.getAsFile();
            masterRemoverFile = file;
            processBgBtn.classList.remove('disabled');
            dropZone.style.borderColor = "var(--success-green)";
            break;
        }
    }
});

urlBtn.addEventListener('click', async () => {
    const rawUrl = urlInput.value.trim();
    if (!rawUrl) return;
    clearActiveErrors();
    toggleLoader(true, "Fetching remote target address image stream...");
    try {
        const res = await fetch(rawUrl);
        if (!res.ok) throw new Error(`HTTP Error Status: ${res.status}`);
        const blob = await res.blob();
        masterRemoverFile = blob;
        processBgBtn.classList.remove('disabled');
        dropZone.style.borderColor = "var(--success-green)";
        toggleLoader(false);
    } catch (err) {
        showCrashCard("Network Failure", "CORS Request Blocked", "Could not fetch image file due to security cross-origin policies.", err.message);
        toggleLoader(false);
    }
});

processBgBtn.addEventListener('click', async () => {
    if (!masterRemoverFile) return;
    clearActiveErrors();
    toggleLoader(true, "AI loading model parameters into local compute slots...");
    
    try {
        previewSection.classList.remove('hidden');
        inputImage.src = URL.createObjectURL(masterRemoverFile);
        outputImage.src = "";
        outputImage.classList.add('opacity-dim');
        setDownloadButton(false);

        const transparentOutputBlob = await removeBackground(masterRemoverFile, {
            progress: (instance, current, total) => {
                const percent = Math.round((current / total) * 100);
                toggleLoader(true, `Stripping background boundaries... (${isNaN(percent) ? 0 : percent}%)`);
            }
        });
        
        const outputURL = URL.createObjectURL(transparentOutputBlob);
        outputImage.src = outputURL;
        outputImage.classList.remove('opacity-dim');
        
        setDownloadButton(true, () => {
            const anchor = document.createElement('a');
            anchor.href = outputURL;
            anchor.download = `clearcut_output.png`;
            anchor.click();
        });
        toggleLoader(false);
    } catch (aiErr) {
        showCrashCard("Model Exception", "ONNX Layer Overflow", "The background remover thread ran out of memory parameters.", aiErr.message);
        toggleLoader(false);
    }
});

// Shared helper functions
function setupDropEvents(elementTarget, callback) {
    ['dragenter', 'dragover'].forEach(n => {
        elementTarget.addEventListener(n, (e) => {
            e.preventDefault();
            elementTarget.style.borderColor = "var(--accent-purple)";
        }, false);
    });
    ['dragleave', 'drop'].forEach(n => {
        elementTarget.addEventListener(n, (e) => {
            e.preventDefault();
            elementTarget.style.borderColor = "var(--border-color)";
        }, false);
    });
    elementTarget.addEventListener('drop', (e) => {
        e.preventDefault();
        clearActiveErrors();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            callback(e.dataTransfer.files[0]); // Unpack item safely
        }
    });
}

function applyImageProcessingPipeline(blob, tags, prompt, specsLabel) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            specsLabel.innerText = `${img.width} × ${img.height}`;
            if (specsLabel === visionImgSpecs) imgSpecs.innerText = `${img.width} × ${img.height}`;
            
            const ctx = canvas.getContext('2d');
            let matrixFilter = "contrast(1.25) brightness(1.04) saturate(1.10)";
            const checkStrings = (tags + " " + prompt).toLowerCase();
            
            if (checkStrings.includes("sharpen") || checkStrings.includes("pop") || checkStrings.includes("dark")) {
                matrixFilter = "contrast(1.42) brightness(0.98) saturate(1.15)";
            } else if (checkStrings.includes("bright") || checkStrings.includes("light")) {
                matrixFilter = "contrast(1.12) brightness(1.16)";
            }
            
            ctx.filter = matrixFilter;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Canvas fault")), 'image/png');
        };
        img.onerror = () => reject(new Error("Decode fault"));
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
function showCrashCard(badge, title, desc, debug) {
    errorBadge.innerText = badge; errorTitle.innerText = title; errorDesc.innerText = desc; errorTrace.innerText = debug;
    errorCard.classList.remove('hidden'); errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
