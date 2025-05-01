# Context Summary: js/script.js

This file is the main JavaScript entry point for the Gemini Live frontend. It performs the following key functions:

- **Imports:** Loads modules for the GeminiAgent, configuration, tools (Google Search, ToolManager), chat management, and DOM event listeners.
- **Configuration:** Retrieves WebSocket URL, app config, and Deepgram API key.
- **Tool Registration:** Instantiates ToolManager and registers the Google Search tool.
- **Chat Management:** Instantiates ChatManager for handling chat UI and message flow.
- **Agent Initialization:** Creates a GeminiAgent instance, passing in configuration, API keys, and tool manager.
- **Event Handling:** Sets up listeners for agent events (transcription, text sent, interruption, turn completion) to update the chat UI accordingly.
- **Connection:** Connects the agent to the backend and initializes UI event listeners.

This file orchestrates the main application logic, connecting the UI, agent, and tools for real-time chat and transcription.