import Avatar from '@mui/material/Avatar';
import Link from 'next/link';

const Chat = ({ name, message, profilePic, timestamp }) => {
  return (
    <Link href={{ pathname: `/chat/${name}`}}>
      <div className="no-underline text-current block">
        <div className='flex items-center justify-between p-5 h-18 border-b border-fafafa cursor-pointer'>
          <Avatar className='mr-5' src={profilePic} />
          <div className='flex-1'>
            <h2>{name}</h2>
            <p className="text-gray-500">{message}</p>
          </div>
          <p className='text-gray-400'>{timestamp}</p>
        </div>
      </div>
    </Link>
  )
}

export default Chat;