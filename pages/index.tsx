"use client";
import { NextPage } from 'next';
import { useState } from "react";
import AWS from 'aws-sdk';
import TinderHeader from '../src/components/Header';
import TinderCards from '../src/components/TinderCards';

const Page: NextPage = () => {
  const [username, setUsername] = useState("");
  const [userImage, setUserImage] = useState(null);
  const [usernameSelected, setUsernameSelected] = useState(false);
 
  AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL || ''
});

  AWS.config.update({
    region: 'ap-northeast-1'
  });

  const s3 = new AWS.S3();
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const backetName = process.env.NEXT_PUBLIC_S3_BACKET_NAME;

  const writeToDynamoDB = async (username: any) => {
    const params = {
      TableName: "UserData",
      Item: {
        username: username
      }
    };

    try {
      await dynamodb.put(params).promise();
      return true;
    } catch (error) {
      console.error("Error writing to DynamoDB:", error);
      return false;
    }
  }

  const handleImageChange = (e: any) => {
    if (e.target.files[0]) setUserImage(e.target.files[0]);
  }

  const handleEnter = async () => {
    if (username && userImage) {
      // Upload to S3
      const uploadParams = {
        Bucket: `${backetName}`,
        Key: username,
        Body: userImage
      };
      await s3.upload(uploadParams).promise();

      const result = await writeToDynamoDB(username);

      if (result) {
        localStorage.setItem('username', username);
        setUsernameSelected(true);
      } else {
        // handle error here
      }
    }
  }

  if (!usernameSelected) {
    return (
      <div className='h-full'>
        <div
          className={
            "flex h-screen justify-center items-center flex-col bg-slate-300"
          }
        >
          <div className={"w-72 text-center"}>
          </div>
          <div className={"h-4"} />
          <div className={"flex w-72 justify-center"}>
            <input
              className={"rounded-2xl p-2 w-60 items-center"}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"username"}
            />
          </div>
          <div className={"flex w-72 justify-center my-6"}>
            <input type="file" accept=".png, .jpeg" onChange={handleImageChange} />
          </div>
          <div className={"h-4"} />
          <div className={"w-72 flex justify-center"}>
            <button
              onClick={handleEnter}
              disabled={!username || !userImage}
              className={
                "disabled:bg-slate-50 disabled:brightness-75 disabled:cursor-default rounded-2xl hover:cursor-pointer w-24 bg-emerald-400 p-2 hover:brightness-75"
              }
            >
              Enter
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <TinderHeader />
      <TinderCards currentUsername={username} />
    </>
  );
}

export default Page