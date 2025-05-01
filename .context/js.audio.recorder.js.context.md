# Context Summary: js/audio/recorder.js

This file defines the `AudioRecorder` class, responsible for capturing and processing microphone audio input. Key features include:

- **Audio Capture:** Uses the Web Audio API and AudioWorklet to capture audio from the user's microphone with echo cancellation, noise suppression, and auto gain control.
- **Real-Time Processing:** Processes audio in real-time, converting it to base64-encoded Int16 format suitable for transmission.
- **Recording Control:** Provides methods to start, stop, suspend, resume, and toggle microphone input, supporting both active and suspended states.
- **Resource Management:** Handles cleanup of audio context and media streams to prevent resource leaks.
- **Event Handling:** Emits processed audio chunks to a callback for further handling (e.g., sending to backend).

This class enables robust, low-latency audio input for real-time communication and transcription features.