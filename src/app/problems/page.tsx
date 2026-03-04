'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { StageView } from '@/components/StageView';
import problemsData from '@/lib/problems';
import { Download, Upload, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function ProblemsTrackerPage() {
  const [stages, setStages] = useState(problemsData);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);

  // Handle scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load progress from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('problems-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStages(parsed);
      } catch (e) {
        console.error('Failed to load saved progress:', e);
      }
    }
    const savedDarkMode = localStorage.getItem('dark-mode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('problems-progress', JSON.stringify(stages));
  }, [stages]);

  const toggleProblem = (
    stageIndex: number,
    categoryId: string,
    problemId: string,
  ) => {
    setStages((prev) =>
      prev.map((stage, sIdx) =>
        sIdx === stageIndex
          ? {
              ...stage,
              categories: stage.categories.map((cat) =>
                cat.id === categoryId
                  ? {
                      ...cat,
                      problems: cat.problems.map((p) =>
                        p.id === problemId
                          ? { ...p, completed: !p.completed }
                          : p,
                      ),
                    }
                  : cat,
              ),
            }
          : stage,
      ),
    );
  };

  // Calculate overall stats
  const totalProblems = stages.reduce(
    (sum, stage) =>
      sum +
      stage.categories.reduce((catSum, cat) => catSum + cat.problems.length, 0),
    0,
  );

  const completedProblems = stages.reduce(
    (sum, stage) =>
      sum +
      stage.categories.reduce(
        (catSum, cat) =>
          catSum + cat.problems.filter((p) => p.completed).length,
        0,
      ),
    0,
  );

  const overallProgressPercent = (completedProblems / totalProblems) * 100;

  const exportProgress = () => {
    const data = JSON.stringify(stages, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `problems-progress-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const importProgress = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const imported = JSON.parse(e.target?.result as string);
        setStages(imported);
        alert('Progress imported successfully!');
      } catch {
        alert('Failed to import progress file');
      }
    };
    reader.readAsText(file);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setStages(problemsData);
      localStorage.removeItem('problems-progress');
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('dark-mode', newDarkMode.toString());
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  return (
    <div
      className='min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-900 dark:text-gray-100 perspective'
      style={{ perspective: '1200px' }}
    >
      {/* Animated background blobs for 3D effect */}
      <div className='fixed inset-0 overflow-hidden pointer-events-none'>
        <div className='absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob'></div>
        <div className='absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000'></div>
        <div className='absolute bottom-0 left-1/2 w-96 h-96 bg-gradient-to-r from-pink-400 to-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 dark:opacity-10 animate-blob animation-delay-4000'></div>
      </div>

      {/* Content with 3D perspective */}
      <div className='relative z-10'>
        <motion.div
          className='fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50'
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Header */}
        <div className='sticky top-0 z-40 bg-white dark:bg-slate-800 bg-opacity-80 dark:bg-opacity-90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700'>
          <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-3'>
            <div className='flex items-center justify-between gap-2 sm:gap-3 mb-2 sm:mb-3'>
              <div className='min-w-0 flex-1'>
                <h1 className='text-xl sm:text-2xl md:text-3xl font-black text-gray-900 dark:text-white break-words'>
                  🚀 LeetCode Tracker
                </h1>
                <p className='text-xs text-gray-600 dark:text-gray-400 mt-0.5 hidden sm:block'>
                  Master FAANG patterns
                </p>
              </div>
              <div className='flex flex-wrap gap-1 sm:gap-2 items-center flex-shrink-0'>
                <Button
                  onClick={toggleDarkMode}
                  className='flex items-center gap-1 text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-100 dark:bg-slate-700 hover:bg-gray-200 dark:hover:bg-slate-600 border border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-200 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg'
                  variant='outline'
                >
                  {darkMode ? (
                    <Sun className='w-3 h-3 sm:w-4 sm:h-4' />
                  ) : (
                    <Moon className='w-3 h-3 sm:w-4 sm:h-4' />
                  )}
                </Button>
                <Button
                  onClick={exportProgress}
                  className='flex items-center gap-1 text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 border border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-200 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg'
                  variant='outline'
                >
                  <Download className='w-3 h-3' />
                </Button>
                <label className='flex items-center'>
                  <Button
                    className='flex items-center gap-1 text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-green-100 dark:bg-green-900 hover:bg-green-200 dark:hover:bg-green-800 border border-green-300 dark:border-green-700 text-green-700 dark:text-green-200 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg'
                    variant='outline'
                    type='button'
                  >
                    <Upload className='w-3 h-3' />
                  </Button>
                  <input
                    type='file'
                    accept='.json'
                    onChange={importProgress}
                    className='hidden'
                  />
                </label>
                <Button
                  onClick={resetProgress}
                  className='text-xs px-2 sm:px-3 py-1.5 sm:py-2 bg-red-100 dark:bg-red-900 hover:bg-red-200 dark:hover:bg-red-800 border border-red-300 dark:border-red-700 text-red-700 dark:text-red-200 transition-all duration-200 rounded-lg shadow-sm hover:shadow-md dark:shadow-lg'
                  variant='destructive'
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Overall Progress */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 md:gap-4'>
              <motion.div
                className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900 dark:to-blue-800 rounded-lg p-3 sm:p-4 border border-blue-200 dark:border-blue-700 cursor-default'
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(59, 130, 246, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  Completed
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-blue-600 dark:text-blue-400 mt-1'>
                  {completedProblems}
                </p>
                <p className='text-xs text-gray-500 mt-1'>solved</p>
              </motion.div>
              <motion.div
                className='bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900 dark:to-purple-800 rounded-lg p-3 sm:p-4 border border-purple-200 dark:border-purple-700 cursor-default'
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(168, 85, 247, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  Remaining
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-purple-600 dark:text-purple-400 mt-1'>
                  {totalProblems - completedProblems}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  to do
                </p>
              </motion.div>
              <motion.div
                className='bg-gradient-to-br from-pink-50 to-pink-100 dark:from-pink-900 dark:to-pink-800 rounded-lg p-3 sm:p-4 border border-pink-200 dark:border-pink-700 cursor-default'
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(236, 72, 153, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  Progress
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-pink-600 dark:text-pink-400 mt-1'>
                  {Math.round(overallProgressPercent)}%
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  complete
                </p>
              </motion.div>
              <motion.div
                className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900 dark:to-green-800 rounded-lg p-3 sm:p-4 border border-green-200 dark:border-green-700 cursor-default'
                whileHover={{
                  y: -6,
                  boxShadow: '0 20px 40px rgba(34, 197, 94, 0.2)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 font-medium'>
                  Total
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mt-1'>
                  {totalProblems}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  problems
                </p>
              </motion.div>
            </div>

            {/* Overall Progress Bar */}
            <div className='mt-3 sm:mt-4'>
              <div className='flex items-center justify-between mb-1.5 sm:mb-2'>
                <span className='text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300'>
                  Overall Progress
                </span>
                <span className='text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400'>
                  {Math.round(overallProgressPercent)}%
                </span>
              </div>
              <div className='w-full h-2 sm:h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden border border-gray-300 dark:border-slate-600'>
                <motion.div
                  className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full'
                  initial={{ width: 0 }}
                  animate={{ width: `${overallProgressPercent}%` }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <main className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-12'>
          {stages.map((stage, stageIndex) => (
            <StageView
              key={stage.number}
              stage={stage}
              onToggleProblem={(categoryId, problemId) =>
                toggleProblem(stageIndex, categoryId, problemId)
              }
            />
          ))}

          {/* Footer with Tips */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className='mt-8 sm:mt-16 p-4 sm:p-6 md:p-8 bg-white dark:bg-slate-800 rounded-2xl border-2 border-blue-200 dark:border-slate-700 shadow-lg'
          >
            <h3 className='text-lg sm:text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-4'>
              🎯 How to Use This List
            </h3>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6'>
              <div>
                <h4 className='font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2'>
                  Daily Routine
                </h4>
                <ul className='space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
                  <li>✅ 2 new problems/day</li>
                  <li>✅ 1 old revision problem</li>
                  <li>✅ Weekly review</li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2'>
                  Time Limits
                </h4>
                <ul className='space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
                  <li>🟢 Easy → 15–20 min</li>
                  <li>🟡 Medium → 30–40 min</li>
                  <li>🔴 Hard → 45–60 min</li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2'>
                  If Stuck
                </h4>
                <ul className='space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
                  <li>🔹 Struggle 25–30 min</li>
                  <li>🔹 Take hint</li>
                  <li>🔹 Re-implement next day</li>
                </ul>
              </div>
              <div>
                <h4 className='font-bold text-gray-800 dark:text-gray-100 text-sm sm:text-base mb-2'>
                  Interview Ready When
                </h4>
                <ul className='space-y-1 text-gray-700 dark:text-gray-300 text-xs sm:text-sm'>
                  <li>✅ Stage 5 comfortable</li>
                  <li>✅ Trees are natural</li>
                  <li>✅ Sliding window auto</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
