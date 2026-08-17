// Import HuggingFace Transformers.js Engine inside the background Worker thread
import { AutoProcessor, AutoModel } from 'https://jsdelivr.net';

let processor = null;
let model = null;

// Listen for processing messages from the main HTML webpage interface
self.addEventListener('message', async (e) => {
    const { action, imageData, clickPoints } = e.data;

    // 1. Core Model Setup Execution Lifecycle
    if (action === 'load') {
        try {
            // Check for WebGPU; if unavailable or disabled, fall back to pure WASM CPU
            const deviceEngine = navigator.gpu ? 'webgpu' : 'wasm';
            self.postMessage({ status: `⏳ Downloading SAM 2 Weights via [${deviceEngine.toUpperCase()}]...` });

            processor = await AutoProcessor.from_pretrained('Xenova/sam2-hiera-tiny');
            model = await AutoModel.from_pretrained('Xenova/sam2-hiera-tiny', {
                device: deviceEngine,
                dataType: 'fp32' // Prevent shader errors across older integrated chips
            });

            self.postMessage({ status: 'ready' });
        } catch (err) {
            // If WebGPU crashes, try loading immediately with standard WASM mode
            try {
                self.postMessage({ status: '⚙️ WebGPU failed. Forcing WebAssembly CPU engine...' });
                processor = await AutoProcessor.from_pretrained('Xenova/sam2-hiera-tiny');
                model = await AutoModel.from_pretrained('Xenova/sam2-hiera-tiny', {
                    device: 'wasm',
                    dataType: 'fp32'
                });
                self.postMessage({ status: 'ready' });
            } catch (wasmErr) {
                self.postMessage({ status: 'error', error: wasmErr.message });
            }
        }
    }

    // 2. Compute Segment Mask Vector Core Array Changes
    if (action === 'segment') {
        if (!model || !processor) {
            self.postMessage({ status: 'error', error: 'AI engine was not ready.' });
            return;
        }

        try {
            // Unpack raw canvas pixels from the main image UI frame
            const inputs = await processor(imageData);
            const inputPoints = clickPoints.map(p => p.point);
            const inputLabels = clickPoints.map(p => p.label);

            const outputs = await model({
                ...inputs,
                input_points: [inputPoints],
                input_labels: [inputLabels]
            });

            // Post computed raw prediction mask array back to index.html for canvas rendering
            self.postMessage({ 
                status: 'complete', 
                maskData: outputs.pred_masks.data 
            });
        } catch (err) {
            self.postMessage({ status: 'error', error: err.message });
        }
    }
});
