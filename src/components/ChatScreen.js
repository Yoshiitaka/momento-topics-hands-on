import Avatar from '@mui/material/Avatar';
import React, { useState } from 'react'

const ChatScreen = () => {

    const [input, setInput] = useState('');

    const [messages, setMessages] = useState([
        {
            name: 'Ellen',
            image: 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
            message: 'Hey Guys!'
        },
        {
            name: 'Ellen',
            image: 'https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg',
            message: 'Chat guys😎'
        },
        {
            message: 'Hey bro This is Grate😍💛'
        }
    ]);

    const handleSend = e => {
        e.preventDefault();

        setMessages([...messages, {message: input}]);
        setInput("");
    }

    return (
        <div className='p-5'>
            <p className='text-center text-gray-500 mb-5'>You matched with Ellen on 10/08/2021</p>
    
            {messages.map(message => (
                message.name ? (
                    <div className='flex items-center mb-5'>
                        <Avatar
                            className='mr-3'
                            alt={message.name}
                            src={message.image}
                        />
                        <p className='bg-gray-300 p-4 rounded-xl'>{message.message}</p>
                    </div>
                ) : (
                    <div className='flex justify-end'>
                        <p className='bg-blue-600 text-white p-4 rounded-xl'>{message.message}</p>
                    </div>
                )
            ))}
    
            <div className='fixed bottom-0 w-full bg-gray-200 p-4 border-t border-gray-300 flex'>
                <input 
                    value={input} 
                    onChange={e => setInput(e.target.value)} 
                    className='flex-grow bg-white p-3 rounded-lg mr-4 focus:outline-none' 
                    placeholder='Type a message' 
                    type='text'
                />
                <button 
                    onClick={handleSend} 
                    type='submit' 
                    className='text-pink-600 font-bold focus:outline-none'>
                    SEND
                </button>
            </div>
        </div>
    )
}

export default ChatScreen