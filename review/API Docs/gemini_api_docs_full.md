<!\[CDATA[
## Browser Initialization with API Key

Example of initializing the Google Gen AI SDK in a browser environment. Note that this approach should be used cautiously as it exposes API keys in client-side code.

```typescript
import { GoogleGenAI } from '@google/genai';
const ai = new GoogleGenAI({apiKey: 'GEMINI_API_KEY'});
```

## Installing Google Gen AI SDK with npm

Command to install the Google Gen AI SDK package using npm. This is the first step to integrate Gemini capabilities into your JavaScript or TypeScript project.

```shell
npm install @google/genai
```

## Function Calling with Gemini API

Implementation of function calling to allow Gemini to interact with external systems. This example defines a light control function, sends a prompt to Gemini, and retrieves the function call parameters that Gemini decides to use.

```typescript
import {GoogleGenAI, FunctionCallingConfigMode, FunctionDeclaration, Type} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

async function main() {
  const controlLightDeclaration: FunctionDeclaration = {
    name: 'controlLight',
    parameters: {
      type: Type.OBJECT,
      description: 'Set the brightness and color temperature of a room light.',
      properties: {
        brightness: {
          type: Type.NUMBER,
          description:
              'Light level from 0 to 100. Zero is off and 100 is full brightness.',
        },
        colorTemperature: {
          type: Type.STRING,
          description:
              'Color temperature of the light fixture which can be `daylight`, `cool`, or `warm`.',
        },
      },
      required: ['brightness', 'colorTemperature'],
    },
  };

  const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
    contents: 'Dim the lights so the room feels cozy and warm.',
    config: {
      toolConfig: {
        functionCallingConfig: {
          // Force it to call any function
          mode: FunctionCallingConfigMode.ANY,
          allowedFunctionNames: ['controlLight'],
        }
      },
      tools: [{functionDeclarations: [controlLightDeclaration]}]
    }
  });

  console.log(response.functionCalls);
}

main();
```

## Streaming Content Generation from Gemini

Example of using the streaming API to get content chunks as they're generated, providing a more responsive user experience. This code generates a poem and prints each chunk as it arrives.

```typescript
import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});

async function main() {
  const response = await ai.models.generateContentStream({
    model: 'gemini-2.0-flash-001',
    contents: 'Write a 100-word poem.',
  });
  for await (const chunk of response) {
    console.log(chunk.text);
  }
}

main();
```

## Initializing with Vertex AI Configuration

Sample code for initializing the SDK with Vertex AI instead of the Gemini Developer API. This requires specifying the Google Cloud project and location parameters.

```typescript
import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
    vertexai: true,
    project: 'your_project',
    location: 'your_location',
});
```

## Defining Google GenAI API Types - TypeScript

This code defines the core TypeScript interfaces, classes, and enums that constitute the public API surface for the Google Generative AI client library. It specifies the structure of data objects used for generating content (images, videos), configuring requests, handling safety settings, managing models, tuning jobs, and interacting with cached content.
SOURCE: https://github.com/googleapis/js-genai/blob/main/api-report/genai.api.md#_snippet_1

LANGUAGE: typescript
CODE:
```
// @public
export interface GenerateImagesParameters {
    config?: GenerateImagesConfig;
    model: string;
    prompt: string;
}

// @public
export class GenerateImagesResponse {
    generatedImages?: GeneratedImage[];
    positivePromptSafetyAttributes?: SafetyAttributes;
}

// @public
export interface GenerateVideosConfig {
    abortSignal?: AbortSignal;
    aspectRatio?: string;
    durationSeconds?: number;
    enhancePrompt?: boolean;
    fps?: number;
    httpOptions?: HttpOptions;
    negativePrompt?: string;
    numberOfVideos?: number;
    outputGcsUri?: string;
    personGeneration?: string;
    pubsubTopic?: string;
    resolution?: string;
    seed?: number;
}

// @public
export interface GenerateVideosOperation {
    done?: boolean;
    error?: Record<string, unknown>;
    metadata?: Record<string, unknown>;
    name?: string;
    response?: GenerateVideosResponse;
}

// @public
export interface GenerateVideosParameters {
    config?: GenerateVideosConfig;
    image?: Image_2;
    model: string;
    prompt?: string;
}

// @public
export class GenerateVideosResponse {
    generatedVideos?: GeneratedVideo[];
    raiMediaFilteredCount?: number;
    raiMediaFilteredReasons?: string[];
}

// @public
export interface GenerationConfig {
    audioTimestamp?: boolean;
    candidateCount?: number;
    frequencyPenalty?: number;
    logprobs?: number;
    maxOutputTokens?: number;
    mediaResolution?: MediaResolution;
    presencePenalty?: number;
    responseLogprobs?: boolean;
    responseMimeType?: string;
    responseSchema?: Schema;
    routingConfig?: GenerationConfigRoutingConfig;
    seed?: number;
    stopSequences?: string[];
    temperature?: number;
    topK?: number;
    topP?: number;
}

// @public
export interface GenerationConfigRoutingConfig {
    autoMode?: GenerationConfigRoutingConfigAutoRoutingMode;
    manualMode?: GenerationConfigRoutingConfigManualRoutingMode;
}

// @public
export interface GenerationConfigRoutingConfigAutoRoutingMode {
    modelRoutingPreference?: 'UNKNOWN' | 'PRIORITIZE_QUALITY' | 'BALANCED' | 'PRIORITIZE_COST';
}

// @public
export interface GenerationConfigRoutingConfigManualRoutingMode {
    modelName?: string;
}

// @public
export interface GetCachedContentConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}

// @public
export interface GetCachedContentParameters {
    config?: GetCachedContentConfig;
    name: string;
}

// @public
export interface GetFileConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}

// @public
export interface GetFileParameters {
    config?: GetFileConfig;
    name: string;
}

// @public
export interface GetModelConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}

// @public (undocumented)
export interface GetModelParameters {
    config?: GetModelConfig;
    // (undocumented)
    model: string;
}

// @public (undocumented)
export interface GetOperationConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}

// @public
export interface GetOperationParameters {
    config?: GetOperationConfig;
    operationName: string;
}

// @public
export interface GetTuningJobConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
}

// @public
export interface GetTuningJobParameters {
    config?: GetTuningJobConfig;
    // (undocumented)
    name: string;
}

// @public
export class GoogleGenAI {
    constructor(options: GoogleGenAIOptions);
    // (undocumented)
    protected readonly apiClient: ApiClient;
    // (undocumented)
    readonly caches: Caches;
    // (undocumented)
    readonly chats: Chats;
    // (undocumented)
    readonly files: Files;
    // (undocumented)
    readonly live: Live;
    // (undocumented)
    readonly models: Models;
    // (undocumented)
    readonly operations: Operations;
    // Warning: (ae-forgotten-export) The symbol "Tunings" needs to be exported by the entry point index.d.ts
    //
    // (undocumented)
    readonly tunings: Tunings;
    // (undocumented)
    readonly vertexai: boolean;
}

// @public
export interface GoogleGenAIOptions {
    apiKey?: string;
    apiVersion?: string;
    googleAuthOptions?: GoogleAuthOptions;
    httpOptions?: HttpOptions;
    location?: string;
    project?: string;
    vertexai?: boolean;
}

// @public
export interface GoogleRpcStatus {
    code?: number;
    details?: Record<string, unknown>[];
    message?: string;
}

// @public
export interface GoogleSearch {
}

// @public
export interface GoogleSearchRetrieval {
    dynamicRetrievalConfig?: DynamicRetrievalConfig;
}

// @public
export interface GoogleTypeDate {
    day?: number;
    month?: number;
    year?: number;
}

// @public
export interface GroundingChunk {
    retrievedContext?: GroundingChunkRetrievedContext;
    web?: GroundingChunkWeb;
}

// @public
export interface GroundingChunkRetrievedContext {
    text?: string;
    title?: string;
    uri?: string;
}

// @public
export interface GroundingChunkWeb {
    domain?: string;
    title?: string;
    uri?: string;
}

// @public
export interface GroundingMetadata {
    groundingChunks?: GroundingChunk[];
    groundingSupports?: GroundingSupport[];
    retrievalMetadata?: RetrievalMetadata;
    retrievalQueries?: string[];
    searchEntryPoint?: SearchEntryPoint;
    webSearchQueries?: string[];
}

// @public
export interface GroundingSupport {
    confidenceScores?: number[];
    groundingChunkIndices?: number[];
    segment?: Segment;
}

// @public
export enum HarmBlockMethod {
    // (undocumented)
    HARM_BLOCK_METHOD_UNSPECIFIED = "HARM_BLOCK_METHOD_UNSPECIFIED",
    // (undocumented)
    PROBABILITY = "PROBABILITY",
    // (undocumented)
    SEVERITY = "SEVERITY"
}

// @public
export enum HarmBlockThreshold {
    // (undocumented)
    BLOCK_LOW_AND_ABOVE = "BLOCK_LOW_AND_ABOVE",
    // (undocumented)
    BLOCK_MEDIUM_AND_ABOVE = "BLOCK_MEDIUM_AND_ABOVE",
    // (undocumented)
    BLOCK_NONE = "BLOCK_NONE",
    // (undocumented)
    BLOCK_ONLY_HIGH = "BLOCK_ONLY_HIGH",
    // (undocumented)
    HARM_BLOCK_THRESHOLD_UNSPECIFIED = "HARM_BLOCK_THRESHOLD_UNSPECIFIED",
    // (undocumented)
    OFF = "OFF"
}

// @public
export enum HarmCategory {
    // (undocumented)
    HARM_CATEGORY_CIVIC_INTEGRITY = "HARM_CATEGORY_CIVIC_INTEGRITY",
    // (undocumented)
    HARM_CATEGORY_DANGEROUS_CONTENT = "HARM_CATEGORY_DANGEROUS_CONTENT",
    // (undocumented)
    HARM_CATEGORY_HARASSMENT = "HARM_CATEGORY_HARASSMENT",
    // (undocumented)
    HARM_CATEGORY_HATE_SPEECH = "HARM_CATEGORY_HATE_SPEECH",
    // (undocumented)
    HARM_CATEGORY_SEXUALLY_EXPLICIT = "HARM_CATEGORY_SEXUALLY_EXPLICIT",
    // (undocumented)
    HARM_CATEGORY_UNSPECIFIED = "HARM_CATEGORY_UNSPECIFIED"
}

// @public
export enum HarmProbability {
    // (undocumented)
    HARM_PROBABILITY_UNSPECIFIED = "HARM_PROBABILITY_UNSPECIFIED",
    // (undocumented)
    HIGH = "HIGH",
    // (undocumented)
    LOW = "LOW",
    // (undocumented)
    MEDIUM = "MEDIUM",
    // (undocumented)
    NEGLIGIBLE = "NEGLIGIBLE"
}

// @public
export enum HarmSeverity {
    // (undocumented)
    HARM_SEVERITY_HIGH = "HARM_SEVERITY_HIGH",
    // (undocumented)
    HARM_SEVERITY_LOW = "HARM_SEVERITY_LOW",
    // (undocumented)
    HARM_SEVERITY_MEDIUM = "HARM_SEVERITY_MEDIUM",
    // (undocumented)
    HARM_SEVERITY_NEGLIGIBLE = "HARM_SEVERITY_NEGLIGIBLE",
    // (undocumented)
    HARM_SEVERITY_UNSPECIFIED = "HARM_SEVERITY_UNSPECIFIED"
}

// @public
export interface HttpOptions {
    apiVersion?: string;
    baseUrl?: string;
    headers?: Record<string, string>;
    timeout?: number;
}

// @public
export class HttpResponse {
    constructor(response: Response);
    headers?: Record<string, string>;
    // (undocumented)
    json(): Promise<unknown>;
    responseInternal: Response;
}

// @public
interface Image_2 {
    gcsUri?: string;
    imageBytes?: string;
    mimeType?: string;
}
export { Image_2 as Image }

// @public
export enum ImagePromptLanguage {
    // (undocumented)
    auto = "auto",
    // (undocumented)
    en = "en",
    // (undocumented)
    hi = "hi",
    // (undocumented)
    ja = "ja",
    // (undocumented)
    ko = "ko"
}

// @public
export enum JobState {
    // (undocumented)
    JOB_STATE_CANCELLED = "JOB_STATE_CANCELLED",
    // (undocumented)
    JOB_STATE_CANCELLING = "JOB_STATE_CANCELLING",
    // (undocumented)
    JOB_STATE_EXPIRED = "JOB_STATE_EXPIRED",
    // (undocumented)
    JOB_STATE_FAILED = "JOB_STATE_FAILED",
    // (undocumented)
    JOB_STATE_PARTIALLY_SUCCEEDED = "JOB_STATE_PARTIALLY_SUCCEEDED",
    // (undocumented)
    JOB_STATE_PAUSED = "JOB_STATE_PAUSED",
    // (undocumented)
    JOB_STATE_PENDING = "JOB_STATE_PENDING",
    // (undocumented)
    JOB_STATE_QUEUED = "JOB_STATE_QUEUED",
    // (undocumented)
    JOB_STATE_RUNNING = "JOB_STATE_RUNNING",
    // (undocumented)
    JOB_STATE_SUCCEEDED = "JOB_STATE_SUCCEEDED",
    // (undocumented)
    JOB_STATE_UNSPECIFIED = "JOB_STATE_UNSPECIFIED",
    // (undocumented)
    JOB_STATE_UPDATING = "JOB_STATE_UPDATING"
}

// @public
export enum Language {
    // (undocumented)
    LANGUAGE_UNSPECIFIED = "LANGUAGE_UNSPECIFIED",
    // (undocumented)
    PYTHON = "PYTHON"
}

// @public
export interface ListCachedContentsConfig {
    abortSignal?: AbortSignal;
    httpOptions?: HttpOptions;
    // (undocumented)
    pageSize?: number;
    // (undocumented)
    pageToken?: string;
}

// @public
export interface ListCachedContentsParameters {
    config?: ListCachedContentsConfig;
}

// @public (undocumented)
]]>