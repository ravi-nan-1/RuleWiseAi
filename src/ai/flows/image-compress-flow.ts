'use server';
/**
 * @fileOverview A Genkit flow for compressing images using an AI model.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const CompressImageInputSchema = z.object({
  imageDataUri: z.string().describe("The image to compress, as a data URI."),
  compressionMode: z.enum(['lossless', 'quality', 'max', 'advanced']),
  advancedOptions: z
    .object({
      size: z.number(),
      unit: z.enum(['KB', 'MB']),
    })
    .optional(),
});

const CompressImageOutputSchema = z.object({
  compressedContent: z.string(), // base64 encoded
  compressedSize: z.number(),
  originalSize: z.number(),
  message: z.string().optional(),
});

export type CompressImageInput = z.infer<typeof CompressImageInputSchema>;
export type CompressImageOutput = z.infer<typeof CompressImageOutputSchema>;

export async function compressImage(
  input: CompressImageInput
): Promise<CompressImageOutput> {
  return imageCompressFlow(input);
}

// Helper to get a descriptive string for the compression mode
const getCompressionPrompt = (mode: CompressImageInput['compressionMode'], options: CompressImageInput['advancedOptions']) => {
    switch (mode) {
        case 'lossless':
            return 'using lossless compression to preserve all details.';
        case 'quality':
            return 'for high quality, suitable for web display. A good balance between size and quality.';
        case 'max':
            return 'aggressively to achieve the maximum possible size reduction, even if it sacrifices some quality.';
        case 'advanced':
            const target = options ? `${options.size} ${options.unit}` : 'the specified target size';
            return `to be as close as possible to, but not exceeding, a target size of ${target}.`;
        default:
            return 'for high quality.';
    }
}

const imageCompressFlow = ai.defineFlow(
  {
    name: 'imageCompressFlow',
    inputSchema: CompressImageInputSchema,
    outputSchema: CompressImageOutputSchema,
  },
  async (input) => {
    const originalBuffer = Buffer.from(input.imageDataUri.split(',')[1], 'base64');
    const originalSize = originalBuffer.length;

    const compressionPrompt = getCompressionPrompt(input.compressionMode, input.advancedOptions);

    try {
      const { media } = await ai.generate({
        model: 'googleai/gemini-pro-vision',
        prompt: [
          { text: `You are an expert image compression utility. Re-encode and compress this image ${compressionPrompt}. Return only the image file, with no other text or explanation.` },
          { media: { url: input.imageDataUri } },
        ],
      });

      if (!media || !media.url) {
        throw new Error('AI model did not return an image.');
      }
      
      const compressedBase64 = media.url.split(',')[1];
      const compressedBuffer = Buffer.from(compressedBase64, 'base64');
      const compressedSize = compressedBuffer.length;

      let message: string | undefined;
      if (compressedSize >= originalSize) {
        message = 'AI compression did not reduce file size. Original file retained.';
        return {
          compressedContent: originalBuffer.toString('base64'),
          compressedSize: originalSize,
          originalSize: originalSize,
          message,
        };
      }

      return {
        compressedContent: compressedBase64,
        compressedSize: compressedSize,
        originalSize: originalSize,
        message: `Successfully compressed with AI.`,
      };

    } catch (error) {
      console.error('AI Image Compression failed:', error);
      return {
        compressedContent: originalBuffer.toString('base64'),
        compressedSize: originalSize,
        originalSize: originalSize,
        message: 'An error occurred during AI compression. Original file retained.',
      };
    }
  }
);
