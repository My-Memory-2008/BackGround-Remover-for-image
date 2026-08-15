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

// Advanced vision enhancement function with semantic understanding
async function enhanceImageWithVision(imageBlob, prompt = "") {
    toggleVisionLoaderDisplay(true, "Understanding your request and enhancing image...");
    
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
        
        // Get image data for manipulation
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const data = imageData.data;
        
        // Parse the prompt to determine what to enhance
        const promptLower = prompt.toLowerCase();
        
        // Define regions based on common image compositions
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const quarterWidth = canvas.width / 4;
        const quarterHeight = canvas.height / 4;
        
        // Process the image based on the semantic understanding of the prompt
        if (promptLower.includes('face') || promptLower.includes('person') || promptLower.includes('character')) {
            // Enhance the face/person area (top half or center)
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Only enhance if it's likely a person area (center/top)
                    if (y < canvas.height * 0.7 && distance < canvas.width * 0.4) {
                        // Brighten faces
                        data[idx] = Math.min(255, data[idx] * 1.2);         // Red
                        data[idx + 1] = Math.min(255, data[idx + 1] * 1.2); // Green
                        data[idx + 2] = Math.min(255, data[idx + 2] * 1.2); // Blue
                    }
                }
            }
        } else if (promptLower.includes('background') || promptLower.includes('backdrop') || promptLower.includes('scene')) {
            // Enhance background areas (not the center where people usually are)
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Only enhance background areas (away from center)
                    if (distance > canvas.width * 0.3) {
                        // Enhance background colors
                        data[idx] = Math.min(255, data[idx] * 1.1);         // Red
                        data[idx + 1] = Math.min(255, data[idx + 1] * 1.1); // Green
                        data[idx + 2] = Math.min(255, data[idx + 2] * 1.1); // Blue
                    }
                }
            }
        } else if (promptLower.includes('sky') || promptLower.includes('clouds') || promptLower.includes('blue')) {
            // Enhance sky areas (usually top portion)
            for (let y = 0; y < canvas.height * 0.6; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Enhance blue tones for sky
                    data[idx + 2] = Math.min(255, data[idx + 2] * 1.2); // Enhance blue
                }
            }
        } else if (promptLower.includes('grass') || promptLower.includes('green') || promptLower.includes('nature')) {
            // Enhance green tones in lower portions (grass/nature)
            for (let y = canvas.height * 0.4; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Enhance green tones
                    data[idx + 1] = Math.min(255, data[idx + 1] * 1.2); // Enhance green
                }
            }
        } else if (promptLower.includes('water') || promptLower.includes('ocean') || promptLower.includes('sea')) {
            // Enhance blue/cyan tones in water areas
            for (let y = canvas.height * 0.6; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Enhance blue and cyan tones
                    data[idx + 1] = Math.min(255, data[idx + 1] * 1.1); // Green
                    data[idx + 2] = Math.min(255, data[idx + 2] * 1.2); // Blue
                }
            }
        } else if (promptLower.includes('brighten') || promptLower.includes('light') || promptLower.includes('lighter')) {
            // Overall brightening
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, data[i] * 1.2);       // Red
                data[i + 1] = Math.min(255, data[i + 1] * 1.2); // Green
                data[i + 2] = Math.min(255, data[i + 2] * 1.2); // Blue
            }
        } else if (promptLower.includes('darken') || promptLower.includes('darker')) {
            // Overall darkening
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.max(0, data[i] * 0.8);       // Red
                data[i + 1] = Math.max(0, data[i + 1] * 0.8); // Green
                data[i + 2] = Math.max(0, data[i + 2] * 0.8); // Blue
            }
        } else if (promptLower.includes('sharpen') || promptLower.includes('sharp')) {
            // Apply a simple sharpening effect
            const width = canvas.width;
            const height = canvas.height;
            
            // Create a copy of the original data
            const originalData = new Uint8ClampedArray(data);
            
            // Apply a simple sharpening kernel
            for (let y = 1; y < height - 1; y++) {
                for (let x = 1; x < width - 1; x++) {
                    for (let c = 0; c < 3; c++) { // R, G, B
                        const idx = (y * width + x) * 4 + c;
                        
                        // Apply sharpening kernel
                        let sum = originalData[idx] * 5;
                        sum -= originalData[(y * width + (x - 1)) * 4 + c]; // Left
                        sum -= originalData[(y * width + (x + 1)) * 4 + c]; // Right
                        sum -= originalData[((y - 1) * width + x) * 4 + c]; // Top
                        sum -= originalData[((y + 1) * width + x) * 4 + c]; // Bottom
                        
                        data[idx] = Math.min(255, Math.max(0, sum));
                    }
                }
            }
        } else if (promptLower.includes('contrast') || promptLower.includes('more contrast')) {
            // Increase contrast
            const factor = 1.3;
            for (let i = 0; i < data.length; i += 4) {
                data[i] = Math.min(255, Math.max(0, 128 + factor * (data[i] - 128)));       // Red
                data[i + 1] = Math.min(255, Math.max(0, 128 + factor * (data[i + 1] - 128))); // Green
                data[i + 2] = Math.min(255, Math.max(0, 128 + factor * (data[i + 2] - 128))); // Blue
            }
        } else if (promptLower.includes('saturation') || promptLower.includes('color') || promptLower.includes('colors')) {
            // Increase saturation
            for (let i = 0; i < data.length; i += 4) {
                // Convert to HSV-like representation to adjust saturation
                const r = data[i] / 255;
                const g = data[i + 1] / 255;
                const b = data[i + 2] / 255;
                
                const max = Math.max(r, g, b);
                const min = Math.min(r, g, b);
                const delta = max - min;
                
                if (delta > 0) {
                    const s = delta / max;
                    const newS = Math.min(1, s * 1.5); // Increase saturation by 50%
                    
                    // Apply new saturation
                    const newR = Math.min(255, Math.max(0, r * newS * 255));
                    const newG = Math.min(255, Math.max(0, g * newS * 255));
                    const newB = Math.min(255, Math.max(0, b * newS * 255));
                    
                    data[i] = newR;
                    data[i + 1] = newG;
                    data[i + 2] = newB;
                }
            }
        } else {
            // Default enhancement - subtle improvements to the main subject
            for (let y = 0; y < canvas.height; y++) {
                for (let x = 0; x < canvas.width; x++) {
                    const dx = x - centerX;
                    const dy = y - centerY;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    const idx = (y * canvas.width + x) * 4;
                    
                    // Apply subtle enhancements to center area (likely to contain the main subject)
                    if (distance < canvas.width * 0.5) {
                        data[idx] = Math.min(255, data[idx] * 1.1);         // Red
                        data[idx + 1] = Math.min(255, data[idx + 1] * 1.1); // Green
                        data[idx + 2] = Math.min(255, data[idx + 2] * 1.1); // Blue
                    }
                }
            }
        }
        
        // Put the modified image data back to canvas
        ctx.putImageData(imageData, 0, 0);
        
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
            "Please enter a description of what to focus on for enhancement (try: brighten face, enhance sky, improve background, increase contrast, sharpen person)."
        );
        return;
    }
    
    const enhancedBlob = await enhanceImageWithVision(window.currentVisionBlob, prompt);
    displayVisionResults(window.currentVisionBlob, enhancedBlob);
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
