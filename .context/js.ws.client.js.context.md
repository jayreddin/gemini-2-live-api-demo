# Context Summary: js/ws/client.js

This file defines the `GeminiWebsocketClient` class, which manages WebSocket communication with the Gemini 2.0 Flash Multimodal Live API. Key features include:

- **Connection Management:** Establishes and tears down WebSocket connections, sending initial setup/configuration messages.
- **Event Emission:** Extends EventEmitter to emit events for tool calls, interruptions, turn completions, audio, and content delivery.
- **Message Handling:** Processes incoming binary (Blob) messages, distinguishing between tool calls, cancellations, and server content (audio, text, interruptions).
- **Media Support:** Provides methods to send audio (base64 PCM), images (base64 JPEG), and text messages to the backend.
- **Tool Integration:** Handles sending tool call responses back to the server, supporting both successful outputs and error reporting.
- **Utility Methods:** Includes helpers for sending JSON data and converting blobs to usable formats.

This class is the primary interface for all real-time backend communication, supporting multimodal interaction and extensibility.