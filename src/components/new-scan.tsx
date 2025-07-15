'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { useToast } from "@/hooks/use-toast";
import { startNewScan } from '@/lib/actions';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Loader2, Zap } from 'lucide-react';
import { Textarea } from './ui/textarea';

const initialState = {
  success: false,
  message: '',
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
      Start Agentic Scan
    </Button>
  );
}

export default function NewScan() {
  const [state, formAction] = useActionState(startNewScan, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
    }
  }, [state, toast]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Launch a New Scan</CardTitle>
        <CardDescription>Configure and initiate a new scan with an LLM-enhanced agent.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="target">Target</Label>
            <Input id="target" name="target" placeholder="Enter IP, domain, or CIDR range" required />
          </div>
          <div className="space-y-2">
            <Label>Scan Mode</Label>
            <RadioGroup defaultValue="quick" name="mode" className="flex space-x-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="quick" id="quick" />
                <Label htmlFor="quick">Quick</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="full" id="full" />
                <Label htmlFor="full">Full</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="stealth" id="stealth" />
                <Label htmlFor="stealth">Stealth</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="custom" id="custom" />
                <Label htmlFor="custom">Custom</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label>Scan Types</Label>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <Checkbox id="port-scan" name="scan-type" value="port" defaultChecked />
                <Label htmlFor="port-scan">Port Scan</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="os-detection" name="scan-type" value="os" defaultChecked />
                <Label htmlFor="os-detection">OS Detection</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="service-enum" name="scan-type" value="service" />
                <Label htmlFor="service-enum">Service Enumeration</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="script-exec" name="scan-type" value="script" />
                <Label htmlFor="script-exec">Script Execution</Label>
              </div>
            </div>
          </div>
           <div className="space-y-2">
            <Label htmlFor="credentials">Credentials (Optional)</Label>
            <Textarea id="credentials" name="credentials" placeholder="Provide credentials for authenticated scans, e.g., user:pass@ssh" rows={3}/>
          </div>
        </CardContent>
        <CardFooter>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
