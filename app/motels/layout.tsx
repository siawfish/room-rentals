import PageLayout from '../components/PageLayout';
import '../globals.css';
import { Suspense } from 'react';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <PageLayout>
      <>
        <Suspense fallback="...">
          {children}
        </Suspense>
      </>
    </PageLayout>
  );
}
