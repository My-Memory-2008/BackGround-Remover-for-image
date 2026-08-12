const fileInput = document.getElementById('file-input');
const dropZone = document.getElementById('drop-zone');
const uploadPrompt = document.getElementById('upload-prompt');
const loadingStatus = document.getElementById('loading-status');
const previewContainer = document.getElementById('preview-container');
const originalPreview = document.getElementById('original-preview');
const resultPreview = document.getElementById('result-preview');
const downloadBtn = document.getElementById('download-btn');

let processedBlobUrl = null;

// Handle user file selections
fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) processImage(e.target.files[0]);
});

async function processImage(file) {
    // Show original image snapshot natively
    originalPreview.src = URL.createObjectURL(file);
    
    // UI state adjustments during execution
    uploadPrompt.classList.add('hidden');
    loadingStatus.classList.remove('hidden');
    previewContainer.classList.add('hidden');
    downloadBtn.classList.add('hidden');

    try {
        // Run AI removal tool right inside browser storage context
        // Initial setup loads ~20MB of WASM assets directly from cloud caches
        const resultBlob = await imglyBackgroundRemoval.removeBackground(file);
        
        // Render processed outputs safely
        processedBlobUrl = URL.createObjectURL(resultBlob);
        resultPreview.src = processedBlobUrl;
        
        // Open visibility of display screens
        previewContainer.classList.remove('hidden');
        downloadBtn.classList.remove('hidden');
    } catch (error) {
        console.error("AI execution failed:", error);
        alert("Failed to process the image background natively.");
    } finally {
        loadingStatus.classList.add('hidden');
        uploadPrompt.classList.remove('hidden');
    }
}

// Download execution logic
downloadBtn.addEventListener('click', () => {
    if (!processedBlobUrl) return;
    const link = document.createElement('a');
    link.href = processedBlobUrl;
    link.download = `no-bg-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
