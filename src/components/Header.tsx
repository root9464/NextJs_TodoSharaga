'use client';

import { useQuery } from '@tanstack/react-query';
import { retrieveLaunchParams } from '@telegram-apps/bridge';
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
  const { initData } = retrieveLaunchParams();

  const { data } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      if (!initData || !initData.user) return;

      const { data, status, statusText } = await axios.post<User>('/api/user', {
        id: initData.user.id,
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
    <div className='w-full h-fit flex flex-row justify-between items-center'>
      <div className='w-[230px] h-fit flex flex-col'>
        <h1 className='font-bold text-xl'>You have got 5 tasks today to complete</h1>
        <p className='text-[11px] font-semibold'>- You can only create 10 tasks per day</p>
      </div>
      {initData && data && initData.user && <img className='w-12 h-12 bg-lime-400 rounded-full' src={initData.user.photoUrl} />}
    </div>
  );
};
