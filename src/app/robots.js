const baseUrl = process.env.NEXT_PUBLIC_METADATA_BASE || 'https://www.rothibouw.nl';

export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
