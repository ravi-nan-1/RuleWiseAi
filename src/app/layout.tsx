import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { Analytics } from "@vercel/analytics/react"

const meta = {
  title: 'Universal File Compressor – Best Online File Compression Tool (Free & Lossless)',
  description: 'Compress images, PDFs, documents, ZIP files, and more without losing quality. Fast, free, secure online file compressor for all file formats.',
  url: 'https://imagecompressor-beta.vercel.app/',
}

export const metadata: Metadata = {
  title: meta.title,
  description: meta.description,
  robots: 'index, follow',
  alternates: {
    canonical: meta.url,
  },
  openGraph: {
    title: 'Universal File Compressor – Free Online File Compressor',
    description: 'Compress images, PDFs, ZIP files, documents & more. 100% free, fast, and secure.',
    type: 'website',
    url: meta.url,
    siteName: 'Universal File Compressor',
    images: [
      {
        url: `${meta.url}og-image.png`,
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Universal File Compressor – Free Online File Compression',
    description: 'Compress any file online — images, PDFs, ZIPs & more.',
    images: [`${meta.url}og-image.png`],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Universal File Compressor',
    applicationCategory: 'Utilities',
    operatingSystem: 'Any',
    description: 'Compress images, PDFs, documents, ZIP files, and more without losing quality.',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '1250',
    },
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="sitemap" type="application/xml" href="https://imagecompressor-beta.vercel.app/sitemap.xml" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Source+Code+Pro:wght@400;500&family=Space+Grotesk:wght@500;700&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={cn('font-body antialiased bg-background')}>
        {children}
        <Analytics />
        <Toaster />
      </body>
    </html>
  );
}
