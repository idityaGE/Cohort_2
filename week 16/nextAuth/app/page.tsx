import Appbar from '@/components/Appbar'
import { getServerSession } from 'next-auth';

export default async function Home() {
  const session = await getServerSession()
  console.log(session)
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
