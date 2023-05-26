import '../globals.css';

import { Analytics } from '@vercel/analytics/react';
import { Suspense } from 'react';
import Nav from './nav';
import Toast from './toast';

export const metadata = {
  title: 'Room Rentals - Motels',
  description: 'Optimize your short-term rental business with our user-friendly app, simplifying space management tasks.'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <Suspense fallback="...">
            {/* @ts-expect-error Server Component */}
            <Nav />
            {children}
            <Analytics />
        </Suspense>
        {/* <Toast /> */}
    </>
  );
}
