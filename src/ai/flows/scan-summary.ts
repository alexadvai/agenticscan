'use server';

/**
 * @fileOverview Summarizes scan findings and provides a risk score.
 *
 * - summarizeScan - A function that summarizes scan findings and provides a risk score.
 * - SummarizeScanInput - The input type for the summarizeScan function.
 * - SummarizeScanOutput - The return type for the summarizeScan function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeScanInputSchema = z.object({
  scanFindings: z
    .string()
    .describe("The full scan findings, including open ports, services, OS guess, vulnerabilities, and timestamps."),
});
export type SummarizeScanInput = z.infer<typeof SummarizeScanInputSchema>;

const SummarizeScanOutputSchema = z.object({
  riskScore: z.number().describe('A numerical risk score from 0 to 100, with higher scores indicating greater risk.'),
  keyFindings: z.string().describe('A summary of the most important scan findings.'),
});
export type SummarizeScanOutput = z.infer<typeof SummarizeScanOutputSchema>;

export async function summarizeScan(input: SummarizeScanInput): Promise<SummarizeScanOutput> {
  return summarizeScanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'summarizeScanPrompt',
  input: {schema: SummarizeScanInputSchema},
  output: {schema: SummarizeScanOutputSchema},
  prompt: `You are a security analyst summarizing scan findings and providing a risk score.

  Based on the scan findings below, provide a risk score from 0 to 100 and summarize the key findings.

  Scan Findings:
  {{scanFindings}}

  Risk Score (0-100): (Provide only the number, no words)
  Key Findings: `,
});

const summarizeScanFlow = ai.defineFlow(
  {
    name: 'summarizeScanFlow',
    inputSchema: SummarizeScanInputSchema,
    outputSchema: SummarizeScanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
