'use client';

import { Problem } from '@/lib/problems';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProblemCardProps {
  problem: Problem;
  onToggle: (id: string) => void;
  index?: number;
}

export function ProblemCard({
  problem,
  onToggle,
  index = 0,
}: ProblemCardProps) {
  const difficultyColor = {
    Easy: 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800',
    Medium:
      'text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800',
    Hard: 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      onClick={() => onToggle(problem.id)}
      whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.15)' }}
      className={`p-2 sm:p-2.5 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95 min-h-[2.5rem] sm:min-h-[3rem] flex items-center justify-between ${
        problem.completed
          ? 'bg-gray-100 dark:bg-slate-700 border-gray-300 dark:border-slate-600'
          : 'bg-white dark:bg-slate-800 border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500'
      }`}
      style={{
        boxShadow: problem.completed
          ? 'inset 0 2px 4px rgba(0, 0, 0, 0.05)'
          : '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <div className='flex-1 min-w-0 pr-2'>
        <h4
          className={`font-medium text-xs truncate ${
            problem.completed
              ? 'line-through text-gray-500 dark:text-gray-400'
              : 'text-gray-800 dark:text-gray-100'
          }`}
          title={problem.title}
        >
          {problem.title}
        </h4>
        <p
          className={`text-xs mt-0.5 border rounded-full px-1 py-0.5 w-fit ${difficultyColor[problem.difficulty]}`}
        >
          {problem.difficulty}
        </p>
      </div>
      <div
        className={`flex-shrink-0 w-4 h-4 sm:w-5 sm:h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
          problem.completed
            ? 'bg-green-500 dark:bg-green-600 border-green-600 dark:border-green-700'
            : 'border-gray-300 dark:border-slate-500 hover:border-blue-500 dark:hover:border-blue-500'
        }`}
      >
        {problem.completed && (
          <Check className='w-2.5 h-2.5 sm:w-3 sm:h-3 text-white' />
        )}
      </div>
    </motion.div>
  );
}
