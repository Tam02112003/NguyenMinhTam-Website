# Portfolio — Nguyễn Minh Tâm

Terminal-styled personal portfolio built with Next.js (App Router) + Tailwind CSS. Projects are pulled live from the GitHub API; the contact form sends real email via a Next.js Route Handler + Nodemailer.

## Development

```bash
npm install
npm run dev
```

## Environment variables

See [.env.example](.env.example) — required for the contact form to actually send email (Gmail SMTP + App Password).

## Deployment

Deployed as a Docker service (`portfolio`) alongside `medi247-ai-assistant` on the same VPS, reverse-proxied by the shared nginx at `portfolio.tamnguyen.asia`. See `.github/workflows/deploy.yml`.
