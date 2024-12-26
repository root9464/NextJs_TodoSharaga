'use client';

import { Progress } from '@/modules/Posts/components/Progress';
import { Posts } from './components/Posts';

export const PostsFlow = () => {
  return (
    <div className='relative flex h-full w-full flex-col gap-y-5 pb-12'>
      <Progress />
      <Posts />
    </div>
  );
};
