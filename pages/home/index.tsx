import TinderHeader from '../../src/components/Header';
import TinderCards from '../../src/components/TinderCards';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

const Page: NextPage = () => {
    const router = useRouter();
    const { username } = router.query;

  return (
    <div className="App">
      <TinderHeader />
      <TinderCards currentUsername={username as string} />
    </div>
  );
}

export default Page