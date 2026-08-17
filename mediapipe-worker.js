// Import official MediaPipe Vision Task bundles inside the Worker
importScripts("https://jsdelivr.net");

let interactiveSegmenter = null;

// Listen for processing tasks sent from the main window thread
self.onmessage = async function (e) {
    const { action, imageData, clickPoints } = e.data;

    // 1. Initialize Google AI Edge Engine
    if (action === "load") {
        try {
            const { FilesetResolver, InteractiveSegmenter } = self.mediapipe.tasksVision;
            
            const visionWasmFiles = await FilesetResolver.forVisionTasks(
                "https://jsdelivr.net"
            );

            interactiveSegmenter = await InteractiveSegmenter.createFromOptions(visionWasmFiles, {
                baseOptions: {
                    modelAssetPath: "https://googleapis.com",
                    delegate: "GPU" // Uses WebGL/WebGPU graphics acceleration natively
                },
                outputCategoryMask: true,
                outputConfidenceMask: false
            });

            self.postMessage({ status: "ready" });
        } catch (err) {
            self.postMessage({ status: "error", error: `Engine Load Error: ${err.message}` });
        }
    }

    // 2. Aggregate Mask Layers
    if (action === "segment") {
        if (!interactiveSegmenter) {
            self.postMessage({ status: "error", error: "Segmenter model is unmounted." });
            return;
        }

        try {
            const trueWidth = imageData.width;
            const trueHeight = imageData.height;

            // Prepare a master output black matrix mask array
            const masterCompositeMask = new Uint8Array(trueWidth * trueHeight).fill(0);

            // Sequentially loop over coordinate clicks to compile masks
            for (let pt of clickPoints) {
                const userTargetPrompt = { keypoint: { x: pt.x, y: pt.y } };

                // Execute synchronous MediaPipe segment pass inside our safe thread
                interactiveSegmenter.segment(imageData, userTargetPrompt, (inferenceOutput) => {
                    const localMaskArray = inferenceOutput.categoryMask.getAsUint8Array();

                    // Logical OR Layer Blend: preserve pixels marked by any point
                    for (let index = 0; index < localMaskArray.length; index++) {
                        if (localMaskArray[index] > 0) {
                            masterCompositeMask[index] = 255;
                        }
                    }
                });
            }

            // Post back the binary mask matrix to the main window thread
            self.postMessage({
                status: "complete",
                maskData: masterCompositeMask
            });

        } catch (err) {
            self.postMessage({ status: "error", error: `Segmentation failed: ${err.message}` });
        }
    }
};
