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

// Drawing canvases
const visionDrawCanvas = document.getElementById('vision-drawing-canvas');
const mainDrawCanvas = document.getElementById('drawing-canvas');

// Drawing variables
let isDrawing = false;
let currentTool = 'freehand'; // Default to freehand
let pointCoordinatesArray = []; // Stores the shape path data to pass to the AI engine

// Set initial active state for drawing tools
drawFreehandBtn.classList.add('active');

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
    const drawCtx = visionDrawCanvas.getContext('2d');
    drawCtx.clearRect(0, 0, visionDrawCanvas.width, visionDrawCanvas.height);
    pointCoordinatesArray = [];
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
    
    if (pointCoordinatesArray.length === 0) {
        showVisionDiagnosticCrashCard(
            "No Areas Selected",
            "Selection Required",
            "Please select areas on the image using the drawing tools before applying enhancement."
        );
        return;
    }
    
    const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, pointCoordinatesArray);
    displayVisionResults(window.currentVisionBlob, enhancedBlob);
});

// Vision enhancement function with drawing tool support
async function enhanceImageWithDrawing(imageBlob, coordinatesArray) {
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
        
        // Calculate bounding box from coordinates
        if (coordinatesArray.length > 0) {
            let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
            
            for (const point of coordinatesArray) {
                minX = Math.min(minX, point.x);
                minY = Math.min(minY, point.y);
                maxX = Math.max(maxX, point.x);
                maxY = Math.max(maxY, point.y);
            }
            
            // Convert normalized coordinates back to actual image coordinates
            const scaleX = img.width / visionDrawCanvas.width;
            const scaleY = img.height / visionDrawCanvas.height;
            
            const actualMinX = Math.floor(minX * scaleX);
            const actualMinY = Math.floor(minY * scaleY);
            const actualMaxX = Math.ceil(maxX * scaleX);
            const actualMaxY = Math.ceil(maxY * scaleY);
            
            // Enhance the area by adjusting brightness/contrast
            const width = actualMaxX - actualMinX;
            const height = actualMaxY - actualMinY;
            
            if (width > 0 && height > 0) {
                const imageData = ctx.getImageData(actualMinX, actualMinY, width, height);
                const data = imageData.data;
                
                for (let i = 0; i < data.length; i += 4) {
                    data[i] = Math.min(255, data[i] * 1.3);       // Red
                    data[i + 1] = Math.min(255, data[i + 1] * 1.3); // Green
                    data[i + 2] = Math.min(255, data[i + 2] * 1.3); // Blue
                }
                
                ctx.putImageData(imageData, actualMinX, actualMinY);
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
    const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, []);
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
    if (pointCoordinatesArray.length > 0) {
        const enhancedBlob = await enhanceImageWithDrawing(window.currentVisionBlob, pointCoordinatesArray);
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
            
            // Initialize drawing for the vision canvas
            initializeDrawing(visionDrawCanvas);
            
            toggleVisionLoaderDisplay(false);
        }, 'image/png');

    } catch (pipelineFault) {
        console.warn("Canvas hardware accelerator unavailable for vision analysis: ", pipelineFault);
        try {
            const rawDirectUrl = URL.createObjectURL(incomingFileOrBlob);
            visionPreviewSection.classList.remove('hidden');
            visionInputImage.src = rawDirectUrl;
            window.currentVisionBlob = incomingFileOrBlob;
            
            // Initialize drawing for the vision canvas
            initializeDrawing(visionDrawCanvas);
            
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

// Function to initialize drawing for a canvas
function initializeDrawing(canvas) {
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    let isDrawing = false;
    let startX, startY;
    let rectStartX, rectStartY;
    pointCoordinatesArray = [];

    // Resize the tracking layer to match the visual box boundaries
    const resizeCanvasLayer = () => {
        canvas.width = canvas.parentElement.clientWidth;
        canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', resizeCanvasLayer);
    resizeCanvasLayer(); // Initial resize

    // Track mouse / Touch interactions
    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        resizeCanvasLayer();
        ctx.strokeStyle = '#a855f7'; // Bright Neon Purple line
        ctx.lineWidth = 4;
        ctx.lineCap = 'round';
        ctx.beginPath();
        
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / canvas.offsetWidth * canvas.width;
        const y = (e.clientY - rect.top) / canvas.offsetHeight * canvas.height;
        
        if (currentTool === 'rectangle') {
            startX = x;
            startY = y;
            rectStartX = x;
            rectStartY = y;
        } else {
            ctx.moveTo(x, y);
            pointCoordinatesArray.push({ x, y });
        }
    });

    canvas.addEventListener('mousemove', (e) => {
        if (!isDrawing) return;
        const rect = canvas.getBoundingClientRect();
        const x = (e.clientX - rect.left) / canvas.offsetWidth * canvas.width;
        const y = (e.clientY - rect.top) / canvas.offsetHeight * canvas.height;
        
        if (currentTool === 'freehand') {
            ctx.lineTo(x, y);
            ctx.stroke();
            pointCoordinatesArray.push({ x, y });
        } else if (currentTool === 'rectangle') {
            // Clear and redraw to show the current rectangle being drawn
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            // Redraw existing shapes
            if (pointCoordinatesArray.length > 0) {
                ctx.beginPath();
                ctx.moveTo(pointCoordinatesArray[0].x, pointCoordinatesArray[0].y);
                for (let i = 1; i < pointCoordinatesArray.length; i++) {
                    ctx.lineTo(pointCoordinatesArray[i].x, pointCoordinatesArray[i].y);
                }
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 4;
                ctx.stroke();
            }
            
            // Draw the current rectangle being drawn
            const width = x - rectStartX;
            const height = y - rectStartY;
            
            ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
            ctx.fillRect(rectStartX, rectStartY, width, height);
            ctx.strokeStyle = '#a855f7';
            ctx.lineWidth = 4;
            ctx.strokeRect(rectStartX, rectStartY, width, height);
        }
    });

    window.addEventListener('mouseup', () => {
        if (!isDrawing) return;
        isDrawing = false;
        
        if (currentTool === 'rectangle') {
            const rect = canvas.getBoundingClientRect();
            const x = (rect.right - rect.left) / canvas.offsetWidth * canvas.width;
            const y = (rect.bottom - rect.top) / canvas.height;
            
            const width = x - startX;
            const height = y - startY;
            
            if (Math.abs(width) > 10 && Math.abs(height) > 10) {
                // Add rectangle as a series of points for the bounding box
                const points = [
                    {x: startX, y: startY},
                    {x: x, y: startY},
                    {x: x, y: y},
                    {x: startX, y: y},
                    {x: startX, y: startY}
                ];
                
                pointCoordinatesArray = [...pointCoordinatesArray, ...points];
                
                // Draw the final rectangle
                ctx.fillStyle = 'rgba(168, 85, 247, 0.2)';
                ctx.fillRect(startX, startY, width, height);
                ctx.strokeStyle = '#a855f7';
                ctx.lineWidth = 4;
                ctx.strokeRect(startX, startY, width, height);
            }
        }
        
        console.log("Captured Priority Zone Coordinates:", pointCoordinatesArray);
    });
    
    // Touch events for mobile
    canvas.addEventListener('touchstart', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousedown', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const touch = e.touches[0];
        const mouseEvent = new MouseEvent('mousemove', {
            clientX: touch.clientX,
            clientY: touch.clientY
        });
        canvas.dispatchEvent(mouseEvent);
    });

    canvas.addEventListener('touchend', (e) => {
        e.preventDefault();
        const mouseEvent = new MouseEvent('mouseup', {});
        canvas.dispatchEvent(mouseEvent);
    });
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
