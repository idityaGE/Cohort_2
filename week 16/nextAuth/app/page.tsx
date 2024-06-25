import Appbar from '@/components/Appbar'
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession()
  return (
    <>
    <Appbar/>
    
    <br /><br />
    Home page
    <hr />
    {JSON.stringify(session)}
    <hr />
    </>

  );
}
