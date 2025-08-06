
'use client';

import { useEffect } from 'react';
import { useActionState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

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
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';

const newScanSchema = z.object({
  target: z.string().min(1, { message: "Target is required." }),
  mode: z.enum(["quick", "full", "stealth", "custom"]),
  scanTypes: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one scan type.",
  }),
  credentials: z.string().optional(),
});

type NewScanFormValues = z.infer<typeof newScanSchema>;

const initialState = {
  success: false,
  message: '',
};

export default function NewScan() {
  const [state, formAction] = useActionState(startNewScan, initialState);
  const { toast } = useToast();

  const form = useForm<NewScanFormValues>({
    resolver: zodResolver(newScanSchema),
    defaultValues: {
      target: "",
      mode: "quick",
      scanTypes: ["port", "os"],
      credentials: "",
    },
  });

  useEffect(() => {
    if (state.message) {
      toast({
        title: state.success ? 'Success' : 'Error',
        description: state.message,
        variant: state.success ? 'default' : 'destructive',
      });
      if (state.success) {
        form.reset();
      }
    }
  }, [state, toast, form]);

  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Launch a New Scan</CardTitle>
        <CardDescription>Configure and initiate a new scan with an LLM-enhanced agent.</CardDescription>
      </CardHeader>
      <Form {...form}>
        <form action={formAction} className="space-y-6">
          <CardContent className="space-y-6">
            <FormField
              control={form.control}
              name="target"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Target</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter IP, domain, or CIDR range" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="mode"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Scan Mode</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex space-x-4"
                    >
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="quick" id="quick" /></FormControl>
                        <FormLabel htmlFor="quick" className="font-normal">Quick</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="full" id="full" /></FormControl>
                        <FormLabel htmlFor="full" className="font-normal">Full</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="stealth" id="stealth" /></FormControl>
                        <FormLabel htmlFor="stealth" className="font-normal">Stealth</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-2">
                        <FormControl><RadioGroupItem value="custom" id="custom" /></FormControl>
                        <FormLabel htmlFor="custom" className="font-normal">Custom</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="scanTypes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel>Scan Types</FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                  {[
                    { id: 'port', label: 'Port Scan' },
                    { id: 'os', label: 'OS Detection' },
                    { id: 'service', label: 'Service Enumeration' },
                    { id: 'script', label: 'Script Execution' },
                  ].map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="scanTypes"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        field.value?.filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="credentials"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Credentials (Optional)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Provide credentials for authenticated scans, e.g., user:pass@ssh" rows={3} {...field}/>
                  </FormControl>
                  <FormDescription>
                    Credentials for authenticated scans, if applicable.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
             <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Zap className="mr-2 h-4 w-4" />}
                Start Agentic Scan
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
}
