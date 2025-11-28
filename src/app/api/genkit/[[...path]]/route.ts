/**
 * @fileoverview This file is the entrypoint for all Genkit flow requests.
 */
'use strict';

import { ai } from '@/ai/genkit';
import nextHandler from '@genkit-ai/next';

export const POST = nextHandler({ ai });
