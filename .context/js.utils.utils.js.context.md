# Context Summary: js/utils/utils.js

This file provides utility functions for data conversion and encoding. Key features include:

- **blobToJSON:** Converts a Blob object to a JSON object using FileReader, useful for processing API responses.
- **base64ToArrayBuffer:** Decodes a base64 string into an ArrayBuffer, supporting binary data handling.
- **arrayBufferToBase64:** Encodes an ArrayBuffer as a base64 string, enabling binary-to-text conversion for transmission.

These utilities are essential for handling audio, image, and message data throughout the Gemini Live application.