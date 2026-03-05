'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { StageView } from '@/components/StageView';
import problemsData from '@/lib/problems';
import { Download, Upload, Moon, Sun, ArrowLeft } from 'lucide-react';
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
    <div className='min-h-screen bg-white text-black'>
      {/* Minimal background */}
      <div className='fixed inset-0 -z-10 bg-white' />

      {/* Content */}
      <div className='relative z-10'>
        <motion.div
          className='fixed top-0 left-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50'
          style={{ width: `${scrollProgress}%` }}
          transition={{ duration: 0.1 }}
        />

        {/* Header */}
        <div className='sticky top-0 z-40 bg-white border-b border-gray-100'>
          <div className='max-w-7xl mx-auto px-6 sm:px-8 py-6'>
            <div className='flex items-center justify-between gap-4 mb-6'>
              <Link
                href='/'
                className='flex items-center gap-2 text-gray-600 hover:text-black transition-colors'
              >
                <ArrowLeft className='w-5 h-5' />
              </Link>
              <div>
                <h1 className='text-4xl sm:text-5xl font-semibold tracking-tight'>
                  Problems
                </h1>
                <p className='text-gray-600 mt-2 hidden sm:block'>
                  Solve {totalProblems} curated coding challenges across{' '}
                  {stages.length} stages
                </p>
              </div>
              <div className='flex flex-wrap gap-2 sm:gap-3 items-center flex-shrink-0'>
                <Button
                  onClick={toggleDarkMode}
                  className='flex items-center gap-1 text-xs px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg'
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
                  className='flex items-center gap-1 text-xs px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg'
                  variant='outline'
                >
                  <Download className='w-3 h-3' />
                </Button>
                <label className='flex items-center'>
                  <Button
                    className='flex items-center gap-1 text-xs px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg'
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
                  className='text-xs px-3 py-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors rounded-lg'
                  variant='destructive'
                >
                  Reset
                </Button>
              </div>
            </div>

            {/* Overall Progress */}
            <div className='grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4'>
              <motion.div
                className='bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-100'
                whileHover={{
                  y: -2,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 font-medium'>
                  Completed
                </p>
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-black mt-2'>
                  {completedProblems}
                </p>
                <p className='text-xs text-gray-500 mt-1'>solved</p>
              </motion.div>
              <motion.div
                className='bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-100'
                whileHover={{
                  y: -2,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 font-medium'>
                  Remaining
                </p>
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-black mt-2'>
                  {totalProblems - completedProblems}
                </p>
                <p className='text-xs text-gray-500 mt-1'>to do</p>
              </motion.div>
              <motion.div
                className='bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-100'
                whileHover={{
                  y: -2,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <p className='text-xs sm:text-sm text-gray-600 font-medium'>
                  Progress
                </p>
                <p className='text-2xl sm:text-3xl md:text-4xl font-semibold text-black mt-2'>
                  {Math.round(overallProgressPercent)}%
                </p>
                <p className='text-xs text-gray-500 mt-1'>complete</p>
              </motion.div>
              <motion.div
                className='bg-gray-50 rounded-lg p-4 sm:p-6 border border-gray-100'
                whileHover={{
                  y: -2,
                  boxShadow: '0 10px 25px rgba(0, 0, 0, 0.05)',
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
