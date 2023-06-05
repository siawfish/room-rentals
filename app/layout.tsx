import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import Alert from './components/Alert';
import Nav from './components/nav';
import { Suspense } from 'react';

export const metadata = {
  title: 'Room Rentals',
  description: 'Optimize your short-term rental business with our user-friendly app, simplifying space management tasks.'
};

export default async function RootLayout({
  children,
  session
}: {
  children: React.ReactNode;
  session: any;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Providers session={session}>
          {/* @ts-expect-error Server Component */}
          <Nav />
          <Suspense fallback="...">
            {children}
          </Suspense>
        </Providers>
        <Alert />
        <Analytics />
      </body>
    </html>
  );
}
