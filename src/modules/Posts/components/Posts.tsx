'use client';
import { Checkbox } from '@nextui-org/checkbox';
import { CalendarIcon } from '@public/tsx/Calendar';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import axios from 'axios';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { calcColorPriority } from '../func/funcs';

type Task = {
  id: string;
  title: string;
  description: string;
  done: boolean;
  priority: 'low' | 'medium' | 'high'; // Если приоритет может быть только один из этих вариантов
  createdAt: string; // Или Date, если вы хотите работать с объектом Date
  userId: string;
};

type ApiResponse = {
  status: string;
  message: string;
  tasks: {
    relevant: Task[];
    irrelevant: Task[];
  };
};

export type ApiResponseTask = {
  status: string;
  message: string;
  data: {
    id: string;
    title: string;
    description: string;
    done: boolean;
    priority: 'low' | 'medium' | 'high'; // Если приоритет может быть только один из этих вариантов
    createdAt: string; // Или Date, если вы хотите работать с объектом Date
    userId: string;
  };
};

export const Posts = () => {
  const { initData } = useLaunchParams();

  const {
    data: UserPosts,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['userPosts'],
    queryFn: async () => {
      if (!initData || !initData.user) throw new Error('User in tma not found');
      const { data, status, statusText } = await axios.get<ApiResponse>(`/api/posts?user_id=${initData.user.id}`);
      if (status !== 200) throw new Error(statusText);

      return data;
    },
    enabled: !!(initData && initData.user),
    select: (data) => data.tasks,
  });

  return (
    <div className='grid h-full w-full auto-rows-max gap-5'>
      {UserPosts && isSuccess ? (
        <>
          {UserPosts.relevant.length > 0 && (
            <>
              <HeaderPost title='Relevant Tasks' />
              {UserPosts.relevant.map((task) => (
                <div className='flex max-h-[calc(80px*5)] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll' key={task.id}>
                  <Post {...task} />
                </div>
              ))}
            </>
          )}

          {UserPosts.irrelevant.length > 0 && (
            <>
              <HeaderPost title='Irrelevant Tasks' />
              {UserPosts.irrelevant.map((task) => (
                <div className='flex max-h-[calc(80px*5)] w-full flex-col gap-4 overflow-x-hidden overflow-y-scroll' key={task.id}>
                  <Post {...task} />
                </div>
              ))}
            </>
          )}
        </>
      ) : isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>NO POSTS</div>
      )}
    </div>
  );
};

const HeaderPost = ({ title }: { title: string }) => (
  <div className='flex h-fit w-full flex-row items-center justify-between gap-2'>
    <h2 className='text-xl font-semibold'>{title}</h2>
  </div>
);

const Post = ({ title, done, createdAt, priority, description, id, userId }: Task) => {
  const priorityColor = calcColorPriority(priority);
  const formattedDate = format(new Date(createdAt), 'd MMMM yyyy, HH:mm', { locale: ru });
  const queryClient = useQueryClient();

  const doneTask = async (status: boolean) => {
    const {
      data,
      status: responseStatus,
      statusText,
    } = await axios.post<ApiResponseTask>('/api/posts', {
      userId,
      title,
      description,
      proiority: priority,
      done: status,
    });

    if (responseStatus !== 200) throw new Error(statusText);

    queryClient.invalidateQueries({ queryKey: ['userPosts'] });
  };
  return (
    <div className='flex h-20 w-full flex-row gap-2 rounded-lg bg-uiGhostDark'>
      <div style={{ backgroundColor: priorityColor }} className='h-full w-4 rounded-l-lg' />
      <div className='grid h-full w-full grid-cols-2 justify-items-center gap-2 px-3 py-2.5'>
        <div className='flex h-full w-full flex-col gap-y-2'>
          <h3 className='text-base'>{title}</h3>

          <div className='flex h-full w-full flex-row gap-1'>
            <CalendarIcon stroke='rgb(255 255 255 / 0.8)' height={16} widht={16} />
            <p className='text-sm text-white/80'>{formattedDate}</p>
          </div>
        </div>

        <Checkbox className='justify-self-end' checked={done} onChange={() => doneTask(!done)} />
      </div>
    </div>
  );
};
