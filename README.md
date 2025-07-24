# Agentic Scan

Agentic Scan is a modern, web-based security scanning dashboard that leverages the power of Large Language Models (LLMs) to provide autonomous, intelligent network scanning and enumeration. It offers a user-friendly interface for launching scans, viewing results, and receiving AI-powered remediation advice, all wrapped in a sleek, themeable UI.

## ✨ Features

- **Dynamic Scan Dashboard**: An at-a-glance overview of your security posture, with dynamically generated stats from your scan history and a weekly scan activity chart.
- **Agentic New Scans**: Easily configure and launch new scans with robust form validation. The system is designed to allow an AI agent to interpret scan parameters and make intelligent decisions.
- **Detailed & Sortable Scan Reports**: Drill down into individual scan results to see an AI-generated summary and risk score. The results table is fully interactive, allowing you to sort by target, risk score, or date.
- **AI-Powered Analysis & Remediation**: Utilizes Genkit and Google's Gemini model to analyze raw scan data, generate a summary and risk score, and provide actionable remediation suggestions.
- **Scheduled Scans**: Automate your security assessments by scheduling recurring scans (UI only).
- **Responsive & Themed UI**: A clean, responsive interface built with ShadCN UI, Tailwind CSS, and Next.js, featuring both light and dark modes that follow a professional color palette.

## 🚀 Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (with App Router)
- **AI/LLM**: [Firebase Genkit](https://firebase.google.com/docs/genkit) with Google's Gemini models
- **UI Components**: [ShadCN UI](https://ui.shadcn.com/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) with a custom theme.
- **Fonts**: [Inter](https://fonts.google.com/specimen/Inter)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Form Management**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/) for robust validation.
- **Theming**: [next-themes](https://github.com/pacocoursey/next-themes) for easy dark/light mode toggling.

## Getting Started

The main application logic can be found in `src/app/agentic-scanning/`.

- **Main Page**: `src/app/agentic-scanning/page.tsx`
- **AI Flows**: Genkit flows are located in `src/ai/flows/`
- **Components**: Reusable React components are in `src/components/`
- **Styling**: Global styles and theme variables are in `src/app/globals.css`.

To start the development server:

```bash
npm run dev
```

This will run the Next.js application. You will also need to run the Genkit development server in a separate terminal to enable the AI features:

```bash
genkit start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
