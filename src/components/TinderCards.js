import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import AWS from 'aws-sdk';

const TinderCard = dynamic(() => import('react-tinder-card'), {
  ssr: false
});

function TinderCards() {
    const [people, setPeople] = useState([]);

    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
      secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
      region: 'ap-northeast-1'
    });

    const dynamodb = new AWS.DynamoDB.DocumentClient();
    const s3 = new AWS.S3();

    useEffect(() => {
        const fetchData = async () => {
            const params = {
                TableName: "UserData"
            };

            try {
                const result = await dynamodb.scan(params).promise();
                const userNames = result.Items.map(item => item.username);

                const fetchedPeople = [];

                for (let username of userNames) {
                    const s3Params = {
                        Bucket: 'user-images-bucket-2023-0907',
                        Prefix: username // assuming it would match the [key] in S3
                    };
                    const s3Data = await s3.listObjectsV2(s3Params).promise();
                    if (s3Data && s3Data.Contents && s3Data.Contents.length > 0) {
                        const imageUrl = `https://user-images-bucket-2023-0907.s3.ap-northeast-1.amazonaws.com/${s3Data.Contents[0].Key}`;
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

        return () => {
            // any cleanup code, if necessary
        };
    }, []);

    return (
        <div>
            <div className='flex justify-center mt-20'>
                {people.map(person => (
                    <TinderCard className='absolute' key={person.name} preventSwipe={['up', 'down']}>
                        <div style={{ backgroundImage: `url(${person.url})` }} className='relative w-[600px] p-5 max-w-[85vw] h-[50vh] rounded-xl bg-cover bg-center shadow-lg'>
                        </div>
                        <h3 className='bottom-2.5 text-black bg-white rounded-xl text-center'>{person.name}</h3>
                    </TinderCard>
                ))}
            </div>
        </div>
    )
}

export default TinderCards
