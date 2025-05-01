import { makeDraggable, makeResizable } from '../utils/utils.js';

/**
 * Manages screen sharing capture and image processing
 */
export class ScreenManager {
    /**
     * @param {Object} config
     * @param {number} config.width - Target width for resizing captured images
     * @param {number} config.quality - JPEG quality (0-1)
     * @param {Function} [config.onStop] - Callback when screen sharing stops (DEPRECATED, use setOnClose)
     */
    constructor(config) {
        this.config = {
            width: config.width || 1280, // Default width for screenshots
            quality: config.quality || 0.8,
            // onStop is deprecated, use onCloseCallback
        };

        this.stream = null;
        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;
        this.popupElement = document.getElementById('screenPopup');
        this.videoElement = document.getElementById('screenPopupVideo'); // Video element inside the popup
        this.closeButton = this.popupElement?.querySelector('.popup-close-btn');
        this.onCloseCallback = null; // Callback when popup is closed or sharing stops
        this.dragCleanup = null;
        this.resizeCleanup = null;
    }

    /**
     * Set a callback function to be called when the popup is closed or sharing stops.
     * @param {Function} callback
     */
    setOnClose(callback) {
        this.onCloseCallback = callback;
    }


    /**
     * Show the screen preview popup
     */
    showPreview() {
        if (this.popupElement) {
            this.popupElement.classList.add('show');
        }
    }

    /**
     * Hide the screen preview popup
     */
    hidePreview() {
        if (this.popupElement) {
            this.popupElement.classList.remove('show');
        }
    }

    /**
     * Initialize screen capture stream and canvas
     * @returns {Promise<void>}
     */
    async initialize() {

        if (this.isInitialized || !this.popupElement || !this.videoElement) return;

        try {
            // iOS detection and error for unsupported screen sharing
            if (/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                console.warn("Screen sharing is not supported on iOS devices.");
                throw new Error("Screen sharing is not supported on iOS devices.");
            }
            // Request screen sharing
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always"
                },
                audio: false
            });

            this.videoElement.srcObject = this.stream;
            this.videoElement.playsInline = true;

            if (this.closeButton) {
                this.closeButton.onclick = () => this.dispose();
            }

            await this.videoElement.play();
            this.showPreview();

            // Get video dimensions
            const videoWidth = this.videoElement.videoWidth;
            const videoHeight = this.videoElement.videoHeight;
            this.aspectRatio = videoHeight / videoWidth;

            const canvasWidth = this.config.width;
            const canvasHeight = Math.round(this.config.width * this.aspectRatio);
            this.canvas = document.createElement('canvas');
            this.canvas.width = canvasWidth;
            this.canvas.height = canvasHeight;
            this.ctx = this.canvas.getContext('2d');

            // Listen for end of screen sharing
            const videoTrack = this.stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.onended = () => {
                    console.log("Screen sharing track ended.");
                    this.dispose();
                };
            } else {
                console.warn("No video track found.");
                this.dispose();
                throw new Error("Invalid screen capture stream.");
            }

            // Make popup draggable and resizable
            const header = this.popupElement.querySelector('.popup-header');
            if (header) {
                this.dragCleanup = makeDraggable(this.popupElement, header);
                this.resizeCleanup = makeResizable(this.popupElement);
            }

            this.isInitialized = true;
            console.log("ScreenManager initialized successfully.");

        } catch (error) {
            console.error("Screen capture init failed:", error);
            this.dispose();
            throw new Error(`Screen capture failed: ${error.message}`);
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
    }    /**
     * Stop screen capture, cleanup resources, and hide the popup.
     */
    dispose() {
        console.log("Disposing ScreenManager...");
        if (!this.isInitialized && !this.stream) return;

        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.onended = null;
                track.stop();
            });
            this.stream = null;
        }

        if (this.videoElement) {
            this.videoElement.srcObject = null;
            this.videoElement.pause();
            this.videoElement.removeAttribute('src');
        }

        if (this.closeButton) {
            this.closeButton.onclick = null;
        }

        // Clean up draggable/resizable
        if (this.dragCleanup) {
            this.dragCleanup();
            this.dragCleanup = null;
        }
        if (this.resizeCleanup) {
            this.resizeCleanup();
            this.resizeCleanup = null;
        }

        this.hidePreview();

        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;

        if (this.onCloseCallback) {
            try {
                this.onCloseCallback();
            } catch (error) {
                console.error("Error in onCloseCallback:", error);
            }
        }
        console.log("ScreenManager disposed.");
    }
}
