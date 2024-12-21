'use client';
import { Progress as NextUIProgress } from '@nextui-org/progress';
import { useQuery } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import axios from 'axios';

type ApiResponse = {
  status: string;
  message: string;
  data: {
    total: number;
    totalDone: number;
  };
};
export const Progress = () => {
  const { initData } = useLaunchParams();

  const {
    data: TasksProgress,
    isSuccess,
    isLoading,
  } = useQuery({
    queryKey: ['tasksProgress'],
    queryFn: async () => {
      if (!initData || !initData.user) throw new Error('User in tma not found');

      const { data, status, statusText } = await axios.get<ApiResponse>(`/api/posts/statistic?user_id=${initData.user.id}`);
      if (status !== 200) throw new Error(statusText);
      return data;
    },
    select: (data) => data.data,
    enabled: !!(initData && initData.user),
    refetchInterval: false,
  });

  return (
    <div className='mt-8 flex h-fit w-full flex-col gap-5'>
      <h2>Progress</h2>
      {TasksProgress && isSuccess ? (
        <div className='flex h-fit w-full flex-col gap-2.5 rounded-lg bg-uiGhostDark p-4'>
          <h3>Completed everything</h3>
          <p>
            {TasksProgress.totalDone}/{TasksProgress.total} Task Completed
          </p>
          <div className='flex h-fit w-full flex-col gap-2'>
            <p className='text-xs text-white/80'>You are almost done go ahead</p>
            <NextUIProgress
              aria-label='Loading...'
              value={(TasksProgress.totalDone / TasksProgress.total) * 100}
              classNames={{
                track: 'bg-[#353030]',
                indicator: 'bg-[#DC83DE]',
              }}
              size='lg'
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};
