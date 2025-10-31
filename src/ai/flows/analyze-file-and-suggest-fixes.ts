'use server';

/**
 * @fileOverview Analyzes a content file based on XML rules and suggests fixes by calling an external API.
 *
 * - analyzeFileAndSuggestFixes - A function that handles the analysis and suggestion process.
 * - AnalyzeFileAndSuggestFixesInput - The input type for the analyzeFileAndSuggestFixes function.
 * - AnalyzeFileAndSuggestFixesOutput - The return type for the analyzeFileAndSuggestFixes function.
 */

import { z } from 'zod';

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

const EXTERNAL_API_URL = 'https://algotrading-1-dluo.onrender.com/analyze';

export async function analyzeFileAndSuggestFixes(
  input: AnalyzeFileAndSuggestFixesInput
): Promise<AnalyzeFileAndSuggestFixesOutput> {
  try {
    const response = await fetch(EXTERNAL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        xml_rules: input.xmlRules,
        txt_content: input.contentFile,
      }),
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const result = await response.json();
    
    // Assuming the API returns a structure that can be mapped to our output schema.
    // We may need to adjust this mapping based on the actual API response.
    const output: AnalyzeFileAndSuggestFixesOutput = {
      analysis: result.analysis || 'No analysis provided.',
      suggestions: result.suggestions || 'No suggestions provided.',
      report: result.report || `Analysis Report:\n\nAnalysis:\n${result.analysis}\n\nSuggestions:\n${result.suggestions}`,
    };

    return AnalyzeFileAndSuggestFixesOutputSchema.parse(output);

  } catch (error) {
    console.error("Error calling external analysis API:", error);
    throw new Error("Failed to analyze files using the external service.");
  }
}
