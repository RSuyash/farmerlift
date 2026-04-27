# FarmerLift Web

Next.js frontend for farmerlift.in with a headless WordPress CMS and GrowthOS lead-intake wiring.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## GrowthOS Lead Intake

Website forms post to the server route:

```text
POST /api/naya-lead
```

That route mirrors submissions into GrowthOS without exposing the connector secret in browser JavaScript.

Required production env vars:

```env
NAYA_GROWTH_INTAKE_URL=https://api.nayagrowth.com/api/landing/intake/src_8_R_3Dx_OHsWZg
NAYA_GROWTH_INTAKE_SECRET=<store-on-server-only>
NAYA_GROWTH_SOURCE_LABEL=farmerlift.in
```

The route currently supports:

- Contact enquiries from `/contact`
- Partner/dealer/farmer registrations from `/register`
- Future dealership or order forms that post the same shape with `formType`, `sourceCta`, and `businessData`

Registration submissions are still mirrored to WordPress at:

```text
https://admin.farmerlift.in/wp-json/farmerlift/v1/submit-registration
```

## Deployment Notes

The Docker compose service passes the GrowthOS env vars through to the Next.js server. Set them in the VPS environment or compose `.env` before rebuilding/restarting the container.

Never commit connector secrets, WhatsApp tokens, app secrets, or WordPress deploy keys.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
