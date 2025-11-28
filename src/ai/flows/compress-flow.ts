'use server';
/**
 * @fileOverview A Genkit flow for compressing generic files using zlib.
 *
 * This file contains the server-side logic for file compression.
 * - compressFile - A function that takes file content as a string and returns a compressed version.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import zlib from 'zlib';
import { promisify } from 'util';

const gzip = promisify(zlib.gzip);
const gunzip = promisify(zlib.unzip);

const CompressInputSchema = z.object({
  fileContent: z.string(), // base64 encoded
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

const compressFileFlow = ai.defineFlow(
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
           compressionLevel = zlib.constants.Z_BEST_COMPRESSION;
           break;
        default:
          compressionLevel = zlib.constants.Z_DEFAULT_COMPRESSION;
      }
      
      compressedBuffer = await gzip(buffer, { level: compressionLevel });

      if (input.compressionMode === 'advanced' && targetSize > 0 && compressedBuffer.length > targetSize) {
        message = `Could not compress file to under ${input.advancedOptions!.size} ${input.advancedOptions!.unit}. Best effort size: ${formatBytes(compressedBuffer.length)}.`;
        compressedBuffer = null; 
      } else if (compressedBuffer.length >= originalSize) {
        message = "Compression did not reduce file size for this file type. Original file retained.";
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

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}
