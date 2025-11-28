/**
 * @fileoverview This file is the entrypoint for all Genkit flow requests.
 */
'use strict';

import { genkit } from 'genkit';
import { googleAI } from '@genkit-ai/google-genai';
import { NextRequest } from 'next/server';
import { nextHandler } from '@genkit-ai/next';
import '@/ai/flows/compress-flow';

// IMPORTANT: This file must be named `route.ts` and be in an `app/api/genkit/[[...path]]` directory.
// You can change the `api/genkit` part of the path, but the `[[...path]]` part is required.

// Your Genkit project's configuration
const ai = genkit({
  plugins: [googleAI()],
  logLevel: 'debug',
  enableTracingAndMetrics: true,
});

// This is the main Next.js handler for Genkit requests.
export const POST = nextHandler();
