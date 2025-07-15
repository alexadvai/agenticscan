import type { ScanResult, ScheduledScan } from './types';
import { add, formatISO } from 'date-fns';

const now = new Date();

export const mockScanResults: ScanResult[] = [
  {
    id: 'scan-01',
    target: '192.168.1.1',
    scanType: 'Full',
    agent: 'Agent-007',
    status: 'Completed',
    riskScore: 85,
    summary: 'Critical vulnerability (CVE-2023-1234) found on port 445.',
    createdAt: formatISO(add(now, { days: -1 })),
    findings: {
      raw: 'Nmap scan report for 192.168.1.1\nHost is up (0.0021s latency).\nNot shown: 996 closed tcp ports (reset)\nPORT STATE SERVICE\n22/tcp open ssh\n80/tcp open http\n443/tcp open https\n445/tcp open microsoft-ds\n... (and more)',
      openPorts: [
        { port: 22, service: 'SSH' },
        { port: 80, service: 'HTTP' },
        { port: 443, service: 'HTTPS' },
        { port: 445, service: 'SMB' },
      ],
      osGuess: 'Linux 5.4',
      vulnerabilities: [
        { cve: 'CVE-2023-1234', severity: 'Critical', description: 'Remote code execution vulnerability in SMBv1.' },
        { cve: 'CVE-2023-5678', severity: 'Medium', description: 'Outdated OpenSSH version with known weaknesses.' },
      ],
    },
  },
  {
    id: 'scan-02',
    target: 'example.com',
    scanType: 'Quick',
    agent: 'Agent-003',
    status: 'Completed',
    riskScore: 45,
    summary: 'Outdated web server detected.',
    createdAt: formatISO(add(now, { days: -2, hours: -4 })),
    findings: {
      raw: 'Nmap scan report for example.com (93.184.216.34)\nHost is up (0.015s latency).\nNot shown: 998 closed tcp ports (conn-refused)\nPORT STATE SERVICE\n80/tcp open http\n443/tcp open https\n...',
      openPorts: [
        { port: 80, service: 'HTTP' },
        { port: 443, service: 'HTTPS' },
      ],
      osGuess: 'Linux 4.15',
      vulnerabilities: [
        { cve: 'CVE-2022-8910', severity: 'Medium', description: 'Apache httpd 2.4.52 is outdated.' },
      ],
    },
  },
  {
    id: 'scan-03',
    target: '10.0.0.5',
    scanType: 'Stealth',
    agent: 'Agent-007',
    status: 'Running',
    riskScore: 0,
    summary: 'Scan in progress...',
    createdAt: formatISO(now),
    findings: {
      raw: '',
      openPorts: [],
      osGuess: '',
      vulnerabilities: [],
    },
  },
  {
    id: 'scan-04',
    target: 'test-server.local',
    scanType: 'Custom',
    agent: 'Agent-005',
    status: 'Pending',
    riskScore: 0,
    summary: 'Scan is queued.',
    createdAt: formatISO(add(now, { minutes: -15 })),
    findings: {
      raw: '',
      openPorts: [],
      osGuess: '',
      vulnerabilities: [],
    },
  },
    {
    id: 'scan-05',
    target: '172.16.0.10',
    scanType: 'Full',
    agent: 'Agent-003',
    status: 'Error',
    riskScore: 0,
    summary: 'Host unreachable.',
    createdAt: formatISO(add(now, { days: -3 })),
    findings: {
      raw: 'Starting Nmap 7.94 ( https://nmap.org ) at 2023-10-23 14:30 UTC\nNote: Host seems down. If it is really up, but blocking our ping probes, try -Pn\nNmap done: 1 IP address (0 hosts up) scanned in 3.05 seconds',
      openPorts: [],
      osGuess: 'N/A',
      vulnerabilities: [],
    },
  },
];

export const mockScheduledScans: ScheduledScan[] = [
  {
    id: 'sched-01',
    target: '10.0.0.0/24',
    scanType: 'Quick',
    frequency: 'Weekly',
    nextRun: formatISO(add(now, { weeks: 1, days: -2 })),
    enabled: true,
  },
  {
    id: 'sched-02',
    target: 'corp-assets.com',
    scanType: 'Full',
    frequency: 'Monthly',
    nextRun: formatISO(add(now, { months: 1, days: -10 })),
    enabled: true,
  },
  {
    id: 'sched-03',
    target: 'dmz.internal.net',
    scanType: 'Stealth',
    frequency: 'Daily',
    nextRun: formatISO(add(now, { days: 1 })),
    enabled: false,
  },
];
