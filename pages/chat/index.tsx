import Header from '../../src/components/Header';
import Chats from '../../src/components/Chats';
import { NextPage } from 'next';

const Page: NextPage<{}> = () => {

  return (
    <div className="App">
      <Header/>
      <Chats />
    </div>
  );
}

export default Page