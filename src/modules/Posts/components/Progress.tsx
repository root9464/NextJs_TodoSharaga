import { Progress as NextUIProgress } from '@nextui-org/progress';

export const Progress = () => {
  return (
    <div className='w-full h-fit flex flex-col gap-5 mt-8'>
      <h2>Progress</h2>
      <div className='bg-uiGhostDark w-full h-fit rounded-lg p-4 flex flex-col gap-2.5'>
        <h3>Daily Task</h3>
        <p>2/3 Task Completed</p>
        <div className='w-full h-fit flex flex-col gap-2'>
          <p className='text-white/80 text-xs'>You are almost done go ahead</p>
          <NextUIProgress
            aria-label='Loading...'
            value={66}
            classNames={{
              track: 'bg-[#353030]',
              indicator: 'bg-[#DC83DE]',
            }}
            size='lg'
          />
        </div>
      </div>
    </div>
  );
};
