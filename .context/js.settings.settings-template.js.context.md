# Context Summary: js/settings/settings-template.js

This file exports `settingsTemplate`, a string containing the HTML structure for the application's settings dialog. Key features include:

- **API Keys:** Inputs for Gemini and Deepgram API keys.
- **Voice Selection:** Dropdown for selecting the voice used in speech synthesis.
- **Audio Settings:** Controls for sample rate.
- **System Instructions:** Collapsible section for customizing the assistant's system prompt.
- **Screen & Camera:** Controls for FPS, resize width, and image quality.
- **Advanced Settings:** Collapsible section for temperature, top-p, and top-k parameters.
- **Safety Settings:** Collapsible section for configuring harm category thresholds (harassment, dangerous content, explicit, civic integrity).
- **Save Button:** Button to persist all settings.

This template provides the full UI for runtime configuration, supporting all features exposed by the SettingsManager.