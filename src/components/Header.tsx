'use client';

import { useQuery } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import axios from 'axios';

type User = {
  status: string;
  message: string;
  data: {
    id: number;
    userName: string;
    firstName: string;
    lastName: string;
    hash: string;
  };
};

export const Header = () => {
  const { initData } = useLaunchParams();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!initData || !initData.user) return;

      const { data, status, statusText } = await axios.post<User>('/api/user', {
        id: initData.user.id.toString(),
        userName: initData.user.username,
        firstName: initData.user.firstName,
        lastName: initData.user.lastName,
        hash: initData.hash,
      });

      if (status !== 200) throw new Error(statusText);
      return data;
    },

    select: (data) => data,
    enabled: !!(initData && initData.user),
  });

  console.log(data);

  return (
    <div className='flex h-fit w-full flex-row items-center justify-between'>
      <div className='flex h-fit w-[230px] flex-col'>
        <h1 className='text-xl font-bold'>You have got 5 tasks today to complete</h1>
        <p className='text-[11px] font-semibold'>- You can only create 10 tasks per day</p>
      </div>
      {initData && data && initData.user && <img className='h-12 w-12 rounded-full bg-lime-400' src={initData.user.photoUrl} />}
    </div>
  );
};
