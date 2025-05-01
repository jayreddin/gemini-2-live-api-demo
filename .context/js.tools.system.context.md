# Tool Management (ToolManager, GoogleSearchTool)

## Purpose and Responsibilities
Provides a framework for registering, managing, and invoking tools within the application. Enables extensibility by allowing new tools to be added and called dynamically.

## Key Functions and Roles
- **ToolManager**: Registers tool instances, retrieves tool declarations, and handles tool calls (including async operations).
- **GoogleSearchTool**: Example tool that provides search functionality and a declaration interface.

## Dependencies and Relationships
- Integrated with GeminiAgent for orchestrating tool calls.
- Tools may interact with other subsystems (chat, media, settings) depending on their function.
- Relies on consistent tool declaration and invocation interfaces.

## Desktop-Specific Implementations
- UI controls for tool invocation sized for mouse interaction.
- May use modals or panels for tool input/output.

## Areas Needing Mobile Adaptation
- Touch-friendly tool invocation controls.
- Adaptive layout for tool input/output on small screens.
- Consider mobile-specific tools or integrations.

## Potential Challenges
- Ensuring tool UI remains usable and accessible on mobile.
- Managing tool input/output with limited screen space.
- Supporting dynamic tool registration and invocation in mobile environments.