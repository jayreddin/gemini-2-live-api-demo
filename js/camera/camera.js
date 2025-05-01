/**
 * Manages camera access, capture, and image processing
 */
export class CameraManager {
    /**
     * @param {Object} config
     * @param {number} config.width - Target width for resizing captured images
     * @param {number} config.quality - JPEG quality (0-1)
     * @param {string} [config.facingMode] - Camera facing mode (optional, mobile-only)
     */
    constructor(config) {
        this.config = {
            width: config.width || 640,
            quality: config.quality || 0.8,
            facingMode: config.facingMode // undefined by default for desktop compatibility
        };
        
        this.stream = null;
        this.videoElement = null; // Will be the video element inside the popup
        this.canvas = null;
        this.ctx = null;
        this.isInitialized = false;
        this.aspectRatio = null;
        this.popupElement = document.getElementById('cameraPopup');
        this.videoElement = document.getElementById('cameraPopupVideo');
        this.switchButton = document.getElementById('switchCameraBtn');
        this.closeButton = this.popupElement?.querySelector('.popup-close-btn');
        this.onCloseCallback = null; // Callback when popup is closed
    }

    /**
     * Set a callback function to be called when the popup is closed.
     * @param {Function} callback
     */
    setOnClose(callback) {
        this.onCloseCallback = callback;
    }

    /**
     * Show the camera popup
     */
    showPreview() {
        if (this.popupElement) {
            this.popupElement.classList.add('show');
            // Add draggable/resizable logic initialization here if needed
        }
    }

    /**
     * Hide the camera popup
     */
    hidePreview() {
        if (this.popupElement) {
            this.popupElement.classList.remove('show');
             // Add draggable/resizable logic cleanup here if needed
        }
    }

     /**
      * Check for multiple cameras and show/hide the switch button.
      * @private
      */
     async _updateSwitchButtonVisibility() {
         if (!this.switchButton) return;

         try {
             const devices = await navigator.mediaDevices.enumerateDevices();
             const videoInputDevices = devices.filter(device => device.kind === 'videoinput');
             if (videoInputDevices.length > 1) {
                 this.switchButton.style.display = 'flex'; // Use flex as it's an icon-btn
             } else {
                 this.switchButton.style.display = 'none';
             }
         } catch (error) {
             console.error("Error enumerating devices:", error);
             this.switchButton.style.display = 'none'; // Hide on error
         }
     }


    /**
     * Switch between front and back cameras
     */
    async switchCamera() {
        if (!this.isInitialized) return;
        
        // Toggle facingMode preference
        const newFacingMode = this.config.facingMode === 'user' ? 'environment' : 'user';
        console.log(`Attempting to switch camera to: ${newFacingMode}`);
        // Don't save to localStorage here, save only if successful

        // Stop current stream
        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
        }

        // Reinitialize with new facingMode
        try {
            const constraints = {
                video: {
                    width: { ideal: 1920 },
                    height: { ideal: 1080 },
                    facingMode: { exact: newFacingMode } // Use exact to force the switch
                }
            };

            this.stream = await navigator.mediaDevices.getUserMedia(constraints);
            this.videoElement.srcObject = this.stream;
            await this.videoElement.play();

            // If successful, update and save the new facing mode
            this.config.facingMode = newFacingMode;
            localStorage.setItem('facingMode', this.config.facingMode);
            console.log(`Successfully switched camera to: ${this.config.facingMode}`);

        } catch (error) {
            console.error(`Failed to switch camera to ${newFacingMode}:`, error);
            // Attempt to fall back to the *other* mode if exact fails
            const fallbackFacingMode = newFacingMode === 'user' ? 'environment' : 'user';
            console.log(`Falling back to: ${fallbackFacingMode}`);
            try {
                 constraints.video.facingMode = { exact: fallbackFacingMode };
                 this.stream = await navigator.mediaDevices.getUserMedia(constraints);
                 this.videoElement.srcObject = this.stream;
                 await this.videoElement.play();
                 this.config.facingMode = fallbackFacingMode;
                 localStorage.setItem('facingMode', this.config.facingMode);
                 console.log(`Successfully switched camera using fallback: ${this.config.facingMode}`);
            } catch (fallbackError) {
                 console.error(`Fallback camera switch also failed:`, fallbackError);
                 // Keep the old stream running if possible, or handle error state
                 // Re-fetch the stream with the original facing mode if necessary
                 await this.initializeStream(this.config.facingMode); // Re-initialize with original mode
            }
        }
    }

    /**
     * Initialize camera stream and canvas
     * @returns {Promise<void>}
     */
    /**
     * Initializes the camera stream with a specific facing mode.
     * @param {string} facingMode - 'user' or 'environment'
     * @private
     */
    async initializeStream(facingMode) {
         // Stop existing stream if any
         if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
         }

         const constraints = {
             video: {
                 width: { ideal: 1920 },
                 height: { ideal: 1080 }
             }
         };
         if (facingMode) {
             constraints.video.facingMode = facingMode;
         }

         this.stream = await navigator.mediaDevices.getUserMedia(constraints);
         this.videoElement.srcObject = this.stream;
         await this.videoElement.play();
    }


    /**
     * Initialize camera stream, popup, and canvas
     * @returns {Promise<void>}
     */
    async initialize() {
        if (this.isInitialized || !this.popupElement || !this.videoElement) return;

        try {
            // Determine initial facing mode
            let initialFacingMode = null;
            if (/Mobi|Android/i.test(navigator.userAgent)) {
                 initialFacingMode = localStorage.getItem('facingMode') || 'user'; // Load preference or default to front
                 this.config.facingMode = initialFacingMode;
            }

            // Request camera access and start stream
            await this.initializeStream(initialFacingMode);

            // Setup popup elements and listeners
            if (this.switchButton) {
                this.switchButton.onclick = () => this.switchCamera(); // Use onclick for simplicity or manage listeners
                await this._updateSwitchButtonVisibility(); // Check if switch button should be visible
            }
            if (this.closeButton) {
                 this.closeButton.onclick = () => this.dispose(); // Close button triggers dispose
            }

            // Add listener for click-outside dismissal (implementation might be external)
            // this._setupClickOutsideListener();

            // Add draggable/resizable listeners (implementation might be external)
            // this._setupDraggableResizable();

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

            this.isInitialized = true;
        } catch (error) {
            throw new Error(`Failed to initialize camera: ${error.message}`);
        }
    }

    /**
     * Get current canvas dimensions
     * @returns {{width: number, height: number}}
     */
    getDimensions() {
        if (!this.isInitialized) {
            throw new Error('Camera not initialized. Call initialize() first.');
        }
        return {
            width: this.canvas.width,
            height: this.canvas.height
        };
    }

    /**
     * Capture and process an image from the camera
     * @returns {Promise<string>} Base64 encoded JPEG image
     */
    async capture() {
        if (!this.isInitialized) {
            throw new Error('Camera not initialized. Call initialize() first.');
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
     * Stop camera stream and cleanup resources
     */
    /**
     * Stop camera stream and cleanup resources, hiding the popup.
     */
    dispose() {
        console.log("Disposing CameraManager...");
        if (!this.isInitialized && !this.stream) return; // Avoid disposing multiple times or if not initialized

        if (this.stream) {
            this.stream.getTracks().forEach(track => track.stop());
            this.stream = null;
            console.log("Camera stream stopped.");
        }

        if (this.videoElement) {
            this.videoElement.srcObject = null;
            this.videoElement.pause(); // Explicitly pause
            this.videoElement.removeAttribute('src'); // Remove src attribute
            // Note: We don't remove the videoElement itself as it's part of the static HTML popup
        }

        // Remove listeners if they were added directly
        if (this.switchButton) {
            this.switchButton.onclick = null;
            this.switchButton.style.display = 'none'; // Hide it
        }
        if (this.closeButton) {
            this.closeButton.onclick = null;
        }

        // Clean up draggable/resizable listeners if added
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
                this.onCloseCallback();
            } catch (error) {
                console.error("Error in onCloseCallback:", error);
            }
        }
        console.log("CameraManager disposed.");
    }
}
