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

// User Interface DOM Target Connections
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

const errorCard = document.getElementById('error-card');
const errorTitle = document.getElementById('error-title');
const errorBadge = document.getElementById('error-badge');
const errorDesc = document.getElementById('error-desc');
const errorTrace = document.getElementById('error-trace');

// Drawing elements
const drawBrushBtn = document.getElementById('draw-brush-btn');
const drawRectBtn = document.getElementById('draw-rect-btn');
const clearDrawBtn = document.getElementById('clear-draw-btn');
const removeBgBtn = document.getElementById('remove-bg-btn');
const drawingCanvas = document.getElementById('drawing-canvas');

// Drawing variables
let isDrawing = false;
let startX, startY;
let currentTool = 'brush'; // Default to brush
let currentPath = [];
window.userDrawingMask = null; // Store user drawing mask

// Set initial active state for drawing tools
drawBrushBtn.classList.add('active');

// Core Click Setup: Click the box area to activate browsing windows
dropZone.addEventListener('click', () => fileInput.click());

// Handle explicit system browse selection uploads
fileInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files.length > 0) {
        clearActiveErrors();
        // UNPACK ACTION: Safely extract the raw File element from the wrapper collection array
        const rawFileObj = event.target.files[0];
        processTargetBlob(rawFileObj);
    }
});

// Drag and Drop Layout Event Interceptors
['dragenter', 'dragover'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--accent-purple)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.6)";
    }, false);
});

['dragleave', 'drop'].forEach(eventName => {
    dropZone.addEventListener(eventName, (e) => {
        e.preventDefault();
        dropZone.style.borderColor = "var(--border-color)";
        dropZone.style.backgroundColor = "rgba(2, 6, 23, 0.3)";
    }, false);
});

// Drop zone drop trigger processor
dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    clearActiveErrors();
    
    const dataPayload = e.dataTransfer;
    if (dataPayload && dataPayload.files && dataPayload.files.length > 0) {
        // UNPACK ACTION: Safely pull index zero from the drag file collection stream
        const rawFileObj = dataPayload.files[0];
        processTargetBlob(rawFileObj);
    }
});

// Clipboard Paste Actions Loader Tracker
window.addEventListener('paste', async (e) => {
    const clipboardPayload = e.clipboardData?.items;
    if (!clipboardPayload) return;
    
    for (let item of clipboardPayload) {
        if (item.type.indexOf("image") !== -1) {
            clearActiveErrors();
            const matchingFile = item.getAsFile();
            processTargetBlob(matchingFile);
            break;
        }
    }
});

// Fetch Remote Web Address URLs
urlBtn.addEventListener('click', async () => {
    const rawUrl = urlInput.value.trim();
    if (!rawUrl) return;
    
    clearActiveErrors();
    // Show image upload only, don't process yet
    const imageBlob = await fetch(rawUrl).then(r => r.blob());
    processTargetBlob(imageBlob, "downloaded_image.png");
});

// Drawing tool event handlers
drawBrushBtn.addEventListener('click', () => {
    currentTool = 'brush';
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    drawBrushBtn.classList.add('active');
});

drawRectBtn.addEventListener('click', () => {
    currentTool = 'rectangle';
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    drawRectBtn.classList.add('active');
});

clearDrawBtn.addEventListener('click', () => {
    const ctx = drawingCanvas.getContext('2d');
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    window.userDrawingMask = null;
});

// Remove Background button event handler (Manual trigger)
removeBgBtn.addEventListener('click', async () => {
    if (!inputImage.src) {
        showDiagnosticCrashCard(
            "No Image Loaded",
            "Image Required",
            "Please upload an image first before removing background."
        );
        return;
    }
    
    // Get the current image source and convert to blob
    const imgSrc = inputImage.src;
    const blob = await fetch(imgSrc).then(r => r.blob());
    await runNeuralBackgroundAI(blob, "processed_image.png");
});

// Initialize drawing for main canvas
function initializeDrawing() {
    if (!drawingCanvas) return;
    
    const ctx = drawingCanvas.getContext('2d');
    
    // Resize canvas to match container
    const resizeCanvas = () => {
        drawingCanvas.width = drawingCanvas.parentElement.clientWidth;
        drawingCanvas.height = drawingCanvas.parentElement.clientHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas(); // Initial resize
    
    // Mouse events
    drawingCanvas.addEventListener('mousedown', startDrawing);
    drawingCanvas.addEventListener('mousemove', draw);
    window.addEventListener('mouseup', stopDrawing);
    
    // Touch events for mobile
    drawingCanvas.addEventListener('touchstart', handleTouchStart);
    drawingCanvas.addEventListener('touchmove', handleTouchMove);
    drawingCanvas.addEventListener('touchend', handleTouchEnd);
    
    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        const rect = drawingCanvas.getBoundingClientRect();
        const scaleX = drawingCanvas.width / rect.width;
        const scaleY = drawingCanvas.height / rect.height;
        
        startX = (e.clientX - rect.left) * scaleX;
        startY = (e.clientY - rect.top) * scaleY;
        
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)'; // White for drawing mask
        ctx.lineWidth = 20;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.beginPath();
        
        if (currentTool === 'brush') {
            ctx.moveTo(startX, startY);
        } else if (currentTool === 'rectangle') {
            // For rectangle, we'll store the starting point
            window.rectStartX = startX;
            window.rectStartY = startY;
        }
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = drawingCanvas.getBoundingClientRect();
        const scaleX = drawingCanvas.width / rect.width;
        const scaleY = drawingCanvas.height / rect.height;
        
        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;
        
        if (currentTool === 'brush') {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        } else if (currentTool === 'rectangle') {
            // Clear canvas and redraw
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            
            // Draw the current rectangle being drawn
            const width = currentX - window.rectStartX;
            const height = currentY - window.rectStartY;
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            ctx.fillRect(window.rectStartX, window.rectStartY, width, height);
        }
    }
    
    function stopDrawing(e) {
        if (!isDrawing) return;
        isDrawing = false;
        
        if (currentTool === 'rectangle') {
            // Calculate rectangle dimensions
            const width = startX < currentX ? currentX - startX : startX - currentX;
            const height = startY < currentY ? currentY - startY : startY - currentY;
            const x = startX < currentX ? startX : currentX;
            const y = startY < currentY ? startY : currentY;
            
            if (width > 10 && height > 10) { // Only add significant rectangles
                // Draw the final rectangle
                const ctx = drawingCanvas.getContext('2d');
                ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                ctx.fillRect(x, y, width, height);
            }
        }
    }
    
    function handleTouchStart(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        drawingCanvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        drawingCanvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        drawingCanvas.dispatchEvent(mouseEvent);
    }
}

// Initialize drawing when page loads
document.addEventListener('DOMContentLoaded', initializeDrawing);

// Core File Processor (Updated to NOT process immediately)
async function processTargetBlob(incomingFileOrBlob, originalFileName = null) {
    if (!incomingFileOrBlob) return;

    // Check file structure type configurations safely
    if (!incomingFileOrBlob.type || !incomingFileOrBlob.type.startsWith('image/')) {
        showDiagnosticCrashCard(
            "Format Rejection",
            "Unsupported Extension Type",
            "The upload failed because this file type is not a valid format. Please choose an image like PNG, JPG, or WEBP.",
            `Received Type: ${incomingFileOrBlob.type || 'Unknown'}`
        );
        return;
    }

    // Just load the image without processing
    try {
        const decodedBitmap = await createImageBitmap(incomingFileOrBlob);
        const internalCanvas = document.createElement('canvas');
        internalCanvas.width = decodedBitmap.width;
        internalCanvas.height = decodedBitmap.height;
        
        const context = internalCanvas.getContext('2d');
        if (!context) throw new Error("Could not draw local pixel buffer allocations.");
        
        context.drawImage(decodedBitmap, 0, 0);
        imgSpecs.innerText = `${decodedBitmap.width} × ${decodedBitmap.height}`;

        internalCanvas.toBlob(async (compiledPngBlob) => {
            if (!compiledPngBlob) throw new Error("Canvas pipeline compilation failed.");
            
            const liveUrlView = URL.createObjectURL(compiledPngBlob);
            
            previewSection.classList.remove('hidden');
            inputImage.src = liveUrlView;
            outputImage.src = ""; // Don't process yet
            outputImage.classList.add('opacity-dim');
            setDownloadButtonState(false);

            // Clear the drawing canvas
            const ctx = drawingCanvas.getContext('2d');
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            
            // Don't process the image automatically - wait for manual trigger
            console.log("Image loaded. Click 'Remove Background' to process.");

        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable. Reverting to direct link layout streams: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            previewSection.classList.remove('hidden');
            inputImage.src = rawDirectUrl;
            outputImage.src = ""; // Don't process yet
            outputImage.classList.add('opacity-dim');
            setDownloadButtonState(false);
            
            // Clear the drawing canvas
            const ctx = drawingCanvas.getContext('2d');
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            
            // Don't process the image automatically - wait for manual trigger
            console.log("Image loaded. Click 'Remove Background' to process.");
            
        } catch (finalCrashState) {
            showDiagnosticCrashCard(
                "Image Loading Error",
                "Layout Reader Fault",
                "The browser failed to read or display this image layout structure.",
                pipelineFault.message
            );
        }
    }
}

// Executes background removal model natively via ONNX WebAssembly
async function runNeuralBackgroundAI(cleanPngBlob, originalFileName) {
    toggleLoaderDisplay(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        // Step 1: Run the AI model to get the automatic mask
        const aiResultBlob = await removeBackground(cleanPngBlob);
        
        // Step 2: Convert both original and AI result to image objects
        const originalImage = await blobToImage(cleanPngBlob);
        const aiResultImage = await blobToImage(aiResultBlob);
        
        // Step 3: Get the dimensions
        const width = originalImage.naturalWidth;
        const height = originalImage.naturalHeight;
        
        // Step 4: Create canvas to process the final image
        const finalCanvas = document.createElement('canvas');
        finalCanvas.width = width;
        finalCanvas.height = height;
        const finalCtx = finalCanvas.getContext('2d');
        
        // Step 5: Draw the original image
        finalCtx.drawImage(originalImage, 0, 0, width, height);
        const originalImageData = finalCtx.getImageData(0, 0, width, height);
        
        // Step 6: Draw the AI result to extract its alpha channel
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(aiResultImage, 0, 0, width, height);
        const aiImageData = tempCtx.getImageData(0, 0, width, height);
        
        // Step 7: Draw the user's drawing mask from the drawing canvas
        tempCtx.clearRect(0, 0, width, height);
        // Scale the drawing canvas to match the image size
        const drawingCtx = drawingCanvas.getContext('2d');
        tempCtx.drawImage(drawingCanvas, 0, 0, width, height);
        const userMaskData = tempCtx.getImageData(0, 0, width, height);
        
        // Step 8: Merge AI mask with user mask (Logical OR operation)
        for (let i = 0; i < originalImageData.data.length; i += 4) {
            const aiAlpha = aiImageData.data[i + 3];      // Transparency value from AI (0-255)
            const userAlpha = userMaskData.data[i + 3];  // Transparency value from user drawing (0-255)
            
            // Logical OR condition: If AI kept it OR user painted over it, keep the original pixel
            if (aiAlpha > 10 || userAlpha > 10) {
                // Keep original pixel values unchanged (Visible)
                originalImageData.data[i + 3] = 255; 
            } else {
                // Erase pixel entirely (Transparent background)
                originalImageData.data[i + 3] = 0;   
            }
        }
        
        // Step 9: Output the combined image data back onto the canvas
        finalCtx.putImageData(originalImageData, 0, 0);
        
        // Step 10: Create final blob and display result
        const finalBlob = await new Promise(resolve => {
            finalCanvas.toBlob(resolve, 'image/png');
        });
        
        const maskObjectURL = URL.createObjectURL(finalBlob);
        outputImage.src = maskObjectURL;
        outputImage.classList.remove('opacity-dim');
        
        setDownloadButtonState(true, () => {
            const transferAnchor = document.createElement('a');
            transferAnchor.href = maskObjectURL;
            const basicCleanedName = originalFileName.substring(0, originalFileName.lastIndexOf('.')) || originalFileName;
            transferAnchor.download = `${basicCleanedName}_clearcut.png`;
            transferAnchor.click();
        });

        toggleLoaderDisplay(false);
    } catch (aiComputeFault) {
        showDiagnosticCrashCard(
            "AI Core Engine Issue",
            "ONNX Model Memory Exception",
            "The background removal failed. This usually happens if your browser tab runs out of memory while processing very large high-resolution images.",
            aiComputeFault.message || "WASM Stack limit reached"
        );
        toggleLoaderDisplay(false);
    }
}

// Helper utility to turn blob data into HTML Image objects
function blobToImage(blob) {
    return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.src = URL.createObjectURL(blob);
    });
}

function clearActiveErrors() {
    errorCard.classList.add('hidden');
}

function showDiagnosticCrashCard(badge, title, message, stackTrace) {
    errorBadge.innerText = badge;
    errorTitle.innerText = title;
    errorDesc.innerText = message;
    errorTrace.innerText = stackTrace || "No structural trace reporting active.";
    errorCard.classList.remove('hidden');
    errorCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleLoaderDisplay(visible, trackingText = "") {
    if (visible) {
        statusCard.classList.remove('hidden');
        statusText.innerText = trackingText;
    } else {
        statusCard.classList.add('hidden');
    }
}

function setDownloadButtonState(enabled, clickCallback = null) {
    if (enabled) {
        downloadBtn.classList.remove('disabled');
        downloadBtn.onclick = clickCallback;
    } else {
        downloadBtn.classList.add('disabled');
        downloadBtn.onclick = null;
    }
}
