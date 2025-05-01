# Context Summary: js/chat/chat-manager.js

This file defines the `ChatManager` class, responsible for managing the chat UI and message flow. Key features include:

- **Message Handling:** Adds user text and audio messages, as well as model messages, to the chat history.
- **Streaming Updates:** Supports streaming model messages, updating the UI in real-time as new text arrives.
- **State Management:** Tracks the type of the last user message, current streaming message, and accumulated transcript.
- **UI Integration:** Scrolls chat to the bottom on new messages and manages the chat container element.
- **Reset/Clear:** Provides methods to clear the chat history and reset internal state.

This class enables a responsive, real-time chat experience for users interacting with the Gemini Live application.