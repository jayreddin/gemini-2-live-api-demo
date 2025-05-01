/**
 * Manages screen sharing capture and image processing
 */
export class ScreenManager {
    /**
     * @param {Object} config
     * @param {number} config.width - Target width for resizing captured images
     * @param {number} config.quality - JPEG quality (0-1)
     * @param {Function} [config.onStop] - Callback when screen sharing stops
     */
    constructor(config) {
        this.config = {
            width: config.width || 1280,
            quality: config.quality || 0.8,
            onStop: config.onStop
        };
        
        this.stream = null;
        this.videoElement = null;
        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;
        this.previewContainer = null;
    }

    /**
     * Show the screen preview
     */
    showPreview() {
        if (this.previewContainer) {
            this.previewContainer.style.display = 'block';
        }
    }

    /**
     * Hide the screen preview
     */
    hidePreview() {
        if (this.previewContainer) {
            this.previewContainer.style.display = 'none';
        }
    }

    /**
     * Initialize screen capture stream and canvas
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this.isInitialized) return;

        try {
            // Request screen sharing
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: false
            });

            // Create and setup video element
            this.videoElement = document.createElement('video');
            this.videoElement.srcObject = this.stream;
            this.videoElement.playsInline = true;

            // Create or find preview container
            let previewContainer = document.getElementById('screen-preview');
            if (!previewContainer) {
                previewContainer = document.createElement('div');
                previewContainer.id = 'screen-preview';
                previewContainer.className = 'screen-preview';
                document.body.appendChild(previewContainer);
            }
            previewContainer.innerHTML = ''; // Clear previous content if any

            // Add drag handle
            const dragHandle = document.createElement('div');
            dragHandle.className = 'preview-drag-handle';
            dragHandle.style.cssText = 'cursor: grab; padding: 5px; background: rgba(0,0,0,0.5); color: white; text-align: center;';
            dragHandle.textContent = '⋮⋮'; // Drag handle icon
            previewContainer.appendChild(dragHandle);

            // Add video element
            previewContainer.appendChild(this.videoElement);
            this.previewContainer = previewContainer;
            this.showPreview(); // Show preview when initialized

            // Initialize drag functionality
            this._initializeDrag(dragHandle);

            await this.videoElement.play();

            // Get the actual video dimensions
            const videoWidth = this.videoElement.videoWidth;
            const videoHeight = this.videoElement.videoHeight;
            this.aspectRatio = videoHeight / videoWidth;

            // Calculate canvas size maintaining aspect ratio
            const canvasWidth = this.config.width;
            const canvasHeight = Math.round(this.config.width * this.aspectRatio);

            // Create canvas for image processing
            this.canvas = document.createElement('canvas');
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.ctx = this.canvas.getContext('2d');

            // Listen for the end of screen sharing
            this.stream.getVideoTracks()[0].addEventListener('ended', () => {
                this.dispose();
                // Notify parent component that sharing has stopped
                if (this.config.onStop) {
                    this.config.onStop();
                }
            });

            this.isInitialized = true;
        } catch (error) {
            throw new Error(`Failed to initialize screen capture: ${error.message}`);
        }
    }

    /**
     * Get current canvas dimensions
     * @returns {{width: number, height: number}}
     */
    getDimensions() {
        if (!this.isInitialized) {
            throw new Error('Screen capture not initialized. Call initialize() first.');
        }
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Capture and process a screenshot
     * @returns {Promise<string>} Base64 encoded JPEG image
     */
    async capture() {
        if (!this.isInitialized) {
            throw new Error('Screen capture not initialized. Call initialize() first.');
        }

        // Draw current video frame to canvas, maintaining aspect ratio
        this.ctx.drawImage(
            this.videoElement,
            0, 0,
            this.canvas.width,
            this.canvas.height
        );

        // Convert to base64 JPEG with specified quality
        return this.canvas.toDataURL('image/jpeg', this.config.quality).split(',')[1];
    }

    /**
     * Stop screen capture and cleanup resources
     */
    dispose() {
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
        }
        
        if (this.videoElement) {
            this.videoElement.srcObject = null;
            this.videoElement = null;
        }

        if (this.previewContainer) {
            this.hidePreview();
            this.previewContainer.innerHTML = ''; // Clear the preview container
            this.previewContainer = null;
        }

        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;
    }

    /**
     * Initialize drag functionality for the preview container
     * @param {HTMLElement} handle - The element to use as drag handle
     * @private
     */
    _initializeDrag(handle) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        const dragStart = (e) => {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === handle) {
                isDragging = true;
                handle.style.cursor = 'grabbing';
            }
        };

        const dragEnd = () => {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            handle.style.cursor = 'grab';
        };

        const drag = (e) => {
            if (isDragging) {
                e.preventDefault();

                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;

                this.previewContainer.style.transform =
                    `translate3d(${currentX}px, ${currentY}px, 0)`;
            }
        };

        // Touch events
        handle.addEventListener("touchstart", dragStart, { passive: false });
        document.addEventListener("touchend", dragEnd);
        document.addEventListener("touchmove", drag, { passive: false });

        // Mouse events
        handle.addEventListener("mousedown", dragStart);
        document.addEventListener("mouseup", dragEnd);
        document.addEventListener("mousemove", drag);
    }
}
