import { Header } from '@/components/Header';
import { PostsFlow } from '@/modules/Posts/Module';
import { Button } from '@nextui-org/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='relative h-full w-full px-5 pt-14'>
      <Header />
      <PostsFlow />

      <Button
        as={Link}
        href='/editing'
        className='mb-7 h-[50px] w-full rounded-lg bg-gradient-to-r from-[#ba83de] to-[#de83b0] font-semibold text-white'
      >
        Create Task
      </Button>
    </div>
  );
}
