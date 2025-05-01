/**
 * Converts a Blob object to a JSON object using FileReader.
 * Useful for processing blob data received from APIs
 * @param {Blob} blob - The Blob object to convert
 * @returns {Promise<Object>} Promise resolving to parsed JSON object
 */
export function blobToJSON(blob) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        
        reader.onload = () => {
            if (reader.result) {
                // Parse the FileReader result into JSON
                resolve(JSON.parse(reader.result));
            } else {
                reject('Failed to parse blob to JSON');
            }
        };
        
        // Initiate blob reading as text
        reader.readAsText(blob);
    });
}

/**
 * Converts a base64 encoded string to an ArrayBuffer.
 * @param {string} base64 - Base64 encoded string
 * @returns {ArrayBuffer} ArrayBuffer containing the decoded data
 */
export function base64ToArrayBuffer(base64) {
    // Decode base64 to binary string
    const binaryString = atob(base64);
    
    // Create buffer to hold binary data
    const bytes = new Uint8Array(binaryString.length);
    
    // Convert binary string to byte array
    for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
    }
    
    return bytes.buffer;
}

/**
 * Converts an ArrayBuffer to a base64 encoded string.
 * @param {ArrayBuffer} buffer - The ArrayBuffer to convert
 * @returns {string} Base64 encoded string representation of the buffer
 */
export function arrayBufferToBase64(buffer) {
    try {
        const bytes = new Uint8Array(buffer);
        let binary = '';
        // Convert each byte to binary string
        for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        return btoa(binary);
    } catch (error) {
        console.error('Failed to convert array buffer to base64: ' + error.message);
    }
}
/**
 * Makes an HTML element draggable by its header.
 * Handles both mouse and touch events.
 * @param {HTMLElement} element - The element to make draggable.
 * @param {HTMLElement} handle - The element that acts as the drag handle (e.g., popup header).
 */
export function makeDraggable(element, handle) {
    let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    let isDragging = false;
    let dragCleanup = null; // To store cleanup function for removal

    const dragMouseDown = (e) => {
        e = e || window.event;
        // Use touch event data if available, otherwise mouse data
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        pos3 = clientX;
        pos4 = clientY;
        isDragging = true;

        document.addEventListener('mouseup', closeDragElement);
        document.addEventListener('mousemove', elementDrag);
        document.addEventListener('touchend', closeDragElement);
        document.addEventListener('touchmove', elementDrag, { passive: false }); // Prevent scrolling on touch move

        handle.style.cursor = 'grabbing'; // Change cursor while dragging
    };

    const elementDrag = (e) => {
        if (!isDragging) return;
        e = e || window.event;

        // Prevent default touch actions like scrolling
        if (e.touches) {
            e.preventDefault();
        }

        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        // Calculate the new cursor position:
        pos1 = pos3 - clientX;
        pos2 = pos4 - clientY;
        pos3 = clientX;
        pos4 = clientY;

        // Set the element's new position:
        let newTop = element.offsetTop - pos2;
        let newLeft = element.offsetLeft - pos1;

        // Boundary checks (optional, keep within viewport)
        const rect = element.getBoundingClientRect();
        const parentRect = element.offsetParent?.getBoundingClientRect() || document.body.getBoundingClientRect(); // Use offsetParent or body

        // Ensure popup stays within the bounds of its parent or the body
        newTop = Math.max(0, Math.min(newTop, parentRect.height - rect.height));
        newLeft = Math.max(0, Math.min(newLeft, parentRect.width - rect.width));


        element.style.top = newTop + "px";
        element.style.left = newLeft + "px";
        element.style.bottom = 'auto'; // Override bottom positioning if set
        element.style.right = 'auto'; // Override right positioning if set
    };

    const closeDragElement = () => {
        // Stop moving when mouse/touch button is released:
        isDragging = false;
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('touchmove', elementDrag);

        handle.style.cursor = 'grab'; // Restore cursor
    };

    // Attach the drag start function to the handle
    handle.addEventListener('mousedown', dragMouseDown);
    handle.addEventListener('touchstart', dragMouseDown, { passive: true }); // Use passive for touchstart if not preventing default

    // Initial cursor style
    handle.style.cursor = 'grab';

    // Define the cleanup function
    dragCleanup = () => {
        handle.removeEventListener('mousedown', dragMouseDown);
        handle.removeEventListener('touchstart', dragMouseDown);
        // Ensure global listeners are removed if dragging was interrupted
        document.removeEventListener('mouseup', closeDragElement);
        document.removeEventListener('mousemove', elementDrag);
        document.removeEventListener('touchend', closeDragElement);
        document.removeEventListener('touchmove', elementDrag);
        handle.style.cursor = 'default'; // Reset cursor on cleanup
        console.log("Draggable listeners removed for:", element.id);
    };

    // Return the cleanup function
    return dragCleanup;
}


/**
 * Makes an HTML element resizable via touch pinch-zoom.
 * Relies on CSS `resize: both;` for mouse resizing.
 * @param {HTMLElement} element - The element to make resizable.
 */
export function makeResizable(element) {
    let initialDist = -1;
    let initialWidth = 0;
    let initialHeight = 0;
    let resizeCleanup = null; // To store cleanup function

    const touchStart = (e) => {
        if (e.touches.length === 2) {
            // Only prevent default if we are actually starting a pinch-zoom on the element
            if (element.contains(e.target)) {
                 e.preventDefault(); // Prevent default page pinch-zoom
            }
            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            initialDist = Math.sqrt(dx * dx + dy * dy);
            initialWidth = element.offsetWidth;
            initialHeight = element.offsetHeight;
            element.style.transition = 'none'; // Disable transitions during resize
        }
    };

    const touchMove = (e) => {
        if (e.touches.length === 2 && initialDist > 0) {
            // Check if the touch is primarily on the element we intend to resize
             if (element.contains(e.targetTouches[0].target) || element.contains(e.targetTouches[1].target)) {
                e.preventDefault(); // Prevent scrolling/page zoom during resize
             } else {
                 return; // Ignore if touch is not on the element
             }

            const dx = e.touches[0].clientX - e.touches[1].clientX;
            const dy = e.touches[0].clientY - e.touches[1].clientY;
            const currentDist = Math.sqrt(dx * dx + dy * dy);
            const scale = currentDist / initialDist;

            let newWidth = initialWidth * scale;
            let newHeight = initialHeight * scale;

            // Apply min/max constraints (using CSS min/max is preferred)
            const minWidth = parseInt(getComputedStyle(element).minWidth, 10) || 100;
            const minHeight = parseInt(getComputedStyle(element).minHeight, 10) || 80;
            const maxWidth = parseInt(getComputedStyle(element).maxWidth, 10) || window.innerWidth;
            const maxHeight = parseInt(getComputedStyle(element).maxHeight, 10) || window.innerHeight;

            newWidth = Math.max(minWidth, Math.min(newWidth, maxWidth));
            newHeight = Math.max(minHeight, Math.min(newHeight, maxHeight));

            element.style.width = newWidth + 'px';
            element.style.height = newHeight + 'px';
        }
    };

    const touchEnd = (e) => {
        if (e.touches.length < 2 && initialDist > 0) { // Check if pinch ended
            initialDist = -1; // Reset initial distance
            element.style.transition = ''; // Re-enable transitions
        }
    };

    // Attach listeners to the element itself for pinch-zoom
    element.addEventListener('touchstart', touchStart, { passive: false }); // Need false to preventDefault
    element.addEventListener('touchmove', touchMove, { passive: false }); // Need false to preventDefault
    element.addEventListener('touchend', touchEnd);
    element.addEventListener('touchcancel', touchEnd); // Also reset on cancel

    // Define cleanup function
    resizeCleanup = () => {
        element.removeEventListener('touchstart', touchStart);
        element.removeEventListener('touchmove', touchMove);
        element.removeEventListener('touchend', touchEnd);
        element.removeEventListener('touchcancel', touchEnd);
        console.log("Resizable listeners removed for:", element.id);
    };

    // Return cleanup function
    return resizeCleanup;
}