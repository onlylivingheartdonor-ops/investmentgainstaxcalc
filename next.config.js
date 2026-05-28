/** @type {import('next').NextConfig} */
const nextConfig = {
  trailingSlash: false,
  
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'investmentgainstaxcalc.com' }],
        destination: 'https://www.investmentgainstaxcalc.com/:path*',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
