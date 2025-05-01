# Puter.com API Documentation (Partial Fetch)

## Main Page Overview

- Serverless Auth, Cloud, and AI powered by Puter.js.
- Key API categories: AI, Cloud Storage, Key-Value Store, Hosting, Auth, Permissions, Threads, Apps, UI, Drivers, Utilities, Objects.
- Each function is accessible via JavaScript in the browser using `puter` namespace.

## AI Endpoints

### chat()

Given a prompt, returns the completion that best matches the prompt.

**Syntax:**
```js
puter.ai.chat(prompt)
puter.ai.chat(prompt, options = {})
puter.ai.chat(prompt, testMode = false, options = {})
puter.ai.chat(prompt, imageURL, testMode = false, options = {})
puter.ai.chat(prompt, [imageURLArray], testMode = false, options = {})
puter.ai.chat([messages], testMode = false, options = {})
```

**Parameters:**
- `prompt` (String): The prompt to complete.
- `options` (Object, optional): Model selection, streaming, tools, etc.
- `testMode` (Boolean, optional): Use test API.
- `imageURL` (String, optional): For vision.
- `messages` (Array, optional): For chatbots.

**Return:** Resolves to a response object or async iterable if streaming.

**Models Supported:** gpt-4o-mini, gpt-4o, o1, o1-mini, o1-pro, o3, o3-mini, o4-mini, gpt-4.1, gpt-4.1-mini, gpt-4.1-nano, gpt-4.5-preview, claude-3-7-sonnet, claude-3-5-sonnet, deepseek-chat, deepseek-reasoner, gemini-2.0-flash, gemini-1.5-flash, meta-llama, mistral, codestral, google/gemma, grok-beta.

**Examples:**
- Basic chat: `puter.ai.chat("What is life?")`
- Vision: `puter.ai.chat("What do you see?", "image_url")`
- Streaming: `puter.ai.chat("...", {model: 'claude', stream: true })`
- Function calling: See docs for function tool definition.

### txt2img()

Given a prompt, generates an image using AI.

**Syntax:**
```js
puter.ai.txt2img(prompt, testMode = false)
```

**Parameters:**
- `prompt` (String, required): The prompt for image generation.
- `testMode` (Boolean, optional): Use test API.

**Return:** Resolves to an image data URL.

**Example:**
- `puter.ai.txt2img('A picture of a cat.', true).then((image)=>{ document.body.appendChild(image); });`

---
*Note: This is a partial fetch. For full coverage, repeat for all endpoints listed on the main docs page.*