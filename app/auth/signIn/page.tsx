import Image from 'next/image';
import LoginForm from '../../components/forms/LoginForm';
import { getServerSession } from "next-auth/next"
import { redirect } from 'next/navigation';
import logoImage from '../../../public/assets/images/logo.jpeg';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';

export const dynamic = 'force-dynamic';

export default async function IndexPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/motels');
  }

  return (
    <main className="p-4 md:p-10 mx-auto max-w-7xl">
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <Image className="mx-auto h-10 w-auto rounded-full" width={100} height={100} src={logoImage} alt="Your Company" />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
