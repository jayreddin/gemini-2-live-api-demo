# Context Summary: js/camera/camera.js

This file defines the `CameraManager` class, responsible for managing camera access and image capture. Key features include:

- **Initialization:** Requests camera access, sets up video and canvas elements, and manages preview display.
- **Image Capture:** Captures frames from the video stream, resizes, and encodes them as base64 JPEG images for transmission.
- **Camera Switching:** Supports toggling between front and back cameras on mobile devices, with persistent facing mode.
- **Preview Management:** Shows/hides camera preview and manages UI elements, including a camera switch button.
- **Resource Cleanup:** Stops streams, removes UI elements, and resets state on disposal.
- **Error Handling:** Handles permission errors and fallback logic for camera switching.

This class enables seamless camera integration for real-time image capture and preview in the Gemini Live application.