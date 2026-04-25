/** @type {import('next').NextConfig} */
const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://vercel.live https://va.vercel-scripts.com;
    style-src 'self' 'unsafe-inline';
    img-src 'self' blob: data: https://www.googletagmanager.com https://flagcdn.com https://a.tile.openstreetmap.org https://b.tile.openstreetmap.org https://c.tile.openstreetmap.org;
    font-src 'self';
    object-src 'self';
    base-uri 'self';
    form-action 'self';
    frame-ancestors 'self';
    connect-src 'self' https://www.googletagmanager.com https://raw.githubusercontent.com;
`;

const nextConfig = {
  modularizeImports: {
    '@mui/material': {
      transform: '@mui/material/{{member}}'
    },
    '@mui/lab': {
      transform: '@mui/lab/{{member}}'
    }
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '**'
      }
    ]
  },
  async redirects() {
    return [
      // Route segment renames
      { source: '/over-ons', destination: '/about', permanent: true },
      { source: '/projecten', destination: '/projects', permanent: true },
      { source: '/projecten/:slug*', destination: '/projects/:slug*', permanent: true },
      // Service route + slug renames (old Dutch path → new English path)
      { source: '/diensten/ver-en-aanbouwen', destination: '/services/renovations', permanent: true },
      { source: '/diensten/dakwerken', destination: '/services/roofing', permanent: true },
      { source: '/diensten/timmerwerk', destination: '/services/carpentry', permanent: true },
      { source: '/diensten/verduurzaming', destination: '/services/sustainability', permanent: true },
      { source: '/diensten/hout-constructies', destination: '/services/wood-construction', permanent: true }
    ];
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader.replace(/\n/g, '')
          }
        ]
      }
    ];
  }
};

export default nextConfig;
