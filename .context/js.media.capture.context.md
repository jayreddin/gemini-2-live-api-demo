# Camera/Screen Capture System (CameraManager, ScreenManager)

## Purpose and Responsibilities
Manages access to camera and screen capture devices. Handles initialization, preview, capture, and disposal of media streams for both camera and screen.

## Key Functions and Roles
- **CameraManager**: Controls camera stream, switching between cameras, showing/hiding preview, capturing images, and disposing resources.
- **ScreenManager**: Controls screen sharing/capture, showing/hiding preview, capturing screen images, and disposing resources.

## Dependencies and Relationships
- Uses WebRTC APIs: `navigator.mediaDevices.getUserMedia` (camera) and `getDisplayMedia` (screen).
- Integrated with GeminiAgent for orchestration and UI updates.
- May interact with audio subsystems for synchronized media capture.

## Desktop-Specific Implementations
- Assumes multi-camera and screen availability.
- UI controls sized for mouse interaction.
- May expect persistent media streams and larger preview areas.

## Areas Needing Mobile Adaptation
- Handle mobile camera permission prompts and hardware variability.
- Adapt UI for single-camera devices and smaller screens.
- Touch-friendly controls for switching cameras and capturing.
- Mobile browsers may have limited or no screen capture support.

## Potential Challenges
- Inconsistent camera/screen APIs and permissions on mobile.
- Limited support for screen capture in mobile browsers.
- Managing device orientation and camera switching on mobile.
- Ensuring smooth preview and capture performance on resource-constrained devices.