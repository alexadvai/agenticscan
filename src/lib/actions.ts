'use server'

import { suggestRemediation } from "@/ai/flows/suggest-remediation-flow";
import { revalidatePath } from "next/cache";

// Simulate a database write and job queueing
export async function startNewScan(prevState: any, formData: FormData) {
  const target = formData.get('target') as string;
  
  if (!target) {
    return { success: false, message: 'Target is required.' };
  }
  
  console.log("Starting new scan with data:", Object.fromEntries(formData.entries()));
  
  // Simulate async job processing
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, you would add the scan to a DB and a queue.
  // The status would be updated by a backend agent.
  
  revalidatePath('/agentic-scanning');

  return { success: true, message: `Scan successfully initiated for target: ${target}` };
}

export async function getRemediationSuggestionsAction(scanFindings: string, target: string) {
    if (!scanFindings || !target) {
        return { success: false, error: "Invalid input provided for remediation." };
    }
    try {
        const result = await suggestRemediation({ scanFindings, target });
        return { success: true, suggestions: result.remediationSuggestions };
    } catch (error) {
        console.error("Error getting remediation suggestions:", error);
        return { success: false, error: "An unexpected error occurred while generating remediation suggestions." };
    }
}
