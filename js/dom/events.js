import elements from './elements.js';
import settingsManager from '../settings/settings-manager.js';

/**
 * Updates UI to show disconnect button and hide connect button
 */
const showDisconnectButton = () => {
    elements.connectBtn.style.display = 'none';
    elements.disconnectBtn.style.display = 'block';
};

/**
 * Updates UI to show connect button and hide disconnect button
 */
const showConnectButton = () => {
    elements.disconnectBtn.style.display = 'none';
    elements.connectBtn.style.display = 'block';
};

let isCameraActive = false;

/**
 * Ensures the agent is connected and initialized
 * @param {GeminiAgent} agent - The main application agent instance
 * @returns {Promise<void>}
 */
const ensureAgentReady = async (agent) => {
    if (!agent.connected) {
        await agent.connect();
        showDisconnectButton();
    }
    if (!agent.initialized) {
        await agent.initialize();
    }
};

/**
 * Sets up event listeners for the application's UI elements
 * @param {GeminiAgent} agent - The main application agent instance
 */
export function setupEventListeners(agent) {
    // Disconnect handler
    elements.disconnectBtn.addEventListener('click', async () => {
        try {
            await agent.disconnect();
            showConnectButton();
            [elements.cameraBtn, elements.screenBtn, elements.micBtn].forEach(btn => btn.classList.remove('active'));
            isCameraActive = false;
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    });
    // Add touchstart listener for disconnect
    elements.disconnectBtn.addEventListener('touchstart', async (e) => {
        e.preventDefault(); // Prevent potential double-tap zoom or other default touch actions
        try {
            await agent.disconnect();
            showConnectButton();
            [elements.cameraBtn, elements.screenBtn, elements.micBtn].forEach(btn => btn.classList.remove('active'));
            isCameraActive = false;
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    });

    // Connect handler
    elements.connectBtn.addEventListener('click', async () => {
        try {
            await ensureAgentReady(agent);
        } catch (error) {
            console.error('Error connecting:', error);
        }
    });
    // Add touchstart listener for connect
    elements.connectBtn.addEventListener('touchstart', async (e) => {
        e.preventDefault();
        try {
            await ensureAgentReady(agent);
        } catch (error) {
            console.error('Error connecting:', error);
        }
    });

    // Microphone toggle handler
    elements.micBtn.addEventListener('click', async () => {
        try {
            await ensureAgentReady(agent);
            const isActive = await agent.toggleMic();
            elements.micBtn.classList.toggle('active', isActive);
            elements.micBtn.classList.toggle('pulsing', isActive);
        } catch (error) {
            console.error('Error toggling microphone:', error);
            // Ensure button state is reset on error (e.g., permission denied)
            elements.micBtn.classList.remove('active', 'pulsing');
        }
    });
    // Add touchstart listener for mic
    elements.micBtn.addEventListener('touchstart', async (e) => {
        e.preventDefault();
        try {
            await ensureAgentReady(agent);
            await agent.toggleMic();
            elements.micBtn.classList.toggle('active');
        } catch (error) {
            console.error('Error toggling microphone:', error);
            elements.micBtn.classList.remove('active');
        }
    });

    // Camera toggle handler
    elements.cameraBtn.addEventListener('click', async () => {
        try {
            await ensureAgentReady(agent);

            if (!isCameraActive) {
                await agent.startCameraCapture();
                elements.cameraBtn.classList.add('active', 'glowing');
            } else {
                await agent.stopCameraCapture();
                elements.cameraBtn.classList.remove('active', 'glowing');
            }
            isCameraActive = !isCameraActive;
        } catch (error) {
            console.error('Error toggling camera:', error);
            elements.cameraBtn.classList.remove('active', 'glowing');
            isCameraActive = false;
            isCameraActive = false;
        }
    });
    // Add touchstart listener for camera
    elements.cameraBtn.addEventListener('touchstart', async (e) => {
        e.preventDefault();
        try {
            await ensureAgentReady(agent);

            if (!isCameraActive) {
                await agent.startCameraCapture();
                elements.cameraBtn.classList.add('active');
            } else {
                await agent.stopCameraCapture();
                elements.cameraBtn.classList.remove('active');
            }
            isCameraActive = !isCameraActive;
        } catch (error) {
            console.error('Error toggling camera:', error);
            elements.cameraBtn.classList.remove('active');
            isCameraActive = false;
        }
    });


    // Screen sharing handler
    let isScreenShareActive = false;

    // Listen for screen share stopped events (from native browser controls)
    agent.on('screenshare_stopped', () => {
        elements.screenBtn.classList.remove('active', 'glowing'); // Remove glowing class
        isScreenShareActive = false;
        console.info('Screen share stopped');
    });

    elements.screenBtn.addEventListener('click', async () => {
        try {
            await ensureAgentReady(agent);

            if (!isScreenShareActive) {
                await agent.startScreenShare();
                elements.screenBtn.classList.add('active', 'glowing');
            } else {
                await agent.stopScreenShare();
                elements.screenBtn.classList.remove('active', 'glowing');
            }
            isScreenShareActive = !isScreenShareActive;
        } catch (error) {
            console.error('Error toggling screen share:', error);
            elements.screenBtn.classList.remove('active', 'glowing');
            isScreenShareActive = false;
            isScreenShareActive = false;
        }
    });
    // Add touchstart listener for screen share
    elements.screenBtn.addEventListener('touchstart', async (e) => {
        e.preventDefault();
        try {
            await ensureAgentReady(agent);

            if (!isScreenShareActive) {
                await agent.startScreenShare();
                elements.screenBtn.classList.add('active');
            } else {
                await agent.stopScreenShare();
                elements.screenBtn.classList.remove('active');
            }
            isScreenShareActive = !isScreenShareActive;
        } catch (error) {
            console.error('Error toggling screen share:', error);
            elements.screenBtn.classList.remove('active');
            isScreenShareActive = false;
        }
    });

    // Message sending handlers
    const sendMessage = async () => {
        try {
            await ensureAgentReady(agent);
            const text = elements.messageInput.value.trim();
            if (text) { // Only send if text is not empty
                await agent.sendText(text);
                elements.messageInput.value = '';
            }
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    elements.sendBtn.addEventListener('click', sendMessage);
    // Add touchstart listener for send button
    elements.sendBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        sendMessage();
    });

    elements.messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Settings button click
    elements.settingsBtn.addEventListener('click', () => settingsManager.show());
    // Add touchstart listener for settings button
    elements.settingsBtn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        settingsManager.show();
    });
}

// Initialize settings
settingsManager;
