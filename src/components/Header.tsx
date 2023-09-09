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
                <img className='h-10 object-contain' src='https://drive.google.com/uc?export=download&id=16irET-NWvD4aI255f7qO_1adcHFgzrFc' alt='tinder/logo' />
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