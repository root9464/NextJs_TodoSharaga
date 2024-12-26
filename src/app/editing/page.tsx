'use client';

import { ApiResponseTask } from '@/modules/Posts/components/Posts';
import { Button } from '@nextui-org/button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

const priorities: { label: 'low' | 'medium' | 'high'; color: string }[] = [
  { label: 'high', color: '#FACBBA' },
  { label: 'medium', color: '#D7F0FF' },
  { label: 'low', color: '#FAD9FF' },
];

type NewTask = {
  title: string;
  description: string;
  proiority: 'low' | 'medium' | 'high';
};

export default function EditingTaskPage() {
  const { initData } = useLaunchParams(); // Используется только в браузере
  const [createTask, setCreateTask] = useState<NewTask>({
    title: '',
    description: '',
    proiority: 'low',
  });
  const queryClient = useQueryClient();

  const { mutate: CreateNewTask } = useMutation({
    mutationKey: ['createTask'],
    mutationFn: async (newTask: NewTask) => {
      if (!initData || !initData.user) throw new Error('User in tma not found');

      const { data, status, statusText } = await axios.post<ApiResponseTask>('/api/posts', {
        userId: initData.user.id,
        ...newTask,
      });

      if (status !== 200) throw new Error(statusText);

      return data.data;
    },
    onSuccess: (data) => {
      console.log('Create task', data);
      queryClient.invalidateQueries({ queryKey: ['userPosts'] });
    },
  });

  return (
    <div className='relative h-screen w-full px-5 pt-14'>
      <div className='flex h-fit w-full flex-col gap-2'>
        <p className='text-2xl font-semibold'>Schedule</p>
        <input
          type='text'
          className='h-10 rounded-[14px] bg-[#181818] px-3 py-2 outline-none placeholder:text-white/70'
          placeholder='Title'
          onChange={(e) => setCreateTask({ ...createTask, title: e.target.value })}
        />
        <input
          type='text'
          className='h-10 rounded-[14px] bg-[#181818] px-3 py-2 outline-none placeholder:text-white/70'
          placeholder='Description'
          onChange={(e) => setCreateTask({ ...createTask, description: e.target.value })}
        />
      </div>

      <div className='mt-5 grid h-fit w-full grid-rows-2'>
        <p className='text-2xl font-semibold'>Priority</p>
        <div className='flex h-full w-full flex-row gap-2'>
          {priorities.map(({ label, color }) => (
            <Button
              key={label}
              style={{ backgroundColor: color }}
              className='w-full font-semibold'
              onPress={() => setCreateTask({ ...createTask, proiority: label })}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>

      <div className='absolute bottom-7 left-0 right-0 flex h-max w-full flex-row items-center justify-between gap-4 px-5'>
        <Button
          className='h-[50px] w-full rounded-lg bg-gradient-to-r from-[#ba83de] to-[#de83b0] font-semibold text-white'
          onPress={() => CreateNewTask(createTask)}
        >
          Create Task
        </Button>
        <Button as={Link} href='/' className='h-[50px] w-full rounded-lg bg-[#4f4f4f]/80 font-semibold text-white'>
          Cancel
        </Button>
      </div>
    </div>
  );
}
