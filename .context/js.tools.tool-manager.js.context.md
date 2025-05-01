# Context Summary: js/tools/tool-manager.js

This file defines the `ToolManager` class, responsible for managing and orchestrating tools within the Gemini Live application. Key features include:

- **Tool Registration:** Allows registering tool instances by unique name. Each tool must implement `execute()` and `getDeclaration()` methods.
- **Tool Declarations:** Aggregates and returns metadata/declarations from all registered tools for discovery and integration.
- **Tool Execution:** Handles function calls by parsing arguments and invoking the appropriate tool's `execute()` method asynchronously.
- **Error Handling:** Logs warnings for duplicate registration or missing methods, and returns structured error information on execution failure.

This class serves as the central point for tool integration, enabling dynamic extension and modularity of the application's capabilities.