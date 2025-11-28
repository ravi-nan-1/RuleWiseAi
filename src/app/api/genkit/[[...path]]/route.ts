/**
 * @fileoverview This file is the entrypoint for all Genkit flow requests.
 */
'use strict';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { NextRequest } from 'next/server';
import { nextHandler } from '@genkit-ai/next';

// IMPORTANT: This file must be named `route.ts` and be in an `app/api/genkit/[[...path]]` directory.
// You can change the `api/genkit` part of the path, but the `[[...path]]` part is required.

// Your Genkit project's configuration
const ai = genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// Import your flows here. Make sure to reference the flow object so that it is
// registered with Genkit.
import { compressFileFlow } from '@/ai/flows/compress-flow';
const flows = [compressFileFlow];

// This is the main Next.js handler for Genkit requests.
export const POST = nextHandler({
  // Genkit requires a maximum body size to prevent malicious requests.
  maxBodySize: '10mb',
});
