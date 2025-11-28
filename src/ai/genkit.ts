/**
 * @fileoverview This file contains the Genkit plugin configuration.
 */
'use strict';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Import flows
import { compressFileFlow } from './flows/compress-flow';

// Your Genkit project's configuration
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  flows: [compressFileFlow],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
