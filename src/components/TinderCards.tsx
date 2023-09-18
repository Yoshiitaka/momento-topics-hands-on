import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import AWS from 'aws-sdk';

const TinderCard = dynamic(() => import('react-tinder-card'), {
  ssr: false
});

type FetchedPeople = {
    name: any;
    url: string;
}[]

type TinderCardsProps = {
    currentUsername: string;
};

AWS.config.credentials = new AWS.CognitoIdentityCredentials({
    IdentityPoolId: process.env.NEXT_PUBLIC_COGNITO_IDENTITY_POOL || ''
});

AWS.config.update({
    region: 'ap-northeast-1'
});

const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();
const backetName = process.env.NEXT_PUBLIC_S3_BACKET_NAME;

const onSwipe = async (direction: any, personName: string, currentUsername: string) => {
    console.log('You swiped: ' + direction);

    if (direction === 'right') {
        const uuid = require('uuid');
        let chatRoomId = uuid.v4();

        const searchParams = {
            TableName: 'Likes',
            KeyConditionExpression: '#userAttribute = :likedUserVal AND #likedUserAttribute = :userVal',
            ExpressionAttributeNames: {
                '#userAttribute': 'user',
                '#likedUserAttribute': 'likedUser'
            },
            ExpressionAttributeValues: {
                ':userVal': currentUsername,
                ':likedUserVal': personName
            }
        };

        try {
            const result = await dynamodb.query(searchParams).promise();
            if (result.Items && result.Items.length > 0) {
                chatRoomId = result.Items[0].ChatRoom;
            }

            const likeRecord = {
                TableName: 'Likes',
                Item: {
                    user: currentUsername,
                    likedUser: personName,
                    ChatRoom: chatRoomId,
                    timestamp: new Date().toISOString()
                }
            };
            
            await dynamodb.put(likeRecord).promise();
            console.log(`Saved like from ${currentUsername} to ${personName}`);
        } catch (error) {
            console.error('Error on swiping:', error);
        }
    }
}

function TinderCards({ currentUsername }: TinderCardsProps) {
    const [people, setPeople] = useState<FetchedPeople>([]);

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                TableName: "UserData"
            };

            try {
                const result = await dynamodb.scan(params).promise();
                const userNames = result.Items?.map(item => item.username);
                const fetchedPeople = [];

                for (let username of userNames as any) {
                    if (username === currentUsername) continue;
                    const s3Params = {
                        Bucket: `${backetName}`,
                        Prefix: username
                    };
                    const s3Data = await s3.listObjectsV2(s3Params).promise();
                    if (s3Data && s3Data.Contents && s3Data.Contents.length > 0) {
                        const imageUrl = `https://${backetName}.s3.ap-northeast-1.amazonaws.com/${s3Data.Contents[0].Key}`;
                        fetchedPeople.push({
                            name: username,
                            url: imageUrl
                        });
                    }
                }
                setPeople(fetchedPeople);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [currentUsername]);

    return (
        <div>
            <div className='flex justify-center mt-20'>
                {people.map(person => (
                    <TinderCard 
                        onSwipe={(direction) => onSwipe(direction, person.name, currentUsername)} 
                        className='absolute bg-white' 
                        key={person.name} 
                        preventSwipe={['up', 'down']}>
                        <div style={{ backgroundImage: `url(${person.url})` }} 
                             className='relative w-[600px] p-5 max-w-[85vw] h-[50vh] rounded-xl bg-cover bg-center shadow-lg'>
                        </div>
                        <h3 className='bottom-2.5 text-black bg-white rounded-xl text-center'>{person.name}</h3>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards
