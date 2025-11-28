/**
 * @fileoverview This file contains the Genkit plugin configuration.
 */
'use strict';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';

// IMPORTANT: This file must be named `route.ts` and be in an `app/api/genkit/[[...path]]` directory.
// You can change the `api/genkit` part of the path, but the `[[...path]]` part is required.

// Your Genkit project's configuration
export const ai = genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});
