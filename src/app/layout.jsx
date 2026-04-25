import PropTypes from 'prop-types';
import Script from 'next/script';

// @style
import './globals.css';

// @mui
import { AppRouterCacheProvider } from '@mui/material-nextjs/v14-appRouter';

// @third-party
import { SpeedInsights } from '@vercel/speed-insights/next';

// @project
import ProviderWrapper from './ProviderWrapper';

import { mainMetadata } from '@/metadata';

import { LocalBusinessJsonLd } from '@/components/LocalBusinessJsonLd';

// @types
const gaId = process.env.NEXT_PUBLIC_ANALYTICS_ID || '';

/***************************  METADATA - MAIN  ***************************/

export const metadata = { ...mainMetadata };

/***************************  LAYOUT - MAIN  ***************************/

// Root layout component that wraps the entire application
export default function RootLayout({ children }) {
  return (
    <html lang="nl">
      <head>
        {/* Google Search Console Verification */}
        <meta name="google-site-verification" content="acjwRHBwtFsjxogEE_qSqSJvZHKUz2XrUZ4IF-0aSLo" />

        {/* Preconnect and DNS Prefetch */}
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />

        {/* Sitemap reference for SEO */}
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />

        {/* Structured data for Google local search */}
        <LocalBusinessJsonLd />
      </head>
      <body suppressHydrationWarning>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ProviderWrapper>{children}</ProviderWrapper>
        </AppRouterCacheProvider>
        {gaId && <Script strategy="lazyOnload" src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} />}
        <SpeedInsights />
      </body>
    </html>
  );
}

RootLayout.propTypes = { children: PropTypes.any };
