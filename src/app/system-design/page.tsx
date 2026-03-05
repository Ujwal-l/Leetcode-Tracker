'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import systemDesignData from '@/lib/systemDesign';
import type { SystemDesignRoadmap } from '@/lib/systemDesign';
import { Download, Upload, Moon, Sun, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function SystemDesignPage() {
  const [categories, setCategories] = useState(systemDesignData.categories);
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
    const saved = localStorage.getItem('system-design-progress');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setCategories(parsed);
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
    localStorage.setItem('system-design-progress', JSON.stringify(categories));
  }, [categories]);

  const toggleTopic = (categoryId: string, topicId: string) => {
    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              topics: cat.topics.map((topic) =>
                topic.id === topicId
                  ? { ...topic, completed: !topic.completed }
                  : topic,
              ),
            }
          : cat,
      ),
    );
  };

  // Calculate overall stats
  const totalTopics = categories.reduce(
    (sum, cat) => sum + cat.topics.length,
    0,
  );

  const completedTopics = categories.reduce(
    (sum, cat) => sum + cat.topics.filter((t) => t.completed).length,
    0,
  );

  const overallProgressPercent = (completedTopics / totalTopics) * 100;

  const exportProgress = () => {
    const data = JSON.stringify(categories, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `system-design-progress-${new Date().toISOString().split('T')[0]}.json`;
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
        setCategories(imported);
        alert('Progress imported successfully!');
      } catch {
        alert('Failed to import progress file');
      }
    };
    reader.readAsText(file);
  };

  const resetProgress = () => {
    if (confirm('Are you sure you want to reset all progress?')) {
      setCategories(systemDesignData.categories);
      localStorage.removeItem('system-design-progress');
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
                  System Design
                </h1>
                <p className='text-gray-600 mt-2 hidden sm:block'>
                  Learn {totalTopics} essential concepts and solve interview
                  problems
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
                  {completedTopics}
                </p>
                <p className='text-xs text-gray-500 mt-1'>learned</p>
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
                  {totalTopics - completedTopics}
                </p>
                <p className='text-xs text-gray-500 mt-1'>to study</p>
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
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-black mt-1'>
                  {Math.round(overallProgressPercent)}%
                </p>
                <p className='text-xs text-gray-500 mt-1'>complete</p>
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
                  Total Topics
                </p>
                <p className='text-xl sm:text-2xl md:text-3xl font-bold text-green-600 dark:text-green-400 mt-1'>
                  {totalTopics}
                </p>
                <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                  topics
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

        {/* Topics Grid */}
        <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-6 sm:py-8'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6'>
            {categories.map((category, idx) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div
                  className={`${category.color} rounded-xl p-4 sm:p-6 border backdrop-blur-sm`}
                >
                  <div className='flex items-center gap-2 mb-3'>
                    <span className='text-2xl'>{category.emoji}</span>
                    <h2 className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
                      {category.name}
                    </h2>
                  </div>
                  <p className='text-xs sm:text-sm text-gray-600 dark:text-gray-300 mb-4'>
                    {category.description}
                  </p>

                  {/* Progress in category */}
                  <div className='mb-4'>
                    <div className='flex justify-between text-xs mb-1'>
                      <span className='text-gray-600 dark:text-gray-400'>
                        {category.topics.filter((t) => t.completed).length}/
                        {category.topics.length}
                      </span>
                      <span className='text-gray-600 dark:text-gray-400'>
                        {Math.round(
                          (category.topics.filter((t) => t.completed).length /
                            category.topics.length) *
                            100,
                        )}
                        %
                      </span>
                    </div>
                    <div className='w-full h-1.5 bg-gray-300 dark:bg-gray-600 rounded-full overflow-hidden'>
                      <motion.div
                        className='h-full bg-gradient-to-r from-green-400 to-blue-500'
                        initial={{ width: 0 }}
                        animate={{
                          width: `${
                            (category.topics.filter((t) => t.completed).length /
                              category.topics.length) *
                            100
                          }%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  </div>

                  {/* Topics */}
                  <div className='space-y-2'>
                    {category.topics.map((topic) => (
                      <motion.label
                        key={topic.id}
                        className='flex items-center gap-2 p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer transition-colors'
                        whileHover={{ x: 4 }}
                      >
                        <input
                          type='checkbox'
                          checked={topic.completed}
                          onChange={() => toggleTopic(category.id, topic.id)}
                          className='w-4 h-4 rounded border-gray-300 text-blue-600 cursor-pointer accent-blue-600'
                        />
                        <span
                          className={`flex-1 text-sm ${
                            topic.completed
                              ? 'text-gray-400 dark:text-gray-500 line-through'
                              : 'text-gray-700 dark:text-gray-300'
                          }`}
                        >
                          {topic.title}
                        </span>
                        {topic.completed && <span className='text-lg'>✓</span>}
                      </motion.label>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Footer Stats */}
        <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-12 text-center'>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='bg-white dark:bg-slate-800 rounded-2xl p-6 sm:p-8 border border-gray-200 dark:border-slate-700 shadow-lg'
          >
            <p className='text-sm sm:text-base text-gray-600 dark:text-gray-400 mb-4'>
              Keep learning and leveling up! 🚀
            </p>
            <p className='text-lg sm:text-xl font-bold text-gray-900 dark:text-white'>
              {completedTopics === totalTopics
                ? "🎉 You've mastered all system design topics!"
                : `${Math.round(overallProgressPercent)}% Complete - ${totalTopics - completedTopics} topics to go!`}
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
