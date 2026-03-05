'use client';

import { Category } from '@/lib/problems';
import { ProblemCard } from './ProblemCard';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface CategorySectionProps {
  category: Category;
  onToggleProblem: (id: string) => void;
  isExpanded?: boolean;
  onToggleExpanded?: () => void;
}

export function CategorySection({
  category,
  onToggleProblem,
  isExpanded = true,
  onToggleExpanded,
}: CategorySectionProps) {
  const completedCount = category.problems.filter((p) => p.completed).length;
  const totalCount = category.problems.length;
  const progressPercent = (completedCount / totalCount) * 100;

  const colorMap: { [key: string]: string } = {
    'bg-blue-50 border-blue-200': 'bg-gray-50 border-gray-200',
    'bg-amber-50 border-amber-200': 'bg-gray-50 border-gray-200',
    'bg-green-50 border-green-200': 'bg-gray-50 border-gray-200',
    'bg-red-50 border-red-200': 'bg-gray-50 border-gray-200',
    'bg-indigo-50 border-indigo-200': 'bg-gray-50 border-gray-200',
    'bg-teal-50 border-teal-200': 'bg-gray-50 border-gray-200',
    'bg-orange-50 border-orange-200': 'bg-gray-50 border-gray-200',
    'bg-pink-50 border-pink-200': 'bg-gray-50 border-gray-200',
    'bg-lime-50 border-lime-200': 'bg-gray-50 border-gray-200',
    'bg-cyan-50 border-cyan-200': 'bg-gray-50 border-gray-200',
    'bg-violet-50 border-violet-200': 'bg-gray-50 border-gray-200',
  };

  const darkColor = colorMap[category.color] || category.color;

  return (
    <div
      className={`rounded-2xl border-2 overflow-hidden ${darkColor} transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 cursor-pointer`}
      style={{
        boxShadow:
          '0 10px 30px rgba(0, 0, 0, 0.1), 0 0 20px rgba(59, 130, 246, 0.1)',
        transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
      }}
    >
      <div
        onClick={onToggleExpanded}
        className='p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3 cursor-pointer hover:opacity-90 transition-opacity'
      >
        <div className='flex items-start gap-2 sm:gap-3 flex-1 min-w-0'>
          <div className='min-w-0 flex-1'>
            <h3 className='font-bold text-gray-800 dark:text-gray-100 text-xs sm:text-sm break-words'>
              {category.name}
            </h3>
            <p className='text-xs text-gray-600 dark:text-gray-400'>
              {completedCount} / {totalCount}
            </p>
          </div>
        </div>
        <div className='flex items-center gap-1.5 sm:gap-2 flex-shrink-0'>
          <div className='w-14 sm:w-20 h-1 sm:h-2 bg-gray-300 dark:bg-slate-600 rounded-full overflow-hidden'>
            <motion.div
              className='h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full'
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <ChevronDown
            className={`w-4 h-4 text-gray-600 dark:text-gray-400 transition-transform flex-shrink-0 ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {isExpanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className='bg-white dark:bg-slate-700 bg-opacity-50 dark:bg-opacity-30 border-t-2 p-2 sm:p-3'
        >
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-1.5 sm:gap-2'>
            {category.problems.map((problem, idx) => (
              <ProblemCard
                key={problem.id}
                problem={problem}
                onToggle={onToggleProblem}
                index={idx}
              />
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}
