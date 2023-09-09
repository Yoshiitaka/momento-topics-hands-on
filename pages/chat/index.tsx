import Header from '../../src/components/Header';
import Chats from '../../src/components/Chats';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';

const Page: NextPage<{}> = () => {
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    // localStorageからusernameを取得
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  return (
    <div className="App">
      <Header/>
      <Chats currentUsername={username} />
    </div>
  );
}

export default Page