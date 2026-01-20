# DDR Governance Evaluation

Invite-only landing page for DDR governance testing applications.

## Overview

This is **not** a product launch or beta. It is a controlled evaluation channel for teams interested in testing governance discipline under real conditions.

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3002](http://localhost:3002)

## Features

- **Invite-Only Framing** — Clearly positions as governance testing, not feature beta
- **Gated Access Form** — Collects structured information to filter appropriate testers
- **SendGrid Integration** — Submissions sent to decisionloop@getdigdev.com
- **Structured Tasks** — Outlines exactly what testers will be asked to do
- **Guarantees** — No PII required, read-only observability, deterministic replay, sealed authority

## Environment Variables (Vercel)

Set these in your Vercel project settings:

```
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=contact@getdigdev.com
```

## Deployment

```bash
npm run build
vercel --prod
```

## Form Submissions

Submissions are sent via SendGrid to `decisionloop@getdigdev.com` with:
- Applicant info (name, email, company, role)
- Use case description
- Regulated industry flag
- Safety requirements
- Current governance challenges
