<!\[CDATA[
## Puter.js API Summary

Puter.js is a JavaScript SDK that provides serverless authentication, cloud storage, and AI services directly in the browser. It allows developers to build applications without backend code or configuration.

### Core Features

*   **AI:** Access to AI models like GPT-4o, Claude 3.7 Sonnet, and DALL·E 3 for tasks like chat, image generation, and text-to-speech.
*   **Cloud Storage:** Serverless file storage with functions for writing, reading, creating directories, renaming, copying, moving, and deleting files.
*   **Key-Value Store:** A NoSQL database for storing user preferences and application data.
*   **Hosting:** Ability to publish static websites directly from the browser.
*   **Authentication:** User authentication and authorization.
*   **Permissions:** Fine-grained control over user and app permissions.
*   **Threads:** Create, get, edit, delete, list, and subscribe to threads.
*   **Apps:** Create, list, delete, update, and get apps.
*   **UI:** A set of UI components for building user interfaces.
*   **Drivers:** Access to various drivers for external services.
*   **Utilities:** Utility functions for common tasks.

### Key Concepts

*   **Services:** Puter services provide specific functionalities, such as AI, cloud storage, and authentication.
*   **Modules:** Custom Puter modules can be created to extend the functionality of the platform.
*   **Extensions:** Puter extensions allow developers to add custom endpoints and functionality to the API.
*   **Drivers:** Drivers provide access to external services and APIs.
*   **Context:** Context objects are used to maintain contextual data in both Node.js and browser environments.

### API Endpoints

*   `/share`: Shares files and apps with other users.
*   `/sharelink/apply`: Applies a sharelink to the current user.
*   `/sharelink/check`: Checks the validity of a sharelink.
*   `/group/add-users`: Adds users to a group.

### Authentication

Puter.js provides functions for signing in, signing out, and getting user information.

### Code Examples

The documentation includes code examples for various tasks, such as:

*   Writing a file to the cloud
*   Reading a file from the cloud
*   Saving user preferences in the cloud Key-Value Store
*   Chatting with GPT-4o mini
*   Generating an image with DALL·E 3
*   Publishing a static website
*   Authenticating a user
*   Using tool functions with AI
*   Responding to tool use with Claude AI in streaming mode

]]>