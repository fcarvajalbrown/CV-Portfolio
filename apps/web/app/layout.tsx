import './globals.css';
import type { Metadata } from 'next';
import {
  SITE_URL,
  SITE_NAME,
  SITE_AUTHOR,
  SITE_ROLE,
  SITE_DESCRIPTION,
  SITE_IMAGE,
  absoluteUrl,
} from '@/lib/site';

const base = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_AUTHOR} — ${SITE_ROLE}`,
    template: `%s — ${SITE_AUTHOR}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_AUTHOR, url: 'https://github.com/Noothowl' }],
  creator: SITE_AUTHOR,
  keywords: [
    'Martín Jesús Chipoco',
    'Unreal Engine',
    'UE5',
    'gameplay programmer',
    'game developer',
    'C++',
    'portfolio',
    'CV',
  ],
  alternates: { canonical: absoluteUrl('/') },
  icons: { icon: `${base}/images/icon.png` },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_AUTHOR} — ${SITE_ROLE}`,
    description: SITE_DESCRIPTION,
    url: absoluteUrl('/'),
    images: [
      {
        url: absoluteUrl(SITE_IMAGE.path),
        width: SITE_IMAGE.width,
        height: SITE_IMAGE.height,
        alt: SITE_NAME,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <div
          id="bg-blur"
          style={{
            background: `
              url("${base}/images/bg.webp") center/cover no-repeat,
              radial-gradient(1200px 800px at 20% 10%, rgba(47,129,247,.15), transparent 60%),
              radial-gradient(1000px 700px at 80% 20%, rgba(40,200,120,.12), transparent 60%),
              radial-gradient(1200px 900px at 60% 90%, rgba(200,120,240,.10), transparent 60%)
            `,
          }}
        />
        <div id="root-col">
          <main className="main">
            <div className="container">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
