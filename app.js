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
const foregroundPrompt = document.getElementById('foreground-prompt');

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
const drawRectBtn = document.getElementById('draw-rect-btn');
const drawFreehandBtn = document.getElementById('draw-freehand-btn');
const clearDrawBtn = document.getElementById('clear-draw-btn');
const applyDrawingBtn = document.createElement('button');
applyDrawingBtn.id = 'apply-drawing-btn';
applyDrawingBtn.className = 'tool-btn apply-btn';
applyDrawingBtn.textContent = 'Apply Drawing';
applyDrawingBtn.style.marginLeft = 'auto';

const drawingCanvas = document.getElementById('drawing-canvas');

// Drawing variables
let isDrawing = false;
let startX, startY;
let currentTool = 'rectangle'; // Default to rectangle
let currentPath = [];
window.drawingCoordinates = []; // Store coordinates globally

// Set initial active state for drawing tools
drawRectBtn.classList.add('active');

// Add the apply button to the drawing controls
document.querySelector('.drawing-controls').appendChild(applyDrawingBtn);

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
    toggleLoaderDisplay(true, "Downloading image file from URL stream...");
    
    try {
        const response = await fetch(rawUrl);
        if (!response.ok) throw new Error(`HTTP Error Status: ${response.status}`);
        const imageBlob = await response.blob();
        processTargetBlob(imageBlob, "downloaded_image.png");
    } catch (err) {
        showDiagnosticCrashCard(
            "Network Request Blocked",
            "CORS Access Error",
            "Could not load the image from that URL. The website hosting this image blocks direct script access due to Cross-Origin Security Laws.",
            err.message
        );
        toggleLoaderDisplay(false);
    }
});

// Drawing tool event handlers
drawRectBtn.addEventListener('click', () => {
    currentTool = 'rectangle';
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    drawRectBtn.classList.add('active');
});

drawFreehandBtn.addEventListener('click', () => {
    currentTool = 'freehand';
    document.querySelectorAll('.tool-btn').forEach(btn => btn.classList.remove('active'));
    drawFreehandBtn.classList.add('active');
});

clearDrawBtn.addEventListener('click', () => {
    const ctx = drawingCanvas.getContext('2d');
    ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
    window.drawingCoordinates = [];
    currentPath = [];
});

// Apply Drawing button event handler
applyDrawingBtn.addEventListener('click', async () => {
    if (!inputImage.src) {
        showDiagnosticCrashCard(
            "No Image Loaded",
            "Image Required",
            "Please upload an image first before applying drawing."
        );
        return;
    }
    
    if (window.drawingCoordinates.length === 0) {
        showDiagnosticCrashCard(
            "No Drawing Areas",
            "Selection Required",
            "Please draw areas on the image that you want to keep before applying."
        );
        return;
    }
    
    // Re-process the image with the drawn coordinates
    const imgSrc = inputImage.src;
    const blob = await fetch(imgSrc).then(r => r.blob());
    await runNeuralBackgroundAI(blob, "processed_with_drawing.png");
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
        
        ctx.strokeStyle = '#a855f7';
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        if (currentTool === 'freehand') {
            ctx.moveTo(startX, startY);
            currentPath = [{ x: startX, y: startY }];
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
        
        if (currentTool === 'freehand') {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            currentPath.push({ x: currentX, y: currentY });
        } else if (currentTool === 'rectangle') {
            // Clear canvas and redraw
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            
            // Redraw all previously stored rectangles
            for (const rect of window.drawingCoordinates) {
                if (rect.type === 'rectangle') {
                    ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
                    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 2;
                    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
                }
            }
            
            // Draw current rectangle being drawn
            const width = currentX - window.rectStartX;
            const height = currentY - window.rectStartY;
            
            ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
            ctx.fillRect(window.rectStartX, window.rectStartY, width, height);
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 2;
            ctx.strokeRect(window.rectStartX, window.rectStartY, width, height);
        }
    }
    
    function stopDrawing(e) {
        if (!isDrawing) return;
        isDrawing = false;
        
        if (currentTool === 'freehand' && currentPath.length > 0) {
            // Save the completed path
            window.drawingCoordinates.push({
                type: 'freehand',
                points: [...currentPath]
            });
            
            // Redraw all freehand paths
            ctx.clearRect(0, 0, drawingCanvas.width, drawingCanvas.height);
            
            // Redraw all rectangles
            for (const rect of window.drawingCoordinates.filter(area => area.type === 'rectangle')) {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 2;
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            }
            
            // Redraw all freehand paths
            for (const path of window.drawingCoordinates.filter(area => area.type === 'freehand')) {
                if (path.points.length > 1) {
                    ctx.beginPath();
                    ctx.moveTo(path.points[0].x, path.points[0].y);
                    for (let i = 1; i < path.points.length; i++) {
                        ctx.lineTo(path.points[i].x, path.points[i].y);
                    }
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
        } else if (currentTool === 'rectangle') {
            // Calculate rectangle dimensions
            const width = startX < currentX ? currentX - startX : startX - currentX;
            const height = startY < currentY ? currentY - startY : startY - currentY;
            const x = startX < currentX ? startX : currentX;
            const y = startY < currentY ? startY : currentY;
            
            if (width > 10 && height > 10) { // Only add significant rectangles
                window.drawingCoordinates.push({
                    type: 'rectangle',
                    x: x,
                    y: y,
                    width: width,
                    height: height
                });
                
                // Redraw to show permanent rectangle
                ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
                ctx.fillRect(x, y, width, height);
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 2;
                ctx.strokeRect(x, y, width, height);
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

// Core File Processor
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

    toggleLoaderDisplay(true, "Decoding graphical layout arrays...");
    const dynamicFallbackName = originalFileName || incomingFileOrBlob.name || "processed_asset.png";

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
            outputImage.src = "";
            outputImage.classList.add('opacity-dim');
            setDownloadButtonState(false);

            // Reset drawing coordinates for this new image
            window.drawingCoordinates = [];
            currentPath = [];
            
            // Process without drawing initially
            await runNeuralBackgroundAI(compiledPngBlob, dynamicFallbackName);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable. Reverting to direct link layout streams: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            previewSection.classList.remove('hidden');
            inputImage.src = rawDirectUrl;
            window.drawingCoordinates = [];
            currentPath = [];
            await runNeuralBackgroundAI(incomingFileOrBlob, dynamicFallbackName);
        } catch (finalCrashState) {
            showDiagnosticCrashCard(
                "Image Loading Error",
                "Layout Reader Fault",
                "The browser failed to read or display this image layout structure.",
                pipelineFault.message
            );
            toggleLoaderDisplay(false);
        }
    }
}

// Executes background removal model natively via ONNX WebAssembly
async function runNeuralBackgroundAI(cleanPngBlob, originalFileName) {
    toggleLoaderDisplay(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        // Prepare foreground hints from drawing coordinates
        let foregroundHints = [];
        
        // Convert drawing coordinates to foreground hints
        for (const coord of window.drawingCoordinates) {
            if (coord.type === 'rectangle') {
                // Calculate normalized coordinates for the image size
                const scaleX = 1 / inputImage.naturalWidth;
                const scaleY = 1 / inputImage.naturalHeight;
                
                const normalizedX = coord.x * scaleX;
                const normalizedY = coord.y * scaleY;
                const normalizedWidth = coord.width * scaleX;
                const normalizedHeight = coord.height * scaleY;
                
                foregroundHints.push({
                    x: normalizedX,
                    y: normalizedY,
                    width: normalizedWidth,
                    height: normalizedHeight
                });
            }
        }
        
        // Add prompt if available
        const prompt = foregroundPrompt.value.trim();
        if (prompt) {
            console.log("Foreground prompt:", prompt);
        }
        
        const options = {
            progress: (instance, doneAmount, totalAmount) => {
                const percentDone = Math.round((doneAmount / totalAmount) * 100);
                toggleLoaderDisplay(true, `Isolating subject shapes... (${isNaN(percentDone) ? 0 : percentDone}%)`);
            }
        };
        
        // Add foreground hints if available
        if (foregroundHints.length > 0) {
            options.foreground_hints = foregroundHints;
        }
        
        const outputResultBlob = await removeBackground(cleanPngBlob, options);

        const maskObjectURL = URL.createObjectURL(outputResultBlob);
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
