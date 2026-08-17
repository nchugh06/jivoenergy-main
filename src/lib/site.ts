export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jivoenergy.com'
).replace(/\/$/, '');

/** Set `NEXT_PUBLIC_SITE_ENV=production` on the main/live Vercel project only. */
export const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === 'production';
