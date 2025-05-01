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
            // Add draggable/resizable logic initialization here if needed
        }
    }
    
    /**
     * Hide the screen preview popup
     */
    hidePreview() {
        if (this.popupElement) {
            this.popupElement.classList.remove('show');
             // Add draggable/resizable logic cleanup here if needed
        }
    }
    
    /**
     * Initialize screen capture stream and canvas
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this.isInitialized || !this.popupElement || !this.videoElement) return;

        // IMPORTANT NOTE: Screen sharing via getDisplayMedia() is NOT supported
        // in Safari on iOS (iPhone/iPad). This will likely throw an error or
        // behave unexpectedly on those devices. Consider feature detection or
        // alternative approaches if iOS screen sharing is critical.
        console.log("Attempting to initialize screen capture...");

        try {
            // Request screen sharing
            this.stream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    cursor: "always",
                    // Consider adding displaySurface constraints if needed (e.g., 'monitor', 'window', 'browser')
                    // width: { ideal: 1920 }, // Optional: suggest resolution
                    // height: { ideal: 1080 }
                },
                audio: false // Audio capture from screen sharing is often restricted/complex
            });
            console.log("Screen capture stream obtained.");

            // Setup video element in the popup
            this.videoElement.srcObject = this.stream;
            this.videoElement.playsInline = true; // Important for mobile

            // Setup popup close button listener
            if (this.closeButton) {
                this.closeButton.onclick = () => this.dispose(); // Close button triggers dispose
            }

            // Add listener for click-outside dismissal (implementation might be external)
            // this._setupClickOutsideListener();

            // Add draggable/resizable listeners (implementation might be external)
            // this._setupDraggableResizable();


            await this.videoElement.play();
            console.log("Screen preview video playing.");

            this.showPreview(); // Show the popup

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


            // Listen for the end of screen sharing (e.g., user clicks "Stop sharing" in browser UI)
            const videoTrack = this.stream.getVideoTracks()[0];
            if (videoTrack) {
                videoTrack.onended = () => { // Use onended for simplicity
                    console.log("Screen sharing track ended.");
                    this.dispose(); // Dispose automatically when sharing stops externally
                    // The dispose method will call the onCloseCallback
                };
            } else {
                 console.warn("No video track found in screen capture stream.");
                 // Handle potential issue if stream is invalid
                 this.dispose();
                 throw new Error("Screen capture stream is invalid.");
            }


            this.isInitialized = true;
            console.log("ScreenManager initialized successfully.");

        } catch (error) {
            console.error(`Failed to initialize screen capture: ${error.message}`, error);
            // If initialization fails, clean up partially acquired resources
            this.dispose(); // Ensure cleanup even on init failure
            // Re-throw the error so the caller knows it failed
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
    /**
     * Stop screen capture, cleanup resources, and hide the popup.
     */
    dispose() {
        console.log("Disposing ScreenManager...");
        // Check if already disposed or never initialized properly
        if (!this.isInitialized && !this.stream) {
             console.log("ScreenManager already disposed or not initialized.");
             return;
        }

        if (this.stream) {
            this.stream.getTracks().forEach(track => {
                track.onended = null; // Remove listener first
                track.stop();
            });
            this.stream = null;
            console.log("Screen stream stopped.");
        }

        if (this.videoElement) {
            this.videoElement.srcObject = null;
            this.videoElement.pause();
            this.videoElement.removeAttribute('src');
            // Don't remove the element itself
        }

        // Remove listeners
        if (this.closeButton) {
            this.closeButton.onclick = null;
        }
        // this._cleanupDraggableResizable();
        // this._cleanupClickOutsideListener();


        this.hidePreview(); // Hide the popup

        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;

        // Trigger the close callback if it exists
        if (this.onCloseCallback) {
            try {
                console.log("Calling onCloseCallback for ScreenManager.");
                this.onCloseCallback();
            } catch (error) {
                console.error("Error in ScreenManager onCloseCallback:", error);
            }
        } else {
             console.log("No onCloseCallback set for ScreenManager.");
        }
        console.log("ScreenManager disposed.");
    }
}
