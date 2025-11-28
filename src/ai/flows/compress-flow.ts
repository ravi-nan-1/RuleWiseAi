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
  originalSize: z.number(),
  message: z.string().optional(),
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
    const originalSize = buffer.length;
    let compressedBuffer: Buffer | null = null;
    let message: string | undefined = undefined;

    try {
      let compressionLevel: number;
      const targetSize = input.advancedOptions ? input.advancedOptions.size * (input.advancedOptions.unit === 'MB' ? 1024 * 1024 : 1024) : 0;

      switch (input.compressionMode) {
        case 'lossless':
          compressionLevel = zlib.constants.Z_BEST_SPEED;
          break;
        case 'quality':
          compressionLevel = zlib.constants.Z_DEFAULT_COMPRESSION;
          break;
        case 'max':
          compressionLevel = zlib.constants.Z_BEST_COMPRESSION;
          break;
        case 'advanced':
           // Use max compression for advanced, then check if target is met.
           compressionLevel = zlib.constants.Z_BEST_COMPRESSION;
           break;
        default:
          compressionLevel = zlib.constants.Z_DEFAULT_COMPRESSION;
      }
      
      compressedBuffer = await gzip(buffer, { level: compressionLevel });

      if (input.compressionMode === 'advanced' && compressedBuffer.length > targetSize) {
        // If advanced mode fails to meet the target, revert and send a message.
        message = `Could not compress file to under ${input.advancedOptions!.size} ${input.advancedOptions!.unit}. Best effort size: ${compressedBuffer.length} bytes.`;
        compressedBuffer = null; // Revert to original
      } else if (compressedBuffer.length >= originalSize) {
        // If compression doesn't help, revert and send a message.
        message = "Compression did not reduce file size. Original file retained.";
        compressedBuffer = null;
      }

    } catch (error) {
      console.error('Compression failed:', error);
      message = "An error occurred during compression. Original file retained.";
      compressedBuffer = null;
    }

    const finalBuffer = compressedBuffer || buffer;

    return {
      compressedContent: finalBuffer.toString('base64'),
      compressedSize: finalBuffer.length,
      originalSize: originalSize,
      message: message,
    };
  }
);