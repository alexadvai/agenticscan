'use client'

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { mockScheduledScans } from "@/lib/mock-data";
import { CalendarClock, PlusCircle, Edit, Trash2 } from "lucide-react";
import type { ScheduledScan } from "@/lib/types";
import { format } from 'date-fns';

export default function ScheduledScans() {
    const [schedules, setSchedules] = useState<ScheduledScan[]>(mockScheduledScans);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Scheduled Scans</h2>
                    <p className="text-muted-foreground">Manage your automated scanning schedules.</p>
                </div>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <PlusCircle className="mr-2 h-4 w-4" />
                            New Schedule
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Create New Schedule</DialogTitle>
                            <DialogDescription>
                                Set up a recurring scan for a target.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="target" className="text-right">Target</Label>
                                <Input id="target" placeholder="192.168.1.0/24" className="col-span-3" />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="frequency" className="text-right">Frequency</Label>
                                <Select>
                                    <SelectTrigger className="col-span-3">
                                        <SelectValue placeholder="Select frequency" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="daily">Daily</SelectItem>
                                        <SelectItem value="weekly">Weekly</SelectItem>
                                        <SelectItem value="monthly">Monthly</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit">Create Schedule</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
            
            {schedules.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {schedules.map((scan) => (
                        <Card key={scan.id}>
                            <CardHeader>
                                <div className="flex justify-between items-start">
                                    <div>
                                        <CardTitle className="truncate">{scan.target}</CardTitle>
                                        <CardDescription>{scan.scanType} Scan</CardDescription>
                                    </div>
                                    <Switch checked={scan.enabled} onCheckedChange={(checked) => {
                                        setSchedules(schedules.map(s => s.id === scan.id ? {...s, enabled: checked} : s))
                                    }}/>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="flex items-center text-sm text-muted-foreground">
                                    <CalendarClock className="mr-2 h-4 w-4" />
                                    <span>{scan.frequency}</span>
                                </div>
                                <p className="text-sm">Next run: {format(new Date(scan.nextRun), "PPP p")}</p>
                            </CardContent>
                            <CardFooter className="flex justify-end gap-2">
                                <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                                <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive"><Trash2 className="h-4 w-4" /></Button>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            ) : (
                 <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center h-[400px]">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-muted">
                        <CalendarClock className="h-10 w-10 text-muted-foreground" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">No scheduled scans</h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                        Create a schedule to automate your security scanning.
                    </p>
                    <Button className="mt-6">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        New Schedule
                    </Button>
                </div>
            )}
        </div>
    );
}
