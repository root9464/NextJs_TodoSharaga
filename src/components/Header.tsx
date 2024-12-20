export const Header = () => {
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
