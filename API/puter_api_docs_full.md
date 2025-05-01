<!\[CDATA[
## Writing JSDoc Comments for JavaScript Functions

This snippet demonstrates how to write JSDoc comments for functions in the Puter project. It includes examples for documenting classes, methods, parameters, return values, and potential exceptions.

```javascript
/**
 * @class UserService
 * @description Service for managing user operations
 */

/**
 * Get a user by their ID
 * @param {string} id - The user ID
 * @returns {Promise<Object>} The user object
 * @throws {Error} If user not found
 */
async function getUserById(id) {
    // ...
}
```

## Analyzing Document with AWS Textract (JavaScript)

This method analyzes a document using AWS Textract to extract text and layout information. It's part of the AWSTextractService class which provides OCR functionality.

```javascript
analyze_document(file_facade) {
    // Analyzes a document using AWS Textract to extract text and layout information

    // Parameters:
    // - file_facade: Interface to access the document file
}
```

## Integrating Puter.js SDK and Using AI Chat in HTML

This snippet demonstrates how to include the Puter.js SDK in an HTML file and use it to interact with the GPT-3.5 Turbo AI model. It shows the loading of the SDK, displaying a loading message, and making an AI chat request.

```html
<html>
<body>
    <script src="http://puter.localhost:4100/sdk/puter.dev.js"></script>
    <script>
        // Loading ...
        puter.print(`Loading...`);

        // Chat with GPT-3.5 Turbo
        puter.ai.chat(`What color was Napoleon's white horse?`).then((response) => {
            puter.print(response);
        });
    </script>
</body>
</html>
```

## Completing Chat Conversation with OpenAI (JavaScript)

This method completes a chat conversation using OpenAI's API. It handles streaming, moderation, and model selection options.

```javascript
complete(messages, options) {
    // Completes a chat conversation using OpenAI's API

    // Parameters:
    // - messages: Array of message objects or strings representing the conversation
    // - options: Configuration options
    // - options.stream: Whether to stream the response
    // - options.moderation: Whether to perform content moderation
    // - options.model: The model to use for completion
}
```

## Finding Fallback Model for Chat Completion (JavaScript)

This method finds an appropriate fallback model by sorting the list of models by the Euclidean distance of input/output prices and selecting the first one not in the tried list.

```javascript
get_fallback_model(param0) {
    // Find an appropriate fallback model by sorting the list of models
    // by the euclidean distance of the input/output prices and selecting
    // the first one that is not in the tried list.

    // Parameters:
    // - param0: null
}
```

## Checking Content Moderation with OpenAI (JavaScript)

This method checks text content against OpenAI's moderation API for inappropriate content. It's part of the OpenAICompletionService class.

```javascript
check_moderation(text) {
    // Checks text content against OpenAI's moderation API for inappropriate content

    // Parameters:
    // - text: The text content to check for moderation
}
```

## Describing AWS Polly Voices (JavaScript)

This method describes available AWS Polly voices and caches the results. It's part of the AWSPollyService class which provides text-to-speech functionality using Amazon Polly.

```javascript
describe_voices() {
    // Describes available AWS Polly voices and caches the results
}
```

## Synthesizing Speech with AWS Polly (JavaScript)

This method synthesizes speech from text using AWS Polly. It takes the text to synthesize and options including output format as parameters.

```javascript
synthesize_speech(text, options) {
    // Synthesizes speech from text using AWS Polly

    // Parameters:
    // - text: The text to synthesize
    // - options: Synthesis options
    // - options.format: Output audio format (e.g. 'mp3')
}
```

## Moderating Chat Messages with OpenAI (JavaScript)

This method moderates chat messages for inappropriate content using OpenAI's moderation service. It takes an array of chat messages as input and returns the moderation result.

```javascript
moderate(params) {
    // Moderates chat messages for inappropriate content using OpenAI's moderation service

    // Parameters:
    // - params: The parameters object
    // - params.messages: Array of chat messages to moderate
}
```

## Using Tool Functions with AI in Puter

Example of using tool functions with AI, specifically a weather retrieval function. It defines a 'get_weather' function that accepts a location parameter.

```javascript
await puter.ai.chat('What\'s the weather like in Vancouver?', {
    tools: [
        {
            type: 'function',
            'function': {
                name: 'get_weather',
                description: 'A string describing the weather',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'city',
                        },
                    },
                    required: ['location'],
                    additionalProperties: false,
                },
                strict: true
            },
        }
    ]
})
```

## Using Claude AI with Streaming in Puter

Example of using Claude AI model with streaming enabled. It sets up a weather tool function and processes the streamed response using an async generator.

```javascript
gen = await puter.ai.chat('What\'s the weather like in Vancouver?', {
    model: 'claude',
    stream: true,
    tools: [
        {
            type: 'function',
            'function': {
                name: 'get_weather',
                description: 'A string describing the weather',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'city',
                        },
                    },
                    required: ['location'],
                    additionalProperties: false,
                },
                strict: true
            },
        }
    ]
})
for await ( const thing of gen ) { console.log('thing', thing) }
```

## Implementing a Puter Service in JavaScript

Template for implementing a custom Puter service by extending BaseService. This example shows the lifecycle methods (_construct and _init), event handlers for the service bus, and how to interact with other services through dependency injection.

```javascript
class MyService extends BaseService {
    static MODULES = {
        // Use node's `require` function to populate this object;
        // this makes these available to `this.require` and offers
        // dependency-injection for unit testing.
        ['some-module']: require('some-module')
    }

    // Do not override the constructor of BaseService - use this instead!
    async _construct () {
        this.my_list = [];
    }

    // This method is called after _construct has been called on all
    // other services.
    async _init () {
        const services = this.services;

        // We can get the instances of other services here
        const svc_otherService = services.get('other-service');
    }

    // The service container can listen on the "service event bus"
    async ['__on_boot.consolidation'] () {}
    async ['__on_boot.activation'] () {}
    async ['__on_start.webserver'] () {}
    async ['__on_install.routes'] () {}
}
```

## Processing Tool Responses in Puter AI Chat

Example showing a complete conversation flow with tool responses. It includes the assistant's tool call request for weather information and the tool's response providing weather data for Vancouver.

```javascript
await puter.ai.chat([
    { content: `What's the weather like in Vancouver?` },
    {
            "role": "assistant",
            "content": null,
            "tool_calls": [
                {
                    "id": "call_vcfEOmDczXq7KGMirPGGiNEe",
                    "type": "function",
                    "function": {
                        "name": "get_weather",
                        "arguments": "{\"location\":\"Vancouver\"}"
                    }
                }
            ],
            "refusal": null
    },
    {
        role: 'tool',
        tool_call_id: 'call_vcfEOmDczXq7KGMirPGGiNEe',
        content: 'Sunny with a chance of rain'
    },
], {
    tools: [
        {
            type: 'function',
            'function': {
                name: 'get_weather',
                description: 'A string describing the weather',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'city',
                        },
                    },
                    required: ['location'],
                    additionalProperties: false,
                },
                strict: true
            },
        }
    ]
})
```

## Creating a Custom Puter Module in JavaScript

Example showing how to create a custom Puter module by extending AdvancedBase and implementing the install method. The module registers a custom service with the service container, providing options for configuration.

```javascript
class MyPuterModule extends AdvancedBase {
    async install (context) {
        const services = context.get('services');

        const MyService = require('./path/to/MyService.js');
        services.registerService('my-service', MyService, {
            some_options: 'for-my-service',
        });
    }
}
```

## Responding to Tool Use with Claude AI in Streaming Mode

Complete example of responding to a tool use request with Claude AI in streaming mode. Shows the full conversation flow including tool result handling and response processing with an async generator.

```javascript
gen = await puter.ai.chat([
    { role: 'user', content: `What's the weather like in Vancouver?` },
    {
            "role": "assistant",
            "content": [
                { type: 'text', text: "I'll check the weather in Vancouver for you." },
                { type: 'tool_use', name: 'get_weather', id: 'toolu_01Y4naZhXygjUVRjGBvrL9z8', input: { location: 'Vancouver' } },
            ]
    },
    {
        role: 'user',
        content: [
            {
                type: 'tool_result',
                tool_use_id: 'toolu_01Y4naZhXygjUVRjGBvrL9z8',
                content: 'Sunny with a chance of rain'
            }
        ]
    },
], {
    model: 'claude',
    stream: true,
    tools: [
        {
            type: 'function',
            'function': {
                name: 'get_weather',
                description: 'A string describing the weather',
                parameters: {
                    type: 'object',
                    properties: {
                        location: {
                            type: 'string',
                            description: 'city',
                        },
                    },
                    required: ['location'],
                    additionalProperties: false,
                },
                strict: true
            },
        }
    ]
})
for await ( const item of gen ) { console.log(item) }
```

## Creating a Basic Puter Extension in JavaScript

This snippet demonstrates how to create a simple Puter extension that responds to a GET request. It shows how to handle different actor types and customize the response based on the user or app making the request.

```javascript
const { UserActorType, AppUnderUserActorType } = use.core;

extension.get('/hello-puter', (req, res) => {
    const actor = req.actor;
    let who = 'unknown';
    if ( actor.type instanceof UserActorType ) {
        who = actor.type.user.username;
    }
    if ( actor.type instanceof AppUnderUserActorType ) {
        who = actor.type.app.name + ' on behalf of ' + actor.type.user.username;
    }
    res.send(`Hello, ${who}!`);
});
```

## Using OpenAI for Image Generation in Puter

API request to OpenAI for generating an image. It creates an image based on the prompt 'photorealistic teapot made of swiss cheese' and converts the response to a blob URL.

```javascript
URL.createObjectURL(await (await fetch("http://api.puter.localhost:4100/drivers/call", {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${puter.authToken}`,
  },
  "body": JSON.stringify({
      interface: 'puter-image-generation',
      driver: 'openai-image-generation',
      method: 'generate',
      args: {
        prompt: 'photorealistic teapot made of swiss cheese',
      }
  }),
  "method": "POST",
})).blob());
```

## Demonstrating Variable Naming Conventions in JavaScript

This snippet illustrates the naming conventions for variables in the Puter project. It shows the use of camelCase and prefixes for specific types of variables, such as service references.

```javascript
const svc_systemData = this.services.get('system-data');
const svc_su = this.services.get('su');
effective_policy = await svc_su.sudo(async () => {
    return await svc_systemData.interpret(effective_policy.data);
});
```

## Implementing Service Initialization in JavaScript

This code adds an _init method to the PrankGreetService class. It demonstrates how to use logging and asynchronous operations in a service initialization.

```javascript
class PrankGreetService extends BaseService {
    async _init () {
        // Wait for 5 seconds
        await new Promise(rslv => setTimeout(rslv), 5000);

        // Display a log message
        this.log.noticeme('Hello from PrankGreetService!');
    }
}
```

## Inserting Copyright Notice in JavaScript Files

This snippet shows the standard copyright notice that should be included at the beginning of all files in the Puter project. It includes licensing information and copyright details.

```javascript
/*
 * Copyright (C) 2025-present Puter Technologies Inc.
 *
 * This file is part of Puter.
 *
 * Puter is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
```

## Defining Hello World Driver Interface in JavaScript

This snippet shows the structure of the 'hello-world' driver interface definition. It specifies the interface description, methods, parameters, and result type.

```javascript
'hello-world': {
    description: 'A simple driver that returns a greeting.',
    methods: {
        greet: {
            description: 'Returns a greeting.',
            parameters: {
                subject: {
                    type: 'string',
                    optional: true,
                },
            },
            result: { type: 'string' },
        }
    }
},
```

## Sharing Files and Apps API Request in JavaScript

This JavaScript code demonstrates how to make a POST request to the '/share' endpoint using fetch. It includes setting the proper Authorization header with a bearer token and sending the share request payload in JSON format.

```javascript
await fetch("http://puter.localhost:4100/share", {
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${puter.authToken}`,
  },
  body: JSON.stringify({
    recipients: [
        "user_that_gets_shared_to",
        "another@example.com"
    ],
    shares: [
        {
            $: "app-share",
            name: "some-app-name"
        },
        {
            $: "app-share",
            uid: "app-SOME-APP-UID"
        },
        {
            $: "fs-share",
            path: "/some/file/or/directory"
        },
        {
            $: "fs-share",
            path: "SOME-FILE-UUID"
        }
    ]
  }),
  "method": "POST",
});
```

## Implementing Wisp Packet Processing with v86 in JavaScript

A comprehensive example demonstrating how to use the Wisp utilities with the v86 emulator. It sets up byte streams, Virtio frame streams, and Wisp packet streams, and processes packets asynchronously.

```javascript
const emulator = new V86(...);

// Get a byte stream for /dev/hvc0
const byteStream = NewCallbackByteStream();
emulator.add_listener('virtio-console0-output-bytes',
    byteStream.listener);

// Get a stream of frames with prepended byte lengths
// (for example, `twisp` uses this format)
const virtioStream = NewVirtioFrameStream(byteStream);

// Get a stream of WispPacket objects
const wispStream = NewWispPacketStream(virtioStream);

// Async iterator
(async () => {
    for ( const packet of wispStream ) {
        console.log('Wisp packet!', packet.describe());
        
        // Let's send back a reflected packet for INFO!
        if ( packet.type === WispPacket.INFO ) {
            emulator.bus.send(
                'virtio-console0-input-bytes',
                packet.toVirtioFrame(),
            );
        }
    }
})();
```

## Adding Users to a Group in JavaScript

This code demonstrates how to add users to an existing group using a POST request to the '/group/add-users' endpoint. It requires the group's UID and an array of usernames to be added.

```javascript
await fetch(`${window.api_origin}/group/add-users`, {
  "headers": {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${puter.authToken}`,
  },
  "body": JSON.stringify({
      uid: '9c644a1c-3e43-4df4-ab67-de5b68b235b6',
      users: ['first_user', 'second_user'],
  }),
  "method": "POST",
});
```
]]>