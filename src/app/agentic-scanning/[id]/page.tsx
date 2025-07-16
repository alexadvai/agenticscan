import { mockScanResults } from '@/lib/mock-data';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ArrowLeft, ShieldAlert, Terminal, ListChecks, Server, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { ScanStatus, Vulnerability } from '@/lib/types';
import RemediationSuggestions from '@/components/remediation-suggestions';
import { format } from 'date-fns';
import { PageHeader } from '@/components/page-header';
import { summarizeScan } from '@/ai/flows/scan-summary';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const statusStyles: Record<ScanStatus, string> = {
    Completed: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300 border-green-300',
    Pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-300 border-yellow-300',
    Running: 'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300 border-blue-300',
    Error: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300 border-red-300',
};

const severityStyles: Record<Vulnerability['severity'], string> = {
    Critical: 'bg-red-500/20 text-red-500 border-red-500/50',
    High: 'bg-orange-500/20 text-orange-500 border-orange-500/50',
    Medium: 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50',
    Low: 'bg-blue-500/20 text-blue-500 border-blue-500/50',
    Informational: 'bg-gray-500/20 text-gray-500 border-gray-500/50',
};

export default async function ScanResultDetailPage({ params }: { params: { id: string } }) {
    const result = mockScanResults.find(r => r.id === params.id);

    if (!result) {
        notFound();
    }
    
    // Generate summary dynamically if there's raw data
    let summaryData;
    if (result.findings.raw) {
        try {
            summaryData = await summarizeScan({ scanFindings: result.findings.raw });
        } catch (error) {
            console.error("Failed to generate scan summary:", error);
            // Fallback or error handling
            summaryData = { riskScore: -1, keyFindings: 'Could not generate summary.' };
        }
    } else {
        summaryData = { riskScore: result.riskScore, keyFindings: result.summary };
    }


    return (
        <div className="space-y-6">
             <Link href="/agentic-scanning/results" className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Scan Results
            </Link>

            <PageHeader
                title={`Scan Report: ${result.target}`}
                description={`${result.scanType} scan performed by ${result.agent} on ${format(new Date(result.createdAt), "PPP p")}`}
            />

            <div className="grid gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><ListChecks className="mr-2 h-5 w-5" />Scan Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="grid gap-4 md:grid-cols-2 text-sm">
                            <div><strong>Target:</strong> {result.target}</div>
                            <div><strong>Status:</strong> <Badge variant="outline" className={cn(statusStyles[result.status])}>{result.status}</Badge></div>
                             {summaryData.riskScore >= 0 ? (
                                <>
                                    <div><strong>Risk Score:</strong> <span className="font-bold">{summaryData.riskScore}</span></div>
                                    <div><strong>OS Guess:</strong> {result.findings.osGuess}</div>
                                    <div className="md:col-span-2"><strong>Key Findings:</strong> {summaryData.keyFindings}</div>
                                </>
                            ) : (
                                <div className="md:col-span-2">
                                     <Alert variant="destructive">
                                        <AlertCircle className="h-4 w-4" />
                                        <AlertTitle>Analysis Failed</AlertTitle>
                                        <AlertDescription>
                                           The AI agent could not analyze the scan results. The original summary is shown below.
                                            <p className="mt-2"><strong>Original Summary:</strong> {result.summary}</p>
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    <RemediationSuggestions scanFindings={result.findings.raw} target={result.target} />

                </div>
                <div className="lg:col-span-1 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><ShieldAlert className="mr-2 h-5 w-5" />Vulnerabilities</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>CVE</TableHead>
                                        <TableHead>Severity</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.findings.vulnerabilities.length > 0 ? result.findings.vulnerabilities.map(vuln => (
                                        <TableRow key={vuln.cve}>
                                            <TableCell className="font-mono text-xs">{vuln.cve}</TableCell>
                                            <TableCell><Badge variant="outline" className={cn(severityStyles[vuln.severity])}>{vuln.severity}</Badge></TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={2} className="text-center">No vulnerabilities found</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center"><Server className="mr-2 h-5 w-5" />Open Ports</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Port</TableHead>
                                        <TableHead>Service</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {result.findings.openPorts.length > 0 ? result.findings.openPorts.map(port => (
                                        <TableRow key={port.port}>
                                            <TableCell>{port.port}</TableCell>
                                            <TableCell>{port.service}</TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow><TableCell colSpan={2} className="text-center">No open ports found</TableCell></TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center"><Terminal className="mr-2 h-5 w-5" />Raw Scan Output</CardTitle>
                </CardHeader>
                <CardContent>
                    <pre className="bg-muted p-4 rounded-md text-xs overflow-x-auto">
                        <code>{result.findings.raw || 'No raw output available.'}</code>
                    </pre>
                </CardContent>
            </Card>

        </div>
    );
}
