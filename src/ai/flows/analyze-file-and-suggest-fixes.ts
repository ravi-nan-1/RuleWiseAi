'use server';

/**
 * @fileOverview Analyzes a content file based on XML rules and suggests fixes.
 *
 * - analyzeFileAndSuggestFixes - A function that handles the analysis and suggestion process.
 * - AnalyzeFileAndSuggestFixesInput - The input type for the analyzeFileAndSuggestFixes function.
 * - AnalyzeFileAndSuggestFixesOutput - The return type for the analyzeFileAndSuggestFixes function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeFileAndSuggestFixesInputSchema = z.object({
  contentFile: z.string().describe('The content of the file to analyze.'),
  xmlRules: z.string().describe('The XML rules to use for analysis.'),
});
export type AnalyzeFileAndSuggestFixesInput = z.infer<
  typeof AnalyzeFileAndSuggestFixesInputSchema
>;

const AnalyzeFileAndSuggestFixesOutputSchema = z.object({
  analysis: z.string().describe('The analysis of the content file.'),
  suggestions: z.string().describe('The suggested fixes for the identified issues.'),
  report: z.string().describe('A report summarizing the analysis and suggestions.'),
});

export type AnalyzeFileAndSuggestFixesOutput = z.infer<
  typeof AnalyzeFileAndSuggestFixesOutputSchema
>;

export async function analyzeFileAndSuggestFixes(
  input: AnalyzeFileAndSuggestFixesInput
): Promise<AnalyzeFileAndSuggestFixesOutput> {
  return analyzeFileAndSuggestFixesFlow(input);
}

const analyzeFileAndSuggestFixesPrompt = ai.definePrompt({
  name: 'analyzeFileAndSuggestFixesPrompt',
  input: {schema: AnalyzeFileAndSuggestFixesInputSchema},
  output: {schema: AnalyzeFileAndSuggestFixesOutputSchema},
  prompt: `You are an AI expert in analyzing files based on XML rules.

  Analyze the following content file based on the provided XML rules.
  Identify any issues and suggest fixes.
  Generate a report summarizing the analysis and suggestions.

  Content File:
  {{contentFile}}

  XML Rules:
  {{xmlRules}}

  Analysis:
  {{analysis}}

  Suggestions:
  {{suggestions}}

  Report:
  {{report}}`,
});

const analyzeFileAndSuggestFixesFlow = ai.defineFlow(
  {
    name: 'analyzeFileAndSuggestFixesFlow',
    inputSchema: AnalyzeFileAndSuggestFixesInputSchema,
    outputSchema: AnalyzeFileAndSuggestFixesOutputSchema,
  },
  async input => {
    const {output} = await analyzeFileAndSuggestFixesPrompt(input);
    return output!;
  }
);
