'use client';
import { Checkbox } from '@nextui-org/checkbox';
import { CalendarIcon } from '@public/tsx/Calendar';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Link from 'next/link';
import { Fragment } from 'react';
import { DATA_POST } from '../constants/const';
import { calcColorPriority } from '../func/funcs';

export const Posts = () => {
  return (
    <div className='w-full h-full grid auto-rows-max gap-5'>
      {DATA_POST.map(({ title, tasks }, index) => (
        <Fragment key={index}>
          <HeaderPost title={title} />
          <div className='w-full max-h-[calc(80px*5)] flex flex-col gap-4 overflow-y-scroll overflow-x-hidden'>
            {tasks.map(({ id, title, done, createdAt, priority }) => (
              <Post title={title} done={done} createdAt={createdAt} priority={priority} key={id} />
            ))}
          </div>
        </Fragment>
      ))}
    </div>
  );
};

const HeaderPost = ({ title }: { title: string }) => (
  <div className='w-full h-fit flex flex-row gap-2 justify-between items-center'>
    <h2 className='text-xl font-semibold'>{title}</h2>
    <Link href='/' className='text-base text-[#BA83DE]/80'>
      See All
    </Link>
  </div>
);

type PropsPost = {
  title: string;
  done: boolean;
  createdAt: string;
  priority: 'low' | 'medium' | 'high';
};

const Post = ({ title, done, createdAt, priority }: PropsPost) => {
  const priorityColor = calcColorPriority(priority);
  const formattedDate = format(new Date(createdAt), 'd MMMM yyyy, HH:mm', { locale: ru });

  return (
    <div className='w-full h-20 bg-uiGhostDark rounded-lg flex flex-row gap-2'>
      <div style={{ backgroundColor: priorityColor }} className='w-4 h-full rounded-l-lg' />
      <div className='w-full h-full grid grid-cols-2 gap-2 px-3 py-2.5 justify-items-center'>
        <div className='w-full h-full flex flex-col gap-y-2'>
          <h3 className='text-base'>{title}</h3>

          <div className='w-full h-full flex flex-row gap-1'>
            <CalendarIcon stroke='rgb(255 255 255 / 0.8)' height={16} widht={16} />
            <p className='text-white/80 text-sm'>{formattedDate}</p>
          </div>
        </div>

        <Checkbox className='justify-self-end' checked={done} />
      </div>
    </div>
  );
};
