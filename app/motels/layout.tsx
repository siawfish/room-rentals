'use client';

import PageLayout from '../components/PageLayout';
import '../globals.css';
import { Suspense } from 'react';
import { usePathname } from 'next/navigation';
import { convertFromPluralToSingular } from '../utils/helpers';

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <PageLayout
      btnLabel={convertFromPluralToSingular(pathname?.split('/')?.pop()??"")}
      btnLink={window?.location?.href + "/form"}
      caption={`View and manage ${pathname?.split('/')?.pop()??""}`}
      searchPlaceholder={`Search ${pathname?.split('/')?.pop()??""}`}
      title={pathname?.split('/').pop()??""}
    >
      <>
        <Suspense fallback="...">
          {children}
        </Suspense>
      </>
    </PageLayout>
  );
}
