import { GeminiAgent } from './main/agent.js';
import { getConfig, getWebsocketUrl, getDeepgramApiKey, MODEL_SAMPLE_RATE } from './config/config.js';

import { GoogleSearchTool } from './tools/google-search.js';
import { ToolManager } from './tools/tool-manager.js';
import { ChatManager } from './chat/chat-manager.js';
import { CameraManager } from './camera/camera.js';
import { ScreenManager } from './screen/screen.js';

import { setupEventListeners } from './dom/events.js';

const url = getWebsocketUrl();
const config = getConfig();
const deepgramApiKey = getDeepgramApiKey();

const toolManager = new ToolManager();
toolManager.registerTool('googleSearch', new GoogleSearchTool());

const chatManager = new ChatManager();
const cameraManager = new CameraManager(config.camera); // Assuming config has a camera section
const screenManager = new ScreenManager(config.screen); // Assuming config has a screen section

const geminiAgent = new GeminiAgent({
    url,
    config,
    deepgramApiKey,
    modelSampleRate: MODEL_SAMPLE_RATE,
    toolManager
});

// Handle chat-related events
geminiAgent.on('transcription', (transcript) => {
    chatManager.updateStreamingMessage(transcript);
});

geminiAgent.on('text_sent', (text) => {
    chatManager.finalizeStreamingMessage();
    chatManager.addUserMessage(text);
});

geminiAgent.on('interrupted', () => {
    chatManager.finalizeStreamingMessage();
    if (!chatManager.lastUserMessageType) {
        chatManager.addUserAudioMessage();
    }
});

geminiAgent.on('turn_complete', () => {
    chatManager.finalizeStreamingMessage();
});

geminiAgent.connect();

// Pass managers to event setup
setupEventListeners(geminiAgent, cameraManager, screenManager);

// --- Add Reply Mode Toggle Listener ---
const replyModeToggle = document.getElementById('replyModeToggle');
if (replyModeToggle) {
    replyModeToggle.addEventListener('change', (event) => {
        const isAudioMode = event.target.checked;
        console.log(`Reply mode switched to: ${isAudioMode ? 'Audio' : 'Text'}`);
        // TODO: Integrate this preference with GeminiAgent
        // Example: geminiAgent.setReplyPreference(isAudioMode ? 'audio' : 'text');
        // Update ARIA attribute
        event.target.setAttribute('aria-checked', isAudioMode);
    });
} else {
    console.error('Reply mode toggle button not found.');
}