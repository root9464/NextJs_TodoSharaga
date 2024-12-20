'use client';

import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export const Header = () => {
  const { data, isSuccess, isLoading, isError, error } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data, status, statusText } = await axios.get<{ message: string }>('/api');
      return data;
    },

    select: (data) => data.message,
  });

  console.log(data);

  return (
    <div className='w-full h-fit flex flex-row justify-between items-center'>
      <div className='w-[230px] h-fit flex flex-col'>
        <h1 className='font-bold text-xl'>You have got 5 tasks today to complete</h1>
        <p className='text-[11px] font-semibold'>- You can only create 10 tasks per day</p>
      </div>
      <div className='w-12 h-12 bg-lime-400 rounded-full'></div>
    </div>
  );
};
