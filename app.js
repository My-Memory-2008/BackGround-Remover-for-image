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

// Unified Node Target Mapping Across Layout Frameworks
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

let visionModelCache = null;
let currentActiveFileObject = null;

// Core Trigger Event: Click drop box to trigger browse dialogue fields
if (dropZone) dropZone.addEventListener('click', () => fileInput.click());

// UNPACK ENGINE CORE: Instantly grab index zero out of structural FileLists
if (fileInput) {
    fileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files.length > 0) {
            clearActiveErrors();
            currentActiveFileObject = e.target.files[0]; // FIXED: Extract singular File object
            evaluateIncomingAsset(currentActiveFileObject);
        }
    });
}

// Drag and drop event tracking configurations
if (dropZone) {
    ['dragenter', 'dragover'].forEach(n => {
        dropZone.addEventListener(n, (e) => {
            e.preventDefault();
            dropZone.style.borderColor = "var(--accent-purple)";
            dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
        }, false);
    });
    ['dragleave', 'drop'].forEach(n => {
        dropZone.addEventListener(n, (e) => {
            e.preventDefault();
            dropZone.style.borderColor = "var(--border-color)";
            dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
        }, false);
    });
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        clearActiveErrors();
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            currentActiveFileObject = e.dataTransfer.files[0]; // FIXED: Extract singular File object
            evaluateIncomingAsset(currentActiveFileObject);
        }
    });
}

// Global Clipboard Paste Handler
window.addEventListener('paste', async (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;
    for (let item of items) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            currentActiveFileObject = item.getAsFile();
            evaluateIncomingAsset(currentActiveFileObject);
            break;
        }
    }
});

// URL Image Downloader Input Handler
if (urlBtn) {
    urlBtn.addEventListener('click', async () => {
        const url = urlInput.value.trim();
        if (!url) return;
        clearActiveErrors();
        toggleLoader(true, "Downloading image target stream from address URL...");
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            currentActiveFileObject = await res.blob();
            evaluateIncomingAsset(currentActiveFileObject);
            toggleLoader(false);
        } catch (err) {
            showCrashCard("Fetch Blocked", "CORS Network Block Failure", "Website server blocks external programmatic file downloads.", err.message);
            toggleLoader(false);
        }
    });
}

// Determine tool routing parameters
function evaluateIncomingAsset(fileData) {
    if (!fileData) return;
    if (fileData.type && !fileData.type.startsWith('image/')) {
        showCrashCard("Format Rejected", "Invalid File Extension", "Please choose standard graphical formats (PNG, JPG, WEBP).", "");
        return;
    }

    const currentPath = window.location.pathname;
    if (currentPath.includes("vision.html")) {
        // Unlock action button on vision tuning screen layouts
        if (analyzeBtn) analyzeBtn.classList.remove('disabled');
        if (dropZone) dropZone.style.borderColor = "var(--success-green)";
    } else {
        // Run background erasure steps directly on core index frame
        runBackgroundEraserPipeline(fileData);
    }
}

// ==========================================
// WORKFLOW A: BACKGROUND REMOVAL (INDEX.HTML)
// ==========================================
async function runBackgroundEraserPipeline(blobSource) {
    toggleLoader(true, "AI loading network layers into browser memory slot lines...");
    try {
        previewSection.classList.remove('hidden');
        inputImage.src = URL.createObjectURL(blobSource);
        outputImage.src = "";
        setDownloadButton(false);

        const transparentOutputBlob = await removeBackground(blobSource, {
            progress: (instance, current, total) => {
                const percent = Math.round((current / total) * 100);
                toggleLoader(true, `Stripping background elements... (${isNaN(percent) ? 0 : percent}%)`);
            }
        });

        const explicitMaskUrl = URL.createObjectURL(transparentOutputBlob);
        outputImage.src = explicitMaskUrl;
        
        setDownloadButton(true, () => {
            const downloadLink = document.createElement('a');
            downloadLink.href = explicitMaskUrl;
            downloadLink.download = `clearcut_${blobSource.name || 'asset.png'}`;
            downloadLink.click();
        });
        toggleLoader(false);
    } catch (aiError) {
        showCrashCard("ONNX Processing Error", "Compute Out Of Memory Exception", "Browser engine tab ran out of available memory boundaries.", aiError.message);
        toggleLoader(false);
    }
}

// ==========================================
// WORKFLOW B: AI VISION ENHANCEMENT (VISION.HTML)
// ==========================================
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
        if (!currentActiveFileObject) return;
        toggleLoader(true, "Downloading/Waking localized vision model weights...");
        try {
            if (!visionModelCache) {
                visionModelCache = await pipeline('image-to-text', 'Xenova/vit-gpt2-image-captioning');
            }
            toggleLoader(true, "AI scanning image composition rules and depth coordinates...");
            const tempURL = URL.createObjectURL(currentActiveFileObject);
            
            const results = await visionModelCache(tempURL);
            const generatedTags = results?.[0]?.generated_text || "unidentifiable background layer structures";
            
            toggleLoader(true, "Processing contrast modifications onto image data grids...");
            const refinedOutputBlob = await applyImageContrastTuningCanvas(currentActiveFileObject, generatedTags, promptInput.value.trim());
            
            previewSection.classList.remove('hidden');
            inputImage.src = URL.createObjectURL(refinedOutputBlob);
            aiThoughtBox.innerHTML = `<strong>AI Analysis:</strong> Identified "${generatedTags}". Enhanced edge definitions and brightness profiles safely inside canvas grids.`;
            
            setDownloadButton(true, () => {
                const downloadLink = document.createElement('a');
                downloadLink.href = inputImage.src;
                downloadLink.download = `optimized_${currentActiveFileObject.name || 'asset.png'}`;
                downloadLink.click();
            });
            toggleLoader(false);
        } catch (visionErr) {
            showCrashCard("Transformers Failure", "Model Computation Exception", "Localized script model failed to trace parameters.", visionErr.message);
            toggleLoader(false);
        }
    });
}

function applyImageContrastTuningCanvas(blob, aiTags, userPrompt) {
    return new Promise((resolve, reject) => {
        const renderImage = new Image();
        renderImage.src = URL.createObjectURL(blob);
        renderImage.onload = () => {
            const editingCanvas = document.createElement('canvas');
            editingCanvas.width = renderImage.width;
            editingCanvas.height = renderImage.height;
            if (imgSpecs) imgSpecs.innerText = `${renderImage.width} × ${renderImage.height}`;
            
            const context = editingCanvas.getContext('2d');
            let filteringParams = "contrast(1.25) brightness(1.04) saturate(1.10)";
            const parsedStrings = (aiTags + " " + userPrompt).toLowerCase();
            
            if (parsedStrings.includes("sharpen") || parsedStrings.includes("pop") || parsedStrings.includes("dark")) {
                filteringParams = "contrast(1.45) brightness(0.96) saturate(1.15)";
            } else if (parsedStrings.includes("bright") || parsedStrings.includes("light")) {
                filteringParams = "contrast(1.10) brightness(1.18)";
            }
            
            context.filter = filteringParams;
            context.drawImage(renderImage, 0, 0);
            editingCanvas.toBlob((finishedBlob) => finishedBlob ? resolve(finishedBlob) : reject(new Error("Canvas failure")), 'image/png');
        };
        renderImage.onerror = () => reject(new Error("Image translation failure"));
    });
}

function clearActiveErrors() 
{
    errorCard.classList.add('hidden');
}
function toggleLoader(show, textContent = "") 
{
    if (show) 
    { statusCard.classList.remove('hidden'); 
     statusText.innerText = textContent; 
    }
    else { statusCard.classList.add('hidden'); 
         }
}
function setDownloadButton(active, callback = null) 
{
    if (active) 
    { downloadBtn.classList.remove('disabled');
     downloadBtn.onclick = callback; 
    }
    else 
    { downloadBtn.classList.add('disabled'); 
     downloadBtn.onclick = null; 
    }
}
function showCrashCard(badge, title, message, details) 
{
    errorBadge.innerText = badge; 
    errorTitle.innerText = title; 
    errorDesc.innerText = message; 
    errorTrace.innerText = details;
    errorCard.classList.remove('hidden');
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
function clearActiveErrors() 
{ errorCard.classList.add('hidden');
}
function toggleLoader(show, textContent = "") 
{
    if (show) 
    { statusCard.classList.remove('hidden'); 
     statusText.innerText = textContent; 
    }
    else { statusCard.classList.add('hidden');
         }}
function setDownloadButton(active, callback = null) 
{if (active)
{ downloadBtn.classList.remove('disabled'); 
 downloadBtn.onclick = callback; }
else { downloadBtn.classList.add('disabled'); 
      downloadBtn.onclick = null; 
     }}
function showCrashCard(badge, title, message, details)
{errorBadge.innerText = badge; 
 errorTitle.innerText = title; 
 errorDesc.innerText = message;
 errorTrace.innerText = details;
 errorCard.classList.remove('hidden'); 
 errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}
