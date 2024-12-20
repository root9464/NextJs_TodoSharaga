import { Header } from '@/components/Header';
import { PostsFlow } from '@/modules/Posts/Module';
import { Button } from '@nextui-org/button';

export default function Home() {
  return (
    <div className='w-full h-full relative px-5 pt-14'>
      <Header />
      <PostsFlow />

      <Button className='w-full mb-7 h-[50px]'>ffff</Button>
    </div>
  );
}
