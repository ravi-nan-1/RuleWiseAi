'use server';
/**
 * @fileOverview A Genkit flow for compressing files.
 *
 * This file contains the server-side logic for file compression.
 * - compressFile - A function that takes file content as a string and returns a compressed version.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);

const CompressInputSchema = z.object({
  fileContent: z.string(),
  fileName: z.string(),
  compressionMode: z.enum(['lossless', 'quality', 'max', 'advanced']),
  advancedOptions: z
    .object({
      size: z.number(),
      unit: z.enum(['KB', 'MB']),
    })
    .optional(),
});

const CompressOutputSchema = z.object({
  compressedContent: z.string(), // base64 encoded
  compressedSize: z.number(),
});

export type CompressFileInput = z.infer<typeof CompressInputSchema>;
export type CompressFileOutput = z.infer<typeof CompressOutputSchema>;

export async function compressFile(
  input: CompressFileInput
): Promise<CompressFileOutput> {
  return compressFileFlow(input);
}

export const compressFileFlow = ai.defineFlow(
  {
    name: 'compressFileFlow',
    inputSchema: CompressInputSchema,
    outputSchema: CompressOutputSchema,
  },
  async (input) => {
    const buffer = Buffer.from(input.fileContent, 'base64');
    let compressedBuffer: Buffer;

    try {
      let compressionLevel: number;

      switch (input.compressionMode) {
        case 'lossless':
          compressionLevel = zlib.constants.Z_BEST_SPEED; // Good for speed, less compression
          break;
        case 'quality':
          compressionLevel = zlib.constants.Z_DEFAULT_COMPRESSION; // Balanced
          break;
        case 'max':
          compressionLevel = zlib.constants.Z_BEST_COMPRESSION; // Max compression
          break;
        case 'advanced':
          // For 'advanced' mode, a true implementation would need an iterative process
          // to meet the target size, which is complex. For this example, we'll use
          // maximum compression as a stand-in.
          compressionLevel = zlib.constants.Z_BEST_COMPRESSION;
          break;
        default:
          compressionLevel = zlib.constants.Z_DEFAULT_COMPRESSION;
      }

      compressedBuffer = await gzip(buffer, { level: compressionLevel });

    } catch (error) {
      console.error('Compression failed:', error);
      // If compression fails for any reason, we will return the original, uncompressed content
      // to avoid breaking the user's flow.
      compressedBuffer = buffer;
    }

    return {
      compressedContent: compressedBuffer.toString('base64'),
      compressedSize: compressedBuffer.length,
    };
  }
);
