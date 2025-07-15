# Agentic Scan

Agentic Scan is a modern, web-based security scanning dashboard that leverages the power of Large Language Models (LLMs) to provide autonomous, intelligent network scanning and enumeration. It offers a user-friendly interface for launching scans, viewing results, and receiving AI-powered remediation advice.

## ✨ Features

- **Scan Dashboard**: An at-a-glance overview of your security posture, including key metrics and weekly scan activity.
- **New Scans**: Easily configure and launch new scans with various options like scan mode (Quick, Full, Stealth), scan types (Port Scan, OS Detection), and credentials for authenticated scans.
- **Detailed Scan Reports**: Drill down into individual scan results to see a summary, risk score, open ports, detected vulnerabilities, and the raw scan output.
- **AI Remediation Advisor**: Utilizes Genkit and Google's Gemini model to analyze scan findings and provide actionable remediation suggestions.
- **Scheduled Scans**: Automate your security assessments by scheduling recurring scans.
- **Responsive Design**: A clean, responsive interface built with ShadCN UI and Tailwind CSS that works seamlessly across devices.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/LLM**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)

## Getting Started

The main application logic can be found in `src/app/agentic-scanning/`.

- **Main Page**: `src/app/agentic-scanning/page.tsx`
- **AI Flows**: Genkit flows are located in `src/ai/flows/`
- **Components**: Reusable React components are in `src/components/`

To start the development server:

```bash
npm run dev
```

This will run the Next.js application. You will also need to run the Genkit development server in a separate terminal to enable the AI features:

```bash
npm run genkit:dev
```
