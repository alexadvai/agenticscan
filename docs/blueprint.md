# **App Name**: Agentic Scan

## Core Features:

- Dashboard UI: UI page at /agentic-scanning with sections for Scan Dashboard, New Scan, Scan Results, and Scheduled Scans.
- Scan Input Form: Form in 'New Scan' section takes target IP/domain/CIDR, scan mode, scan types, pre-scan filters, and credentials.
- Agentic Scan Submission: Submit form to queue an agentic scan using a security agent to orchestrate.
- Scan Results Table: Scan Results view with sortable columns for Target, Scan Type, Agent, Status, Risk Score, and Findings Summary. Also each result links to detail view with open ports, services, OS guess, vulnerabilities, timestamps.
- Scan Scheduling: Ability to create, edit, and schedule scans (daily/weekly/monthly) in the 'Scheduled Scans' section. Task can run without user intervention.
- Scan Notifications: Toast notifications displayed upon scan start, completion, or error. A scan may be configured for email/slack.
- AI Remediation Suggestions: LLM powered tool provides auto-suggested remediation actions based on scan findings.

## Style Guidelines:

- Primary color: Saturated blue (#4285F4) to convey trust and security. The hue suggests safety and technological prowess.
- Background color: Light, desaturated blue (#E3F2FD) creates a clean and professional backdrop.
- Accent color: A vibrant yellow-orange (#FFB300) is used for calls to action, providing a contrasting highlight to the calm blue palette.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern look, will be used for both headlines and body text.
- Modern and flat icons to represent scan types, status, and risk levels.
- Clean, card-based layout for scan results and schedules.
- Subtle transition animations to enhance user experience.