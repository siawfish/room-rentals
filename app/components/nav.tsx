import { authOptions } from '../api/auth/[...nextauth]/route';
import Navbar from './navbar';
import { getServerSession } from 'next-auth/next';

export default async function Nav() {
  const session = await getServerSession(authOptions);
  if(!session) return null;
  return <Navbar user={session?.user} />;
}
