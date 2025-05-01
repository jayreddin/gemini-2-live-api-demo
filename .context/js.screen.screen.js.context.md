# Context Summary: js/screen/screen.js

This file defines the `ScreenManager` class, responsible for managing screen sharing and screenshot capture. Key features include:

- **Initialization:** Requests screen sharing access, sets up video and canvas elements, and manages preview display.
- **Screenshot Capture:** Captures frames from the shared screen, resizes, and encodes them as base64 JPEG images for transmission.
- **Preview Management:** Shows/hides screen preview and manages UI elements.
- **Resource Cleanup:** Stops streams, removes UI elements, and resets state on disposal.
- **Event Handling:** Supports a callback for when screen sharing stops, enabling integration with other components.
- **Error Handling:** Handles permission errors and fallback logic for screen sharing.

This class enables seamless screen sharing and screenshot capture for real-time collaboration in the Gemini Live application.