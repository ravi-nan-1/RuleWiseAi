/**
 * @fileoverview This file contains the Genkit plugin configuration.
 */
'use strict';

import { genkit, type Action } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Import flows
import { compressFileFlow } from './flows/compress-flow';

// IMPORTANT: This file must be named `route.ts` and be in an `app/api/genkit/[[...path]]` directory.
// You can change the `api/genkit` part of the path, but the `[[...path]]` part is required.

// Your Genkit project's configuration
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  flows: [compressFileFlow as Action<any, any>],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
