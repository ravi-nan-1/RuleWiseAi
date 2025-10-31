'use server';
/**
 * @fileOverview This file defines a Genkit flow for chatting about file analysis results.
 *
 * - chatAboutFileAnalysis - A function that handles the chat about file analysis process.
 * - ChatAboutFileAnalysisInput - The input type for the chatAboutFileAnalysis function.
 * - ChatAboutFileAnalysisOutput - The return type for the chatAboutFileAnalysis function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ChatAboutFileAnalysisInputSchema = z.object({
  question: z.string().describe('The user question about the file analysis.'),
  analysisResult: z.string().describe('The analysis result from the file analysis.'),
  xmlRules: z.string().describe('The XML rules used for the file analysis.'),
  txtFileContent: z.string().describe('The content of the analyzed txt file.'),
});
export type ChatAboutFileAnalysisInput = z.infer<typeof ChatAboutFileAnalysisInputSchema>;

const ChatAboutFileAnalysisOutputSchema = z.object({
  answer: z.string().describe('The AI answer to the user question.'),
});
export type ChatAboutFileAnalysisOutput = z.infer<typeof ChatAboutFileAnalysisOutputSchema>;

export async function chatAboutFileAnalysis(input: ChatAboutFileAnalysisInput): Promise<ChatAboutFileAnalysisOutput> {
  return chatAboutFileAnalysisFlow(input);
}

const chatAboutFileAnalysisPrompt = ai.definePrompt({
  name: 'chatAboutFileAnalysisPrompt',
  input: {schema: ChatAboutFileAnalysisInputSchema},
  output: {schema: ChatAboutFileAnalysisOutputSchema},
  prompt: `You are an AI assistant that helps users understand file analysis results.

  You have access to the analysis result, the XML rules used for the analysis, and the content of the analyzed txt file.

  Use this information to answer the user's question about the analysis.

  Analysis Result: {{{analysisResult}}}
  XML Rules: {{{xmlRules}}}
  TXT File Content: {{{txtFileContent}}}
  Question: {{{question}}}`,
});

const chatAboutFileAnalysisFlow = ai.defineFlow(
  {
    name: 'chatAboutFileAnalysisFlow',
    inputSchema: ChatAboutFileAnalysisInputSchema,
    outputSchema: ChatAboutFileAnalysisOutputSchema,
  },
  async input => {
    const {output} = await chatAboutFileAnalysisPrompt(input);
    return output!;
  }
);

