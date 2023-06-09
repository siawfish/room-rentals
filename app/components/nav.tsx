import { authOptions } from '../../pages/api/auth/[...nextauth]';
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession(authOptions);
  if(!session) return null;
  return <Navbar user={session?.user} />;
}
