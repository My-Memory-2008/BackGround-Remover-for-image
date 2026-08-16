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

// Drawing tool elements
const drawRectBtn = document.getElementById('draw-rect-btn');
const drawFreehandBtn = document.getElementById('draw-freehand-btn');
const clearDrawBtn = document.getElementById('clear-draw-btn');
const applyEnhancementBtn = document.getElementById('apply-enhancement-btn');

// Drawing variables
let isDrawing = false;
let startX, startY;
let currentTool = 'rectangle'; // Default tool
let currentPath = [];
let drawnPaths = []; // For freehand paths
let drawnRectangles = []; // For rectangles

// Set initial active state for drawing tools
drawRectBtn.classList.add('active');

// VISION ANALYSIS EVENT HANDLERS - EXACTLY LIKE YOUR ORIGINAL WORKING CODE
visionDropZone.addEventListener('click', () => visionFileInput.click());

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
    const canvas = document.getElementById('drawing-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawnPaths = [];
        drawnRectangles = [];
        window.selectedAreas = [];
    }
});

applyEnhancementBtn.addEventListener('click', async () => {
    if(!window.currentVisionBlob) {
        showVisionDiagnosticCrashCard(
            "No Image Selected", 
            "Upload Required",
            "Please upload an image first before applying enhancement."
        );
        return;
    }
    
    if (!window.selectedAreas || window.selectedAreas.length === 0) {
        showVisionDiagnosticCrashCard(
            "No Areas Selected",
            "Selection Required",
            "Please select areas on the image using the drawing tools before applying enhancement."
        );
        return;
    }
    
    const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, window.selectedAreas);
    displayVisionResults(window.currentVisionBlob, enhancedBlob);
});

// Vision enhancement function with drawing tool support
async function enhanceImageWithDrawing(imageBlob, selectedAreas) {
    toggleVisionLoaderDisplay(true, "Applying enhancement to selected areas...");
    
    try {
        // Create a canvas to process the image
        const imageUrl = URL.createObjectURL(imageBlob);
        const img = new Image();
        img.src = imageUrl;
        
        await new Promise((resolve) => {
            img.onload = resolve;
        });
        
        // Create canvas for processing
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        
        // Apply drawing overlay to the image
        if (selectedAreas && selectedAreas.length > 0) {
            ctx.globalCompositeOperation = 'source-over';
            
            for (const area of selectedAreas) {
                if (area.type === 'rectangle') {
                    const { x, y, width, height } = area;
                    
                    // Draw rectangle with semi-transparent fill
                    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)'; // Semi-transparent purple
                    ctx.fillRect(x, y, width, height);
                    
                    // Draw border
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 3;
                    ctx.strokeRect(x, y, width, height);
                    
                    // Enhance the area by adjusting brightness/contrast
                    const imageData = ctx.getImageData(x, y, width, height);
                    const data = imageData.data;
                    
                    for (let i = 0; i < data.length; i += 4) {
                        data[i] = Math.min(255, data[i] * 1.2);       // Red
                        data[i + 1] = Math.min(255, data[i + 1] * 1.2); // Green
                        data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Blue
                    }
                    
                    ctx.putImageData(imageData, x, y);
                } else if (area.type === 'freehand') {
                    // For freehand paths, we'll enhance pixels along the path
                    for (const point of area.points) {
                        const { x, y } = point;
                        
                        // Enhance a small area around each point
                        for (let dy = -5; dy <= 5; dy++) {
                            for (let dx = -5; dx <= 5; dx++) {
                                const px = x + dx;
                                const py = y + dy;
                                
                                if (px >= 0 && px < canvas.width && py >= 0 && py < canvas.height) {
                                    const imageData = ctx.getImageData(px, py, 1, 1);
                                    const data = imageData.data;
                                    
                                    data[0] = Math.min(255, data[0] * 1.2); // Red
                                    data[1] = Math.min(255, data[1] * 1.2); // Green
                                    data[2] = Math.min(255, data[2] * 1.2); // Blue
                                    
                                    ctx.putImageData(imageData, px, py);
                                }
                            }
                        }
                    }
                    
                    // Draw the path
                    ctx.beginPath();
                    ctx.moveTo(area.points[0].x, area.points[0].y);
                    for (let i = 1; i < area.points.length; i++) {
                        ctx.lineTo(area.points[i].x, area.points[i].y);
                    }
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 4;
                    ctx.stroke();
                }
            }
        }
        
        // Convert canvas back to blob
        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                resolve(blob);
            }, 'image/png');
        });
    } catch (error) {
        console.error('Enhancement error:', error);
        showVisionDiagnosticCrashCard(
            "Enhancement Failed",
            "Image Processing Error",
            "Could not enhance image.",
            error.message
        );
        // Return original if enhancement fails
        return imageBlob;
    } finally {
        toggleVisionLoaderDisplay(false);
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
    
    // Apply enhancement to the entire image
    const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, [{type: 'rectangle', x: 0, y: 0, width: 100, height: 100}]);
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
    
    // Apply enhancement to selected areas
    if (window.selectedAreas && window.selectedAreas.length > 0) {
        const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, window.selectedAreas);
        displayVisionResults(window.currentVisionBlob, enhancedBlob);
    } else {
        showVisionDiagnosticCrashCard(
            "No Areas Selected",
            "Selection Required",
            "Please select areas on the image using the drawing tools before applying enhancement."
        );
    }
});

// Vision processing function - EXACTLY LIKE YOUR ORIGINAL WORKING CODE
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
            
            // Add drawing tools after the image is loaded
            addDrawingToolsToImage();
            
            toggleVisionLoaderDisplay(false);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable for vision analysis: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            visionPreviewSection.classList.remove('hidden');
            visionInputImage.src = rawDirectUrl;
            window.currentVisionBlob = incomingFileOrBlob;
            
            // Add drawing tools after the image is loaded
            addDrawingToolsToImage();
            
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

// Function to add drawing tools to the image
function addDrawingToolsToImage() {
    const imageElement = visionInputImage;
    
    // Remove existing drawing canvas if present
    const existingCanvas = document.getElementById('drawing-canvas');
    if (existingCanvas) {
        existingCanvas.remove();
    }
    
    // Create a canvas overlay for drawing
    const canvas = document.createElement('canvas');
    canvas.id = 'drawing-canvas';
    canvas.width = imageElement.naturalWidth || imageElement.width;
    canvas.height = imageElement.naturalHeight || imageElement.height;
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'auto';
    canvas.style.cursor = 'crosshair';
    
    // Position the canvas relative to the image container
    const imageContainer = visionInputImage.parentElement;
    imageContainer.style.position = 'relative';
    imageContainer.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    ctx.strokeStyle = '#a855f7'; // Purple stroke for visibility
    ctx.lineWidth = 4; // Thicker line for better visibility
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)'; // Semi-transparent fill for rectangles
    
    // Drawing state
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    currentPath = [];
    
    // Initialize selected areas array
    if (!window.selectedAreas) {
        window.selectedAreas = [];
    }
    
    // Mouse events for drawing
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', handleTouchStart);
    canvas.addEventListener('touchmove', handleTouchMove);
    canvas.addEventListener('touchend', handleTouchEnd);
    
    function startDrawing(e) {
        e.preventDefault();
        isDrawing = true;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        lastX = (e.clientX - rect.left) * scaleX;
        lastY = (e.clientY - rect.top) * scaleY;
        
        if (currentTool === 'freehand') {
            currentPath = [{x: lastX, y: lastY}];
            ctx.beginPath();
            ctx.moveTo(lastX, lastY);
        } else if (currentTool === 'rectangle') {
            // For rectangle, we'll store the starting point
            window.rectStartX = lastX;
            window.rectStartY = lastY;
        }
    }
    
    function draw(e) {
        if (!isDrawing) return;
        
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        
        const currentX = (e.clientX - rect.left) * scaleX;
        const currentY = (e.clientY - rect.top) * scaleY;
        
        if (currentTool === 'freehand') {
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
            
            currentPath.push({x: currentX, y: currentY});
            lastX = currentX;
            lastY = currentY;
        } else if (currentTool === 'rectangle') {
            // Clear the canvas to redraw everything
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Redraw all previous rectangles with fill
            for (const rect of window.selectedAreas.filter(area => area.type === 'rectangle')) {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 4;
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            }
            
            // Draw the current rectangle being drawn
            const width = currentX - window.rectStartX;
            const height = currentY - window.rectStartY;
            
            ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
            ctx.fillRect(window.rectStartX, window.rectStartY, width, height);
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 4;
            ctx.strokeRect(window.rectStartX, window.rectStartY, width, height);
        }
    }
    
    function stopDrawing(e) {
        if (!isDrawing) return;
        isDrawing = false;
        
        if (currentTool === 'freehand' && currentPath.length > 0) {
            // Save the completed path
            window.selectedAreas.push({
                type: 'freehand',
                points: [...currentPath]
            });
            
            // Redraw all freehand paths
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Redraw all rectangles
            for (const rect of window.selectedAreas.filter(area => area.type === 'rectangle')) {
                ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
                ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 4;
                ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
            }
            
            // Redraw all freehand paths
            for (const path of window.selectedAreas.filter(area => area.type === 'freehand')) {
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
            const width = lastX - window.rectStartX;
            const height = lastY - window.rectStartY;
            
            // Only save if the rectangle is significant (not just a click)
            if (Math.abs(width) > 10 && Math.abs(height) > 10) {
                window.selectedAreas.push({
                    type: 'rectangle',
                    x: Math.min(window.rectStartX, lastX),
                    y: Math.min(window.rectStartY, lastY),
                    width: Math.abs(width),
                    height: Math.abs(height)
                });
                
                // Redraw all rectangles to show them permanently
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                // Redraw all rectangles
                for (const rect of window.selectedAreas.filter(area => area.type === 'rectangle')) {
                    ctx.fillStyle = 'rgba(168, 85, 247, 0.3)';
                    ctx.fillRect(rect.x, rect.y, rect.width, rect.height);
                    ctx.strokeStyle = '#a855f7';
                    ctx.lineWidth = 4;
                    ctx.strokeRect(rect.x, rect.y, rect.width, rect.height);
                }
                
                // Redraw all freehand paths
                for (const path of window.selectedAreas.filter(area => area.type === 'freehand')) {
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
        canvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchMove(e) {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    }
    
    function handleTouchEnd(e) {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
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

// BACKGROUND REMOVAL EVENT HANDLERS (YOUR ORIGINAL WORKING CODE - COMPLETELY UNCHANGED)
dropZone.addEventListener('click', () => fileInput.click());

fileInput.addEventListener('change', (event) => {
    if (event.target.files && event.target.files.length > 0) {
        clearActiveErrors();
        const rawFileObj = event.target.files[0];
        processTargetBlob(rawFileObj);
    }
});

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

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    clearActiveErrors();
    
    const dataPayload = e.dataTransfer;
    if (dataPayload && dataPayload.files && dataPayload.files.length > 0) {
        const rawFileObj = dataPayload.files[0];
        processTargetBlob(rawFileObj);
    }
});

// Background removal URL fetch
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

// Background removal processing function (YOUR ORIGINAL WORKING CODE - COMPLETELY UNCHANGED)
async function processTargetBlob(incomingFileOrBlob) {
    if (!incomingFileOrBlob) return;

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
    const dynamicFallbackName = incomingFileOrBlob.name || "processed_asset.png";

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

            await runNeuralBackgroundAI(compiledPngBlob, dynamicFallbackName);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable. Reverting to direct link layout streams: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            previewSection.classList.remove('hidden');
            inputImage.src = rawDirectUrl;
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

// Executes background removal model natively via ONNX WebAssembly (YOUR ORIGINAL WORKING CODE - COMPLETELY UNCHANGED)
async function runNeuralBackgroundAI(cleanPngBlob, originalFileName) {
    toggleLoaderDisplay(true, "AI executing background segmentation layer (Computing locally)...");
    try {
        const outputResultBlob = await removeBackground(cleanPngBlob, {
            progress: (instance, doneAmount, totalAmount) => {
                const percentDone = Math.round((doneAmount / totalAmount) * 100);
                toggleLoaderDisplay(true, `Isolating subject shapes... (${isNaN(percentDone) ? 0 : percentDone}%)`);
            }
        });

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

// BACKGROUND REMOVAL UTILITY FUNCTIONS (YOUR ORIGINAL WORKING CODE - COMPLETELY UNCHANGED)
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
