export function Header() {
  return (
    <header className='p-4 border-b mb-6 bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700'>
      <div className='flex items-center justify-between'>
        <div>
          <h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
            📚 LeetCode Problem Tracker
          </h1>
          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Master FAANG interview patterns
          </p>
        </div>
      </div>
    </header>
  );
}
