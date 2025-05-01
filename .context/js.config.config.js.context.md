# Context Summary: js/config/config.js

This file provides configuration utilities for the Gemini Live application. Key features include:

- **WebSocket URL:** Dynamically constructs the backend WebSocket URL using an API key from localStorage.
- **Deepgram API Key:** Retrieves the Deepgram API key for speech transcription from localStorage.
- **Audio Configuration:** Sets the model's audio sample rate, also configurable via localStorage.
- **Model & Generation Settings:** Defines model name, temperature, top-p, top-k, response modalities, and voice configuration, all customizable via localStorage.
- **System Instructions:** Loads system prompt text for the assistant from localStorage.
- **Tool Declarations:** Prepares a placeholder for tool function declarations to be injected at runtime.
- **Safety Settings:** Configures harm category thresholds (harassment, dangerous content, explicit, hate speech, civic integrity) using localStorage and predefined mappings.

This module centralizes all runtime configuration, enabling dynamic, user-driven customization of the application's behavior and safety.