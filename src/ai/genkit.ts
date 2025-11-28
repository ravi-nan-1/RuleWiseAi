/**
 * @fileoverview This file contains the Genkit plugin configuration.
 */
'use strict';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// Your Genkit project's configuration
export const ai = genkit({
  plugins: [
    googleAI(),
  ],
  // Flows are now auto-registered from their definition files.
  // No need to list them here.
  flows: [],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
