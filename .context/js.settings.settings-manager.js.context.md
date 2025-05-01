# Context Summary: js/settings/settings-manager.js

This file defines the `SettingsManager` class, responsible for managing the application's settings UI and persistence. Key features include:

- **UI Dialog:** Dynamically creates a settings dialog and overlay, with collapsible sections for advanced and safety settings.
- **LocalStorage Integration:** Loads and saves configuration values (API keys, voice, sample rate, system instructions, safety thresholds, etc.) to localStorage.
- **Event Handling:** Sets up listeners for saving, toggling sections, and updating display values in real-time.
- **State Management:** Keeps UI elements in sync with stored values and updates the display as users interact.
- **Reset/Reload:** Reloads the application after saving settings to apply changes.
- **Singleton Export:** Exports a singleton instance for use throughout the application.

This class provides a user-friendly interface for configuring and persisting all runtime settings in Gemini Live.