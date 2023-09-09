import Header from '../../src/components/Header';
import ChatScreen from '../../src/components/ChatScreen';

const cacheName = String(process.env.NEXT_PUBLIC_MOMENTO_CACHE_NAME);

export default function PersonChat({ username }: { username: string }) {  
  return (
    <div className="App">
      <Header />
      <ChatScreen topicName={username} cacheName={cacheName} username={username}/>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { query } = context;
  const username = query.person;

  return {
    props: {
      username,
    }
  }
}