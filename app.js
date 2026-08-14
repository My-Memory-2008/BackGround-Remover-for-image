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

// Node target lookups matched perfectly across both pages
const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const urlInput = document.getElementById('url-input');
const urlBtn = document.getElementById('url-btn');
const promptInput = document.getElementById('prompt-input');
const analyzeBtn = document.getElementById('analyze-btn');

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

// Model storage cash structures
let visionModelCache = null;
let currentTargetFileObject = null;

// Activate file upload browsing window on click
if (dropZone) dropZone.addEventListener('click', () => fileInput.click());

// FIXED IMAGE PIPELINE: Explicitly unpack target files index zero [0] directly
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            clearActiveErrors();
            currentTargetFileObject = e.target.files[0]; // Extracted uncorrupted file item
            handleLoadedImageObject(currentTargetFileObject);
        }
    });
}

// Drag and drop event handlers
if (dropZone) {
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
            currentTargetFileObject = e.dataTransfer.files[0]; // Extracted uncorrupted file item
            handleLoadedImageObject(currentTargetFileObject);
        }
    });
}

// Clipboard instant paste hooks
window.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            currentTargetFileObject = item.getAsFile();
            handleLoadedImageObject(currentTargetFileObject);
            break;
        }
    }
});

// Fetch images from web addresses
if (urlBtn) {
    urlBtn.addEventListener('click', async () => {
        const rawUrl = urlInput.value.trim();
        if (!rawUrl) return;
        clearActiveErrors();
        toggleLoader(true, "Downloading image from URL...");
        try {
            const response = await fetch(rawUrl);
            if (!response.ok) throw new Error(`HTTP ${response.status}`);
            currentTargetFileObject = await response.blob();
            handleLoadedImageObject(currentTargetFileObject);
            toggleLoader(false);
        } catch (err) {
            showCrashCard("Fetch Blocked", "CORS Network Failure", "Could not fetch image due to cross-origin server safety protocols.", err.message);
            toggleLoader(false);
        }
    });
}

// Route actions based on active pathname parameters
function handleLoadedImageObject(fileData) {
    if (!fileData) return;
    
    // Safety check type configuration
    if (fileData.type && !fileData.type.startsWith('image/')) {
        showCrashCard("Format Denied", "Invalid File Signature", "Please process image format extensions only.", "");
        return;
    }

    const path = window.location.pathname;
    if (path.includes("vision.html")) {
        // Unlock action button on vision layout page
        if (analyzeBtn) analyzeBtn.classList.remove('disabled');
        if (dropZone) dropZone.style.borderColor = "var(--success-green)";
    } else {
        // Execute background erasure routine directly on index home page
        executeBackgroundEraserPipeline(fileData);
    }
}

// ==========================================
// ROUTINE A: THE BACKGROUND REMOVER (INDEX)
// ==========================================
async function executeBackgroundEraserPipeline(blobSource) {
    toggleLoader(true, "AI loading model parameters into local memory spaces...");
    try {
        previewSection.classList.remove('hidden');
        inputImage.src = URL.createObjectURL(blobSource);
        outputImage.src = "";
        setDownloadButton(false);

        const transparentBlob = await removeBackground(blobSource, {
            progress: (instance, current, total) => {
                const percentage = Math.round((current / total) * 100);
                toggleLoader(true, `Stripping background boundaries... (${isNaN(percentage) ? 0 : percentage}%)`);
            }
        });

        const maskURL = URL.createObjectURL(transparentBlob);
        outputImage.src = maskURL;
        
        setDownloadButton(true, () => {
            const anchor = document.createElement('a');
            anchor.href = maskURL;
            anchor.download = `clearcut_${blobSource.name || 'output.png'}`;
            anchor.click();
        });
        toggleLoader(false);
    } catch (aiErr) {
        showCrashCard("ONNX Failure", "Execution Layer Memory Overflow", "The processor tab hit a resource boundary limitation.", aiErr.message);
        toggleLoader(false);
    }
}

// ==========================================
// ROUTINE B: THE VISION OPTIMIZER (VISION)
// ==========================================
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
        if (!currentTargetFileObject) return;
        toggleLoader(true, "Waking on-device AI vision model vectors...");
        
        try {
            if (!visionModelCache) {
                visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
            }
            toggleLoader(true, "AI assessing image illumination curves and textures...");
            const tempUrl = URL.createObjectURL(currentTargetFileObject);
            
            const analysis = await visionModelCache(tempUrl);
            const tagDescription = analysis?.generated_text || "unidentified image visual matrices";
            
            toggleLoader(true, "Applying color-space enhancements onto matrix canvas...");
            const processedBlob = await applyCanvasImageProcessing(currentTargetFileObject, tagDescription, promptInput.value.trim());
            
            previewSection.classList.remove('hidden');
            inputImage.src = URL.createObjectURL(processedBlob);
            aiThoughtBox.innerHTML = `<strong>AI Diagnosis:</strong> Identified "${tagDescription}". Pre-tuned contrast maps to optimize image boundaries cleanly!`;
            
            setDownloadButton(true, () => {
                const anchor = document.createElement('a');
                anchor.href = inputImage.src;
                anchor.download = `optimized_${currentTargetFileObject.name || 'asset.png'}`;
                anchor.click();
            });
            toggleLoader(false);
        } catch (visionErr) {
            showCrashCard("Vision Fault", "Transformers Initialization Exception", "On-device processing model encountered an error.", visionErr.message);
            toggleLoader(false);
        }
    });
}

function applyCanvasImageProcessing(blob, aiTags, userPrompt) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(blob);
        img.onload = () => {
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            if (imgSpecs) imgSpecs.innerText = `${img.width} × ${img.height}`;
            
            const ctx = canvas.getContext('2d');
            let balanceFilters = "contrast(1.25) brightness(1.04) saturate(1.10)";
            const checkStrings = (aiTags + " " + userPrompt).toLowerCase();
            
            if (checkStrings.includes("sharpen") || checkStrings.includes("pop") || checkStrings.includes("dark")) {
                balanceFilters = "contrast(1.42) brightness(0.98) saturate(1.15)";
            } else if (checkStrings.includes("bright") || checkStrings.includes("light")) {
                balanceFilters = "contrast(1.12) brightness(1.16)";
            }
            
            ctx.filter = balanceFilters;
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((b) => b ? resolve(b) : reject(new Error("Canvas fault")), 'image/png');
        };
        img.onerror = () => reject(new Error("Decode fault"));
    });
}

function clearActiveErrors() { errorCard.classList.add('hidden'); }
function toggleLoader(show, label = "") {
    if (show) { statusCard.classList.remove('hidden'); statusText.innerText = label; }
    else { statusCard.classList.add('hidden'); }
}
function setDownloadButton(active, cb = null) {
if (active) 
{
    downloadBtn.classList.remove('disabled');
    downloadBtn.onclick = cb; 
}else { 
    downloadBtn.classList.add('disabled'); 
    downloadBtn.onclick = null;
}
}
function showCrashCard(badge, title, desc, log)
{
    errorBadge.innerText = badge; 
    errorTitle.innerText = title; 
    errorDesc.innerText = desc;
    errorTrace.innerText = log;
    errorCard.classList.remove('hidden');
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
