'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function HomePage() {
  const stages = [
    { number: 1, title: 'Foundation', description: 'Core fundamentals' },
    { number: 2, title: 'Practice', description: '202 problems' },
    { number: 3, title: 'Design', description: 'System design' },
    { number: 4, title: 'Excellence', description: 'Ace it' },
  ];

  return (
    <div className='min-h-screen bg-white text-black overflow-hidden'>
      {/* Minimal background - just white */}
      <div className='fixed inset-0 -z-10 bg-white' />

      {/* Main content */}
      <div className='relative z-10 min-h-screen flex flex-col'>
        {/* Minimal Navigation */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className='flex items-center justify-between px-6 sm:px-12 py-6 md:py-8 border-b border-gray-100'
        >
          <div className='text-2xl font-semibold tracking-tight'>Interview</div>
          <nav className='hidden sm:flex gap-8 text-sm font-medium text-gray-600'>
            <Link href='/problems' className='hover:text-black transition-colors duration-200'>
              Problems
            </Link>
            <Link href='/system-design' className='hover:text-black transition-colors duration-200'>
              Design
            </Link>
          </nav>
        </motion.div>

        {/* Hero Section */}
        <div className='flex-1 flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-16 lg:py-20'>
          {/* Main heading */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-center max-w-3xl mb-12'
          >
            <h1 className='text-5xl sm:text-6xl md:text-7xl font-semibold tracking-tight mb-6 leading-tight'>
              Master the Interview
            </h1>
            <p className='text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed'>
              A comprehensive platform for FAANG interview preparation. From coding fundamentals to system design expertise.
            </p>
          </motion.div>

          {/* Interview Preparation Journey */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className='w-full max-w-3xl mb-16'
          >
            <div className='grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4'>
              {stages.map((stage, idx) => (
                <motion.div
                  key={stage.number}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + idx * 0.1, duration: 0.5 }}
                  className='relative'
                >
                  <div className='bg-gray-50 rounded-2xl p-4 sm:p-6 text-center border border-gray-100 hover:border-gray-300 transition-all duration-200 hover:shadow-sm'>
                    <div className='inline-flex items-center justify-center w-10 h-10 rounded-full bg-black text-white font-semibold text-sm mb-3'>
                      {stage.number}
                    </div>
                    <h3 className='font-semibold text-sm sm:text-base mb-1'>{stage.title}</h3>
                    <p className='text-xs sm:text-sm text-gray-600'>{stage.description}</p>
                  </div>
                  {idx < stages.length - 1 && (
                    <div className='hidden sm:block absolute top-1/2 -right-4 transform -translate-y-1/2 text-gray-300'>
                      <ArrowRight className='w-4 h-4' />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className='grid grid-cols-3 gap-6 sm:gap-12 mb-16 text-center'
          >
            <div>
              <div className='text-4xl sm:text-5xl font-semibold mb-2'>202</div>
              <p className='text-sm text-gray-600'>Problems</p>
            </div>
            <div>
              <div className='text-4xl sm:text-5xl font-semibold mb-2'>25+</div>
              <p className='text-sm text-gray-600'>Design Q&As</p>
            </div>
            <div>
              <div className='text-4xl sm:text-5xl font-semibold mb-2'>9</div>
              <p className='text-sm text-gray-600'>Stages</p>
            </div>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className='flex flex-col sm:flex-row gap-4 max-w-md w-full sm:w-auto'
          >
            <Link href='/problems' className='flex-1 sm:flex-none'>
              <motion.button
                whileHover={{ scale: 1.02, backgroundColor: '#1f1f1f' }}
                whileTap={{ scale: 0.98 }}
                className='w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl bg-black text-white font-medium text-sm transition-all'
              >
                Start Coding
              </motion.button>
            </Link>
            <Link href='/system-design' className='flex-1 sm:flex-none'>
              <motion.button
                whileHover={{ scale: 1.02, borderColor: '#000000' }}
                whileTap={{ scale: 0.98 }}
                className='w-full sm:w-auto px-8 py-3 sm:py-4 rounded-xl border-2 border-gray-300 text-black font-medium text-sm hover:border-black transition-colors'
              >
                Learn Design
              </motion.button>
            </Link>
          </motion.div>

          {/* Footer callout */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className='mt-16 pt-12 border-t border-gray-100 text-center'
          >
            <div className='flex items-center justify-center gap-2 text-sm text-gray-700 mb-2'>
              <CheckCircle2 className='w-4 h-4 text-gray-700' />
              <span>Progress tracking • Export/Import • Dark mode</span>
            </div>
            <p className='text-xs text-gray-500'>
              Built for serious developers preparing for FAANG companies
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
