'use client'

import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { getRemediationSuggestionsAction } from '@/lib/actions';
import { Loader2, BrainCircuit } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';

export default function RemediationSuggestions({ scanFindings, target }: { scanFindings: string, target: string }) {
    const [suggestions, setSuggestions] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isPending, startTransition] = useTransition();

    const handleGetSuggestions = () => {
        setError(null);
        setSuggestions(null);
        startTransition(async () => {
            const result = await getRemediationSuggestionsAction(scanFindings, target);
            if (result.success) {
                setSuggestions(result.suggestions ?? 'No suggestions available.');
            } else {
                setError(result.error ?? 'An unknown error occurred.');
            }
        });
    };

    return (
        <Card>
            <CardHeader>
                <div className="flex justify-between items-center">
                    <div>
                        <CardTitle className="flex items-center"><BrainCircuit className="mr-2 h-5 w-5" />AI Remediation Advisor</CardTitle>
                        <CardDescription>Get AI-powered suggestions to mitigate findings.</CardDescription>
                    </div>
                     <Button onClick={handleGetSuggestions} disabled={isPending || !scanFindings}>
                        {isPending ? (
                            <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...</>
                        ) : (
                            <>Generate Suggestions</>
                        )}
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                {isPending && (
                     <div className="space-y-2 text-sm text-muted-foreground p-4 text-center">
                        <Loader2 className="mx-auto h-6 w-6 animate-spin" />
                        <p>Our security agent is analyzing the findings...</p>
                    </div>
                )}
                {error && (
                    <Alert variant="destructive">
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}
                {suggestions && (
                    <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/50 p-4 rounded-md whitespace-pre-wrap font-sans">
                       {suggestions}
                    </div>
                )}
                {!suggestions && !isPending && !error && (
                    <div className="text-center text-sm text-muted-foreground p-4 border-2 border-dashed rounded-lg">
                        Click "Generate Suggestions" to get started.
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
