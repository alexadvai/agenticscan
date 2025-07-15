// src/ai/flows/suggest-remediation-flow.ts
'use server';

/**
 * @fileOverview An AI agent that suggests remediation actions based on scan results.
 *
 * - suggestRemediation - A function that handles the remediation suggestion process.
 * - SuggestRemediationInput - The input type for the suggestRemediation function.
 * - SuggestRemediationOutput - The return type for the suggestRemediation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestRemediationInputSchema = z.object({
  scanFindings: z
    .string()
    .describe('The findings from the security scan, including vulnerabilities and open ports.'),
  target: z.string().describe('The target IP, domain, or CIDR range of the scan.'),
});
export type SuggestRemediationInput = z.infer<typeof SuggestRemediationInputSchema>;

const SuggestRemediationOutputSchema = z.object({
  remediationSuggestions: z
    .string()
    .describe('A list of suggested remediation actions to mitigate the identified vulnerabilities.'),
});
export type SuggestRemediationOutput = z.infer<typeof SuggestRemediationOutputSchema>;

export async function suggestRemediation(input: SuggestRemediationInput): Promise<SuggestRemediationOutput> {
  return suggestRemediationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestRemediationPrompt',
  input: {schema: SuggestRemediationInputSchema},
  output: {schema: SuggestRemediationOutputSchema},
  prompt: `You are a security expert providing remediation suggestions based on security scan findings.

  Based on the scan findings for the target: {{target}}, provide a list of actionable remediation suggestions to address the identified vulnerabilities.

  Scan Findings:
  {{scanFindings}}`,
});

const suggestRemediationFlow = ai.defineFlow(
  {
    name: 'suggestRemediationFlow',
    inputSchema: SuggestRemediationInputSchema,
    outputSchema: SuggestRemediationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
