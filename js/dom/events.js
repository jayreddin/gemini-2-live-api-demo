import elements from './elements.js';
import settingsManager from '../settings/settings-manager.js';
import { makeDraggable, makeResizable } from '../utils/utils.js'; // Import utilities

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

// State variables moved inside setupEventListeners or managed by managers

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
 * @param {CameraManager} cameraManager - Instance of CameraManager
 * @param {ScreenManager} screenManager - Instance of ScreenManager
 */
export function setupEventListeners(agent, cameraManager, screenManager) {

    let isMicActive = false; // Track mic state based on agent events if possible, or toggle
    let isCameraActive = false; // Track if camera manager is active
    let isScreenShareActive = false; // Track if screen manager is active

    // Store cleanup functions for draggable/resizable listeners
    let cameraDragCleanup = null;
    let cameraResizeCleanup = null;
    let screenDragCleanup = null;
    let screenResizeCleanup = null;

    // --- Helper to reset button state ---
    const resetButtonState = (button, stateVariable) => {
        button.classList.remove('active');
        stateVariable = false; // Note: This won't update the outer scope variable directly, manage state carefully
    };

    // --- Popup Dismissal Logic ---
    const handleOutsideClick = (event) => {
        // Check camera popup
        if (isCameraActive && cameraManager.popupElement && !cameraManager.popupElement.contains(event.target) && !elements.cameraBtn.contains(event.target)) {
            console.log("Clicked outside camera popup.");
            cameraManager.dispose(); // This will trigger onCloseCallback
        }
        // Check screen popup
        if (isScreenShareActive && screenManager.popupElement && !screenManager.popupElement.contains(event.target) && !elements.screenBtn.contains(event.target)) {
            console.log("Clicked outside screen popup.");
            screenManager.dispose(); // This will trigger onCloseCallback
        }
        // Add settings dialog check if needed
    };
    document.addEventListener('click', handleOutsideClick, true); // Use capture phase


    // --- Draggable/Resizable Integration ---
    const setupPopupInteraction = (manager, type) => {
        if (manager.popupElement) {
            const header = manager.popupElement.querySelector('.popup-header');
            if (header) {
                if (type === 'camera') {
                    cleanupPopupInteraction('camera'); // Clean up previous listeners if any
                    cameraDragCleanup = makeDraggable(manager.popupElement, header);
                    cameraResizeCleanup = makeResizable(manager.popupElement); // Resizable via pinch
                    console.log("Draggable/Resizable setup for Camera Popup");
                } else if (type === 'screen') {
                    cleanupPopupInteraction('screen'); // Clean up previous listeners if any
                    screenDragCleanup = makeDraggable(manager.popupElement, header);
                    screenResizeCleanup = makeResizable(manager.popupElement); // Resizable via pinch
                    console.log("Draggable/Resizable setup for Screen Popup");
                }
            } else {
                console.warn(`Popup header not found for ${type} popup.`);
            }
        } else {
             console.warn(`Popup element not found for ${type} manager.`);
        }
    };

    const cleanupPopupInteraction = (type) => {
         if (type === 'camera') {
             if (cameraDragCleanup) cameraDragCleanup();
             if (cameraResizeCleanup) cameraResizeCleanup();
             cameraDragCleanup = null;
             cameraResizeCleanup = null;
             console.log("Draggable/Resizable cleaned up for Camera Popup");
         } else if (type === 'screen') {
             if (screenDragCleanup) screenDragCleanup();
             if (screenResizeCleanup) screenResizeCleanup();
             screenDragCleanup = null;
             screenResizeCleanup = null;
             console.log("Draggable/Resizable cleaned up for Screen Popup");
         }
    };


    // --- Button Event Listeners ---    // Disconnect handler
    elements.disconnectBtn.addEventListener('click', async () => {
        try {
            // Disconnect logic
            if ('vibrate' in navigator) {
                navigator.vibrate([50]);
            }
        
            // Dispose managers and cleanup interactions before disconnecting agent
            if (isCameraActive) {
                cameraManager.dispose(); // Calls onClose which calls cleanupPopupInteraction
            } else {
                 cleanupPopupInteraction('camera'); // Ensure cleanup even if not active
            }
            if (isScreenShareActive) {
                screenManager.dispose(); // Calls onClose which calls cleanupPopupInteraction
            } else {
                 cleanupPopupInteraction('screen'); // Ensure cleanup even if not active
            }
            // Mic state is handled by agent disconnect internally? Verify.
            await agent.disconnect();
            showConnectButton();
            // Reset button states visually (state variables managed by callbacks)
            elements.cameraBtn.classList.remove('active');
            elements.screenBtn.classList.remove('active');
            elements.micBtn.classList.remove('active'); // Assuming disconnect stops mic
            isCameraActive = false;
            isScreenShareActive = false;
            isMicActive = false; // Assuming disconnect stops mic
        } catch (error) {
            console.error('Error disconnecting:', error);
        }
    });

    // Connect handler
    elements.connectBtn.addEventListener('click', async () => {        try {
            await ensureAgentReady(agent);
        } catch (error) {
            console.error('Error connecting:', error);
        }
    });

    // Microphone toggle handler
    elements.micBtn.addEventListener('click', async () => {
        try {
            await ensureAgentReady(agent);
            // Request microphone permission if not already granted
            if (agent.audioRecorder && !agent.audioRecorder.stream) {
                try {
                    await agent.audioRecorder.start(() => {}); // Start with a dummy callback
                    elements.micBtn.classList.add('permission-pending'); // Add permission pending class
                } catch (permissionError) {
                    console.error('Microphone permission denied:', permissionError);
                    // Handle permission denied
                    elements.micBtn.classList.remove('permission-pending');
                    // Optionally, show a message to the user
                    return;
                }
            }

            await agent.toggleMic();
            isMicActive = !isMicActive;
            elements.micBtn.classList.toggle('active', isMicActive);
            elements.micBtn.classList.remove('permission-pending'); // Remove pending class if active
            elements.micBtn.setAttribute('aria-pressed', isMicActive);
            console.log(`Mic toggled. Assumed active: ${isMicActive}`);
        } catch (error) {
            console.error('Error toggling microphone:', error);
            elements.micBtn.classList.remove('active', 'permission-pending');
            elements.micBtn.setAttribute('aria-pressed', 'false');
            // Handle errors, e.g., device not available
        }
    });

    // Camera toggle handler
    // Camera toggle handler using CameraManager
    cameraManager.setOnClose(() => {
        console.log("CameraManager onCloseCallback triggered.");
        elements.cameraBtn.classList.remove('active');
        elements.cameraBtn.setAttribute('aria-pressed', 'false');
        isCameraActive = false;
        // Optionally notify the agent if needed
        // agent.notifyCameraStopped();
        cleanupPopupInteraction('camera'); // Clean up draggable/resizable listeners
    });

    elements.cameraBtn.addEventListener('click', async () => {
        if (!isCameraActive) {
            try {
                await ensureAgentReady(agent);
                await cameraManager.initialize();
                // TODO: Integrate cameraManager.capture() with agent if needed
                // Example: agent.setCameraSource(cameraManager);
                elements.cameraBtn.classList.add('active');
                elements.cameraBtn.setAttribute('aria-pressed', 'true');
                isCameraActive = true;
                console.log("Camera activated.");
                setupPopupInteraction(cameraManager, 'camera'); // Setup draggable/resizable
            } catch (error) {
                console.error('Error starting camera:', error);
                cameraManager.dispose(); // Ensure cleanup on init error
                elements.cameraBtn.classList.remove('active');
                elements.cameraBtn.setAttribute('aria-pressed', 'false');
                isCameraActive = false;
            }
        } else {
            try {
                cameraManager.dispose(); // Dispose handles stopping stream and hiding popup
                // Callback handles button state update
                console.log("Camera disposed via button click.");
            } catch (error) {
                 console.error('Error stopping camera:', error);
                 // Force reset state even if dispose fails
                 elements.cameraBtn.classList.remove('active');
                 elements.cameraBtn.setAttribute('aria-pressed', 'false');
                 isCameraActive = false;
            }
        }
    });

    // Screen sharing handler using ScreenManager
    screenManager.setOnClose(() => {
        console.log("ScreenManager onCloseCallback triggered.");
        elements.screenBtn.classList.remove('active');
        elements.screenBtn.setAttribute('aria-pressed', 'false');
        isScreenShareActive = false;
        // Optionally notify the agent if needed
        // agent.notifyScreenShareStopped();
        cleanupPopupInteraction('screen'); // Clean up draggable/resizable listeners
    });

    elements.screenBtn.addEventListener('click', async () => {
        if (!isScreenShareActive) {
            try {
                await ensureAgentReady(agent);
                await screenManager.initialize();
                // TODO: Integrate screenManager.capture() with agent if needed
                // Example: agent.setScreenSource(screenManager);
                elements.screenBtn.classList.add('active');
                elements.screenBtn.setAttribute('aria-pressed', 'true');
                isScreenShareActive = true;
                console.log("Screen share activated.");
                setupPopupInteraction(screenManager, 'screen'); // Setup draggable/resizable
            } catch (error) {
                console.error('Error starting screen share:', error);
                // ScreenManager's initialize already calls dispose on error
                elements.screenBtn.classList.remove('active');
                elements.screenBtn.setAttribute('aria-pressed', 'false');
                isScreenShareActive = false;
                // Optionally show user feedback about potential iOS incompatibility
                if (error.message.includes("getDisplayMedia")) {
                     alert("Screen sharing might not be supported on this browser/device (e.g., iOS).");
                }
            }
        } else {
             try {
                screenManager.dispose(); // Dispose handles stopping stream and hiding popup
                // Callback handles button state update
                console.log("Screen share disposed via button click.");
             } catch (error) {
                 console.error('Error stopping screen share:', error);
                 // Force reset state
                 elements.screenBtn.classList.remove('active');
                 elements.screenBtn.setAttribute('aria-pressed', 'false');
                 isScreenShareActive = false;
             }
        }
    });

    // Message sending handlers
    const sendMessage = async () => {
        try {
            await ensureAgentReady(agent);
            const text = elements.messageInput.value.trim();
            await agent.sendText(text);
            elements.messageInput.value = '';
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    elements.sendBtn.addEventListener('click', sendMessage);    elements.messageInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });

    // Settings button click
    elements.settingsBtn.addEventListener('click', () => settingsManager.show());
    
    // Initial UI state
    showConnectButton(); // Assuming starts disconnected
}

// SettingsManager is initialized in its constructor, no need to call initialize()
