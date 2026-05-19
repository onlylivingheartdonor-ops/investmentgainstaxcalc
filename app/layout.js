export const metadata = {
  title: "Capital Gains Tax Calculator | Estimate Investment Tax Owed",
  description: "Calculate short-term and long-term capital gains tax on stocks, crypto, and other investments. See your tax rate and net proceeds instantly.",

  alternates: {
    canonical: "https://www.investmentgainstaxcalc.com",
  },

  openGraph: {
    title: "Capital Gains Tax Calculator | Estimate Investment Tax Owed",
    description: "Calculate short-term and long-term capital gains tax on stocks, crypto, and other investments. See your tax rate and net proceeds instantly.",
    url: "https://www.investmentgainstaxcalc.com",
    siteName: "Moneywise Calculators",
    images: [
      {
        url: "https://www.investmentgainstaxcalc.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Capital Gains Tax Calculator",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Capital Gains Tax Calculator | Estimate Investment Tax Owed",
    description: "Calculate short-term and long-term capital gains tax on stocks, crypto, and other investments. See your tax rate and net proceeds instantly.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },

  authors: [{ name: "David Graham" }],
  creator: "MoneyWise Calculators",
  publisher: "MoneyWise Calculators",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3475627763908800"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>{children}</body>
    </html>
  );
}