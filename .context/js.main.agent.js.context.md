# Context Summary: js/main/agent.js

This file defines the `GeminiAgent` class, the core orchestrator for the Gemini 2 Live API frontend. Key responsibilities include:

- **Component Integration:** Manages audio recording/streaming, camera, screen sharing, and visualization by integrating with specialized modules.
- **WebSocket Communication:** Handles connection to the backend via `GeminiWebsocketClient`, sending/receiving messages, audio, and images.
- **Transcription:** Integrates Deepgram for real-time speech-to-text for both model and user audio, with keep-alive and event handling.
- **Tool Management:** Connects to a `ToolManager` for dynamic tool invocation and function call handling.
- **Event System:** Implements a custom event emitter for UI and logic integration (e.g., transcription, interruptions, turn completion).
- **Resource Management:** Provides methods for starting/stopping camera, screen, audio, and for graceful disconnect/cleanup.
- **Initialization:** Handles setup of all components, including audio context, visualizer, and transcribers, based on configuration and API keys.

This class is central to the application's runtime, coordinating all real-time media, communication, and extensibility features.