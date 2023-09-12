import { useRouter } from 'next/navigation';
import Link from 'next/link';
import PersonIcon from '@mui/icons-material/Person';
import ForumIcon from '@mui/icons-material/Forum';
import { IconButton } from '@mui/material';

function TinderHeader() {
    const router = useRouter();
    return (
        <div className='flex justify-between items-center border-b border-gray-200'>
            <PersonIcon className='cursor-pointer' fontSize='large' />
            <Link href='/'>
                <img className='h-10 object-contain' src='/momento.png' alt='momento' />
            </Link>
            <Link href='/chat'>
                    <IconButton className='p-5'>
                        <ForumIcon className='cursor-pointer' fontSize='large' />
                    </IconButton>
            </Link>
        </div>
    )
}

export default TinderHeader;