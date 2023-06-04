import './globals.css';
import { Analytics } from '@vercel/analytics/react';
import Providers from './providers';
import Alert from './components/Alert';
import Nav from './components/nav';

export const metadata = {
  title: 'Room Rentals',
  description: 'Optimize your short-term rental business with our user-friendly app, simplifying space management tasks.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-gray-50">
      <body className="h-full">
        <Providers>
          {/* @ts-expect-error Server Component */}
          <Nav />
          <main>
            {children}
          </main>
        </Providers>
        <Alert />
        <Analytics />
      </body>
    </html>
  );
}
