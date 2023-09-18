import Header from '../../src/components/Header';
import ChatScreen from '../../src/components/ChatScreen';
import AWS from 'aws-sdk';
import React, { useState, useEffect } from 'react';

const cacheName = String(process.env.NEXT_PUBLIC_MOMENTO_CACHE_NAME);

AWS.config.update({
    region: 'ap-northeast-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();

async function getChatRoomFromLikes(storedUsername: string, username: string) {

  const params = {
      TableName: "Likes",
      KeyConditionExpression: "#userAttr = :u and likedUser = :lu",
      ExpressionAttributeNames: {
          "#userAttr": "user"
      },
      ExpressionAttributeValues: {
          ":u": storedUsername,
          ":lu": username
      }
  };

  try {
      const result = await dynamodb.query(params).promise();
      return result.Items && result.Items[0] ? result.Items[0].ChatRoom : null;
  } catch (error) {
      console.error("Error fetching from DynamoDB:", error);
      return null;
  }
}


export default function PersonChat({ username }: { username: string }) {  
  const [storedUsername, setStoredUsername] = useState<string | null>(null);
  const [topicName, setTopicName] = useState<string | null>(null);
  
  useEffect(() => {
    // マウント時にlocalStorageからusernameを取得
    const retrievedUsername = localStorage.getItem("username");
    if (!retrievedUsername) {
        console.error("Stored username is not found in localStorage.");
        return;
    }
    setStoredUsername(retrievedUsername);

    // DynamoDBからtopicNameを取得
    getChatRoomFromLikes(retrievedUsername, username).then((result) => {
      if (result) {
        setTopicName(result);
      } else {
        console.error("Failed to fetch topicName from DynamoDB.");
      }
    });
  }, [username]);

  if (!storedUsername || !topicName) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <Header />
      <ChatScreen topicName={topicName} cacheName={cacheName} username={storedUsername}/>
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
