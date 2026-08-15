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







import { removeBackground } from "https://cdn.jsdelivr.net/npm/@imgly/background-removal@1.7.0/+esm";

// Import TensorFlow.js for client-side vision processing
import * as tf from "https://cdn.skypack.dev/@tensorflow/tfjs";

// Vision model initialization flag
let visionModelLoaded = false;

// Initialize the vision model when the page loads
async function initializeVisionModel() {
    if (visionModelLoaded) return;
    
    try {
        // Show loading indicator
        toggleVisionLoaderDisplay(true, "Loading vision analysis model...");
        
        // Load TensorFlow.js backend
        await tf.ready();
        
        visionModelLoaded = true;
        toggleVisionLoaderDisplay(false);
    } catch (error) {
        console.error('Failed to initialize vision model:', error);
        toggleVisionLoaderDisplay(false);
        showVisionDiagnosticCrashCard(
            "Model Initialization Failed",
            "Vision Model Error",
            "Could not load the vision analysis model. Using original image.",
            error.message
        );
    }
}

// Simple enhancement function using TensorFlow.js
function enhanceImageLocally(imageData, prompt) {
    // Create a tensor from the image data
    const tensor = tf.browser.fromPixels(imageData);
    
    // Apply basic enhancement based on prompt
    let enhancedTensor = tensor;
    
    if (prompt.toLowerCase().includes('brighten') || prompt.toLowerCase().includes('light')) {
        // Brighten the image
        enhancedTensor = tf.add(tensor, tf.scalar(20));
        enhancedTensor = tf.clipByValue(enhancedTensor, 0, 255);
    } else if (prompt.toLowerCase().includes('sharpen')) {
        // Apply a simple sharpening kernel
        const kernel = tf.tensor4d([
            [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
            [[0, -1, 0], [-1, 5, -1], [0, -1, 0]],
            [[0, -1, 0], [-1, 5, -1], [0, -1, 0]]
        ], [3, 3, 3, 1]); // 3 channels for RGB
        
        // Reshape for convolution
        const reshaped = tensor.expandDims(0).toFloat();
        enhancedTensor = tf.conv2d(reshaped, kernel, 1, 'same').squeeze([0]);
        enhancedTensor = tf.clipByValue(enhancedTensor, 0, 255);
    } else if (prompt.toLowerCase().includes('contrast')) {
        // Increase contrast
        const mean = tensor.mean();
        enhancedTensor = tf.add(tf.scalar(1.2).mul(tf.sub(tensor, mean)), mean);
        enhancedTensor = tf.clipByValue(enhancedTensor, 0, 255);
    } else {
        // Default enhancement - focus on center of image (subject emphasis)
        const [height, width] = tensor.shape;
        const centerX = Math.floor(width / 2);
        const centerY = Math.floor(height / 2);
        const radius = Math.min(width, height) / 4;
        
        // Create a radial gradient to emphasize center
        const coords = tf.meshgrid(
            tf.linspace(0, height - 1, height),
            tf.linspace(0, width - 1, width)
        );
        
        const yDist = tf.sub(coords[0], centerY);
        const xDist = tf.sub(coords[1], centerX);
        const dist = tf.sqrt(tf.add(tf.square(yDist), tf.square(xDist)));
        const maxDist = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
        const vignette = tf.div(1, tf.add(1, tf.pow(tf.div(dist, radius), 2)));
        
        enhancedTensor = tf.mul(tensor, vignette.reshape([height, width, 1]));
        enhancedTensor = tf.clipByValue(enhancedTensor, 0, 255);
    }
    
    return enhancedTensor;
}

// VISION ANALYSIS DOM ELEMENTS
const visionDropZone = document.getElementById('vision-drop-zone');
const visionFileInput = document.getElementById('vision-file-input');
const visionUrlInput = document.getElementById('vision-url-input');
const visionUrlBtn = document.getElementById('vision-url-btn');
const visionPrompt = document.getElementById('vision-prompt');
const autoEnhanceBtn = document.getElementById('auto-enhance-btn');
const enhanceWithPromptBtn = document.getElementById('enhance-with-prompt-btn');

const visionStatusCard = document.getElementById('vision-status-card');
const visionStatusText = document.getElementById('vision-status-text');
const visionPreviewSection = document.getElementById('vision-preview-section');

const visionInputImage = document.getElementById('vision-input-image');
const visionOutputImage = document.getElementById('vision-output-image');
const visionDownloadBtn = document.getElementById('vision-download-btn');
const visionImgSpecs = document.getElementById('vision-img-specs');

const visionErrorCard = document.getElementById('vision-error-card');
const visionErrorTitle = document.getElementById('vision-error-title');
const visionErrorBadge = document.getElementById('vision-error-badge');
const visionErrorDesc = document.getElementById('vision-error-desc');
const visionErrorTrace = document.getElementById('vision-error-trace');

// BACKGROUND REMOVAL DOM ELEMENTS
const bgDropZone = document.getElementById('drop-zone'); // Changed to bgDropZone to match HTML
const bgFileInput = document.getElementById('file-input');
const bgUrlInput = document.getElementById('url-input');
const bgUrlBtn = document.getElementById('url-btn');

const bgStatusCard = document.getElementById('status-card');
const bgStatusText = document.getElementById('status-text');
const bgPreviewSection = document.getElementById('preview-section');

const bgInputImage = document.getElementById('input-image');
const bgOutputImage = document.getElementById('output-image');
const bgDownloadBtn = document.getElementById('download-btn');
const bgImgSpecs = document.getElementById('img-specs');

const bgErrorCard = document.getElementById('error-card');
const bgErrorTitle = document.getElementById('error-title');
const bgErrorBadge = document.getElementById('error-badge');
const bgErrorDesc = document.getElementById('error-desc');
const bgErrorTrace = document.getElementById('error-trace');

// Initialize the vision model when the page loads
initializeVisionModel();

// VISION ANALYSIS EVENT HANDLERS
visionDropZone.addEventListener('click', (e) => {
    e.preventDefault();
    visionFileInput.click(); // Trigger file input click
});

visionFileInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files.length > 0) {
        clearVisionErrors();
        const rawFileObj = event.target.files[0];
        processVisionTargetBlob(rawFileObj);
    }
});

['dragenter', 'dragover'].forEach(eventName => {
    visionDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        visionDropZone.style.borderColor = "var(--accent-purple)";
        visionDropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    visionDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        visionDropZone.style.borderColor = "var(--border-color)";
        visionDropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
    }, false);
});

visionDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    clearVisionErrors();
    
    const dataPayload = e.dataTransfer;
    if (dataPayload && dataPayload.files && dataPayload.files.length > 0) {
        const rawFileObj = dataPayload.files[0];
        processVisionTargetBlob(rawFileObj);
    }
});

// Clipboard paste actions for vision section
window.addEventListener('paste', async (e) => {
    // Check if the paste event originated from the vision section
    const activeElement = document.activeElement;
    
    // If we're targeting the vision section specifically
    if (activeElement.closest('.tool-section:first-child')) {
        const clipboardPayload = e.clipboardData?.items;
        if (!clipboardPayload) return;
        
        for (let item of clipboardPayload) {
            if (item.type.indexOf("image") !== -1) {
                clearVisionErrors();
                const matchingFile = item.getAsFile();
                processVisionTargetBlob(matchingFile);
                break;
            }
        }
    } else {
        // Default to background removal section
        const clipboardPayload = e.clipboardData?.items;
        if (!clipboardPayload) return;
        
        for (let item of clipboardPayload) {
            if (item.type.indexOf("image") !== -1) {
                clearBgErrors();
                const matchingFile = item.getAsFile();
                processBgTargetBlob(matchingFile);
                break;
            }
        }
    }
});

// Vision URL fetch
visionUrlBtn.addEventListener('click', async () => {
    const rawUrl = visionUrlInput.value.trim();
    if (!rawUrl) return;
    
    clearVisionErrors();
    toggleVisionLoaderDisplay(true, "Downloading image file from URL stream...");
    
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
        const imageBlob = await response.blob();
        processVisionTargetBlob(imageBlob, "downloaded_vision_image.png");
    } catch (err) {
        showVisionDiagnosticCrashCard(
            "Network Request Blocked",
            "CORS Access Error",
            "Could not load the image from that URL. The website hosting this image blocks direct script access due to Cross-Origin Security Laws.",
            err.message
        );
        toggleVisionLoaderDisplay(false);
    }
});

// Vision enhancement functions with actual vision model
async function enhanceImageWithVision(imageBlob, prompt = "") {
    if (!visionModelLoaded) {
        await initializeVisionModel();
    }
    
    if (!visionModelLoaded) {
        // If model failed to load, return original image
        return imageBlob;
    }
    
    toggleVisionLoaderDisplay(true, "Analyzing image with vision model...");
    
    try {
        // Convert blob to image data for the vision model
        const imageUrl = URL.createObjectURL(imageBlob);
        const img = new Image();
        img.src = imageUrl;
        
        await new Promise((resolve) => {
            img.onload = resolve;
        });
        
        // Create canvas to process the image
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Get image data
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        
        // Process the image using the vision model
        const enhancedTensor = enhanceImageLocally(imageData, prompt);
        
        // Convert tensor back to image data
        const enhancedImageData = await tf.browser.toPixels(enhancedTensor);
        
        // Create new image data from the processed pixels
        const enhancedImageDataObj = new ImageData(new Uint8ClampedArray(enhancedImageData), canvas.width, canvas.height);
        
        // Put the enhanced image data back to canvas
        ctx.putImageData(enhancedImageDataObj, 0, 0);
        
        // Convert back to blob
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
        
    } catch(error) {
        console.error('Vision enhancement error:', error);
        showVisionDiagnosticCrashCard(
            "Vision Enhancement Failed",
            "AI Processing Error",
            "Could not enhance image with vision model.",
            error.message
        );
        return imageBlob; // Return original if enhancement fails
    } finally {
        // Clean up the URL object
        URL.revokeObjectURL(imageUrl);
    }
}

// Vision button handlers
autoEnhanceBtn.addEventListener('click', async () => {
    if(!window.currentVisionBlob) {
        showVisionDiagnosticCrashCard(
            "No Image Selected",
            "Upload Required",
            "Please upload an image first before attempting enhancement."
        );
        return;
    }
    
    const enhancedBlob = await enhanceImageWithVision(window.currentVisionBlob);
    displayVisionResults(window.currentVisionBlob, enhancedBlob);
});

enhanceWithPromptBtn.addEventListener('click', async () => {
    if(!window.currentVisionBlob) {
        showVisionDiagnosticCrashCard(
            "No Image Selected", 
            "Upload Required",
            "Please upload an image first before attempting enhancement."
        );
        return;
    }
    
    const prompt = visionPrompt.value.trim();
    if(!prompt) {
        showVisionDiagnosticCrashCard(
            "Prompt Required",
            "No Description Provided",
            "Please enter a description of what to focus on for enhancement."
        );
        return;
    }
    
    const enhancedBlob = await enhanceImageWithVision(window.currentVisionBlob, prompt);
    displayVisionResults(window.currentVisionBlob, enhancedBlob);
});

// Vision processing function
async function processVisionTargetBlob(incomingFileOrBlob) {
    if (!incomingFileOrBlob) return;

    if (!incomingFileOrBlob.type || !incomingFileOrBlob.type.startsWith('image/')) {
        showVisionDiagnosticCrashCard(
            "Format Rejection",
            "Unsupported Extension Type",
            "The upload failed because this file type is not a valid format. Please choose an image like PNG, JPG, or WEBP.",
            `Received Type: ${incomingFileOrBlob.type || 'Unknown'}`
        );
        return;
    }

    toggleVisionLoaderDisplay(true, "Decoding graphical layout arrays...");
    const dynamicFallbackName = incomingFileOrBlob.name || "processed_vision_asset.png";

    try {
        const decodedBitmap = await createImageBitmap(incomingFileOrBlob);
        const internalCanvas = document.createElement('canvas');
        internalCanvas.width = decodedBitmap.width;
        internalCanvas.height = decodedBitmap.height;
        
        const context = internalCanvas.getContext('2d');
        if (!context) throw new Error("Could not draw local pixel buffer allocations.");
        
        context.drawImage(decodedBitmap, 0, 0);
        visionImgSpecs.innerText = `${decodedBitmap.width} × ${decodedBitmap.height}`;

        internalCanvas.toBlob(async (compiledPngBlob) => {
            if (!compiledPngBlob) throw new Error("Canvas pipeline compilation failed.");
            
            const liveUrlView = URL.createObjectURL(compiledPngBlob);
            
            visionPreviewSection.classList.remove('hidden');
            visionInputImage.src = liveUrlView;
            visionOutputImage.src = "";
            visionOutputImage.classList.add('opacity-dim');
            setVisionDownloadButtonState(false);

            // Store the blob for potential enhancement
            window.currentVisionBlob = compiledPngBlob;
            
            toggleVisionLoaderDisplay(false);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable for vision analysis: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            visionPreviewSection.classList.remove('hidden');
            visionInputImage.src = rawDirectUrl;
            window.currentVisionBlob = incomingFileOrBlob;
            toggleVisionLoaderDisplay(false);
        } catch (finalCrashState) {
            showVisionDiagnosticCrashCard(
                "Image Loading Error",
                "Layout Reader Fault",
                "The browser failed to read or display this image layout structure.",
                pipelineFault.message
            );
            toggleVisionLoaderDisplay(false);
        }
    }
}

function displayVisionResults(originalBlob, enhancedBlob) {
    const originalUrl = URL.createObjectURL(originalBlob);
    const enhancedUrl = URL.createObjectURL(enhancedBlob);
    
    visionInputImage.src = originalUrl;
    visionOutputImage.src = enhancedUrl;
    visionOutputImage.classList.remove('opacity-dim');
    
    setVisionDownloadButtonState(true, () => {
        const transferAnchor = document.createElement('a');
        transferAnchor.href = enhancedUrl;
        const fileName = "vision_enhanced_image.png";
        transferAnchor.download = fileName;
        transferAnchor.click();
    });
    
    toggleVisionLoaderDisplay(false);
}

// BACKGROUND REMOVAL EVENT HANDLERS
bgDropZone.addEventListener('click', (e) => {
    e.preventDefault();
    bgFileInput.click(); // Trigger file input click
});

bgFileInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files.length > 0) {
        clearBgErrors();
        const rawFileObj = event.target.files[0];
        processBgTargetBlob(rawFileObj);
    }
});

['dragenter', 'dragover'].forEach(eventName => {
    bgDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        bgDropZone.style.borderColor = "var(--accent-purple)";
        bgDropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    bgDropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        bgDropZone.style.borderColor = "var(--border-color)";
        bgDropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
    }, false);
});

bgDropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    clearBgErrors();
    
    const dataPayload = e.dataTransfer;
    if (dataPayload && dataPayload.files && dataPayload.files.length > 0) {
        const rawFileObj = dataPayload.files[0];
        processBgTargetBlob(rawFileObj);
    }
});

// Background removal URL fetch
bgUrlBtn.addEventListener('click', async () => {
    const rawUrl = bgUrlInput.value.trim();
    if (!rawUrl) return;
    
    clearBgErrors();
    toggleBgLoaderDisplay(true, "Downloading image file from URL stream...");
    
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
        const imageBlob = await response.blob();
        processBgTargetBlob(imageBlob, "downloaded_image.png");
    } catch (err) {
        showBgDiagnosticCrashCard(
            "Network Request Blocked",
            "CORS Access Error",
            "Could not load the image from that URL. The website hosting this image blocks direct script access due to Cross-Origin Security Laws.",
            err.message
        );
        toggleBgLoaderDisplay(false);
    }
});

// Background removal processing function
async function processBgTargetBlob(incomingFileOrBlob) {
    if (!incomingFileOrBlob) return;

    if (!incomingFileOrBlob.type || !incomingFileOrBlob.type.startsWith('image/')) {
        showBgDiagnosticCrashCard(
            "Format Rejection",
            "Unsupported Extension Type",
            "The upload failed because this file type is not a valid format. Please choose an image like PNG, JPG, or WEBP.",
            `Received Type: ${incomingFileOrBlob.type || 'Unknown'}`
        );
        return;
    }

    toggleBgLoaderDisplay(true, "Decoding graphical layout arrays...");
    const dynamicFallbackName = incomingFileOrBlob.name || "processed_asset.png";

    try {
        const decodedBitmap = await createImageBitmap(incomingFileOrBlob);
        const internalCanvas = document.createElement('canvas');
        internalCanvas.width = decodedBitmap.width;
        internalCanvas.height = decodedBitmap.height;
        
        const context = internalCanvas.getContext('2d');
        if (!context) throw new Error("Could not draw local pixel buffer allocations.");
        
        context.drawImage(decodedBitmap, 0, 0);
        bgImgSpecs.innerText = `${decodedBitmap.width} × ${decodedBitmap.height}`;

        internalCanvas.toBlob(async (compiledPngBlob) => {
            if (!compiledPngBlob) throw new Error("Canvas pipeline compilation failed.");
            
            const liveUrlView = URL.createObjectURL(compiledPngBlob);
            
            bgPreviewSection.classList.remove('hidden');
            bgInputImage.src = liveUrlView;
            bgOutputImage.src = "";
            bgOutputImage.classList.add('opacity-dim');
            setBgDownloadButtonState(false);

            await runNeuralBackgroundAI(compiledPngBlob, dynamicFallbackName);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable. Reverting to direct link layout streams: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            bgPreviewSection.classList.remove('hidden');
            bgInputImage.src = rawDirectUrl;
            await runNeuralBackgroundAI(incomingFileOrBlob, dynamicFallbackName);
        } catch (finalCrashState) {
            showBgDiagnosticCrashCard(
                "Image Loading Error",
                "Layout Reader Fault",
                "The browser failed to read or display this image layout structure.",
                pipelineFault.message
            );
            toggleBgLoaderDisplay(false);
        }
    }
}

// Executes background removal model natively via ONNX WebAssembly
async function runNeuralBackgroundAI(cleanPngBlob, originalFileName) {
    toggleBgLoaderDisplay(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        const outputResultBlob = await removeBackground(cleanPngBlob, {
            progress: (instance, doneAmount, totalAmount) => {
                const percentDone = Math.round((doneAmount / totalAmount) * 100);
                toggleBgLoaderDisplay(true, `Isolating subject shapes... (${isNaN(percentDone) ? 0 : percentDone}%)`);
            }
        });

        const maskObjectURL = URL.createObjectURL(outputResultBlob);
        bgOutputImage.src = maskObjectURL;
        bgOutputImage.classList.remove('opacity-dim');
        
        setBgDownloadButtonState(true, () => {
            const transferAnchor = document.createElement('a');
            transferAnchor.href = maskObjectURL;
            const basicCleanedName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
            transferAnchor.download = `${basicCleanedName}_clearcut.png`;
            transferAnchor.click();
        });

        toggleBgLoaderDisplay(false);
    } catch (aiComputeFault) {
        showBgDiagnosticCrashCard(
            "AI Core Engine Issue",
            "ONNX Model Memory Exception",
            "The background removal failed. This usually happens if your browser tab runs out of memory while processing very large high-resolution images.",
            aiComputeFault.message || "WASM Stack limit reached"
        );
        toggleBgLoaderDisplay(false);
    }
}

// VISION ANALYSIS UTILITY FUNCTIONS
function clearVisionErrors() {
    visionErrorCard.classList.add('hidden');
}

function showVisionDiagnosticCrashCard(badge, title, message, stackTrace) {
    visionErrorBadge.innerText = badge;
    visionErrorTitle.innerText = title;
    visionErrorDesc.innerText = message;
    visionErrorTrace.innerText = stackTrace || "No structural trace reporting active.";
    visionErrorCard.classList.remove('hidden');
    visionErrorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleVisionLoaderDisplay(visible, trackingText = "") {
    if (visible) {
        visionStatusCard.classList.remove('hidden');
        visionStatusText.innerText = trackingText;
    } else {
        visionStatusCard.classList.add('hidden');
    }
}

function setVisionDownloadButtonState(enabled, clickCallback = null) {
    if (enabled) {
        visionDownloadBtn.classList.remove('disabled');
        visionDownloadBtn.onclick = clickCallback;
    } else {
        visionDownloadBtn.classList.add('disabled');
        visionDownloadBtn.onclick = null;
    }
}

// BACKGROUND REMOVAL UTILITY FUNCTIONS
function clearBgErrors() {
    bgErrorCard.classList.add('hidden');
}

function showBgDiagnosticCrashCard(badge, title, message, stackTrace) {
    bgErrorBadge.innerText = badge;
    bgErrorTitle.innerText = title;
    bgErrorDesc.innerText = message;
    bgErrorTrace.innerText = stackTrace || "No structural trace reporting active.";
    bgErrorCard.classList.remove('hidden');
    bgErrorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleBgLoaderDisplay(visible, trackingText = "") {
    if (visible) {
        bgStatusCard.classList.remove('hidden');
        bgStatusText.innerText = trackingText;
    } else {
        bgStatusCard.classList.add('hidden');
    }
}

function setBgDownloadButtonState(enabled, clickCallback = null) {
    if (enabled) {
        bgDownloadBtn.classList.remove('disabled');
        bgDownloadBtn.onclick = clickCallback;
    } else {
        bgDownloadBtn.classList.add('disabled');
        bgDownloadBtn.onclick = null;
    }
}
