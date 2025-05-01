# Puter.com API Docs Summary

**Overview:**  
Puter.js provides serverless cloud, AI, storage, authentication, and utility APIs for browser-based JavaScript. All APIs are accessed via the `puter` namespace.

## Key API Categories

- **AI:** `puter.ai.chat()`, `puter.ai.txt2img()`, `puter.ai.img2txt()`, `puter.ai.txt2speech()`
- **Cloud Storage:** `puter.fs.write()`, `puter.fs.read()`, `puter.fs.mkdir()`, etc.
- **Key-Value Store:** `puter.kv.set()`, `puter.kv.get()`, etc.
- **Hosting:** `puter.hosting.create()`, `puter.hosting.list()`, etc.
- **Auth:** `puter.auth.signIn()`, `puter.auth.signOut()`, etc.
- **Permissions:** Grant/revoke user, group, app, and origin permissions.
- **Threads, Apps, UI, Drivers, Utilities, Objects:** Additional APIs for app management, UI, integrations, and system objects.

## AI API Details

- **chat(prompt, options):**  
  - Text and vision chat/completion with support for multiple models (OpenAI, Google Gemini, Claude, etc.), streaming, and function calling.
  - Supports both simple prompts and structured message arrays for chatbot context.
- **txt2img(prompt):**  
  - Generates images from text prompts using AI models (e.g., DALL·E 3).
- **img2txt, txt2speech:**  
  - Image captioning and text-to-speech.

## Usage Example

```javascript
// Chat with AI
puter.ai.chat("What is life?").then(console.log);

// Generate an image
puter.ai.txt2img("A picture of a cat.").then(img => document.body.appendChild(img));
```

**Note:**  
- All APIs are promise-based and run in the browser.
- For full details, see the complete docs file.