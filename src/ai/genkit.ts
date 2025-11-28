/**
 * @fileoverview This file contains the Genkit plugin configuration.
 */
'use strict';

import { genkit, type Action } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Import flows
import { compressFileFlow } from './flows/compress-flow';

// Your Genkit project's configuration
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  flows: [compressFileFlow as Action<any, any>],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
