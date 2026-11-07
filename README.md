# Satyam Sah — Portfolio

Built with Next.js (App Router), React, TypeScript, Tailwind CSS and Framer Motion.

## Development

```sh
npm install
npm run dev
```

## Production

```sh
npm run build
npm start
```

## Contact form

`POST /api/send-mail` sends mail through SMTP. Create a `.env` file in the project root and set these values from your email provider:

```
SMTP_HOST=your-provider-smtp-host
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-smtp-password-or-app-password
```

Port `587` uses STARTTLS; port `465` uses SSL/TLS. Add the same variables to your hosting provider's environment settings and restart/redeploy the app. Without valid SMTP settings, email delivery is unavailable, but the contact form still opens a prefilled WhatsApp message.
