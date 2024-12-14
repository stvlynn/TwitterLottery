import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Twitter Lottery - Draw Winners from Twitter/X Post Replies',
  description: 'A free tool to randomly select winners from Twitter/X post replies. Perfect for giveaways, contests, and social media campaigns.',
  keywords: 'twitter lottery, twitter giveaway, twitter contest, random picker, twitter winner selector',
  authors: [{ name: 'stv_lynn', url: 'https://twitter.com/stv_lynn' }],
  creator: 'stv_lynn',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.png',
    apple: '/favicon.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/favicon.png',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'Twitter Lottery - Draw Winners from Twitter/X Post Replies',
    description: 'A free tool to randomly select winners from Twitter/X post replies. Perfect for giveaways, contests, and social media campaigns.',
    siteName: 'Twitter Lottery',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: 'Twitter Lottery Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Twitter Lottery - Draw Winners from Twitter/X Post Replies',
    description: 'A free tool to randomly select winners from Twitter/X post replies. Perfect for giveaways, contests, and social media campaigns.',
    creator: '@stv_lynn',
    images: [`${process.env.NEXT_PUBLIC_SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="canonical" href={process.env.NEXT_PUBLIC_SITE_URL} />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <link rel="apple-touch-icon-precomposed" href="/favicon.png" />
      </head>
      <body className={inter.className} suppressHydrationWarning>
        {children}
        <Toaster />
      </body>
    </html>
  );
}