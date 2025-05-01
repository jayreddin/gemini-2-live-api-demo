# Core Application Logic (GeminiAgent, script.js)

## Purpose and Responsibilities
Acts as the orchestrator for the application, managing media (camera, screen), audio, chat, tool calls, and settings. Handles initialization, event listeners, and communication between UI and backend services.

## Key Functions and Roles
- **GeminiAgent class**: Central controller for all subsystems.
  - Manages CameraManager and ScreenManager instances.
  - Handles event listeners for user actions and system events.
  - Connects to backend services and manages tool calls.
  - Controls audio recording, speech transcription, and chat flow.
- **script.js**: Entry point, instantiates GeminiAgent and binds it to the UI.

## Dependencies and Relationships
- Imports and manages instances of CameraManager, ScreenManager, AudioRecorder, AudioStreamer, ChatManager, ToolManager, and SettingsManager.
- Relies on DOM elements for UI updates and event triggers.

## Desktop-Specific Implementations
- Assumes persistent screen/camera availability.
- Uses mouse-based event listeners (click, hover).
- May expect larger screen real estate for simultaneous panels.

## Areas Needing Mobile Adaptation
- Replace mouse events with touch events (tap, swipe).
- Adapt event listeners for mobile gestures.
- Manage permissions and device availability for mobile hardware.
- Optimize for limited screen space and multitasking constraints.

## Potential Challenges
- Handling mobile permission prompts and hardware variability.
- Ensuring smooth transitions between media modes (camera, screen, audio) on mobile.
- Maintaining performance and responsiveness on lower-powered devices.