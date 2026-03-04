'use client';

import { Stage } from '@/lib/problems';
import { CategorySection } from './CategorySection';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface StageViewProps {
  stage: Stage;
  onToggleProblem: (categoryId: string, problemId: string) => void;
}

export function StageView({ stage, onToggleProblem }: StageViewProps) {
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(
    new Set(stage.categories.map((c) => c.id)),
  );

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const totalProblems = stage.categories.reduce(
    (sum, c) => sum + c.problems.length,
    0,
  );
  const completedProblems = stage.categories.reduce(
    (sum, c) => sum + c.problems.filter((p) => p.completed).length,
    0,
  );
  const stageProgressPercent = (completedProblems / totalProblems) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='mb-8'
    >
      {/* Stage Header */}
      <div className='mb-4 sm:mb-6'>
        <div className='flex flex-col sm:flex-row sm:items-start gap-2 sm:gap-3 mb-2 sm:mb-2'>
          <span className='text-3xl sm:text-4xl flex-shrink-0'>
            {stage.emoji}
          </span>
          <div className='min-w-0 flex-1'>
            <h2 className='text-base sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white break-words'>
              Stage {stage.number} — {stage.name}
            </h2>
            <p className='text-xs text-gray-600 dark:text-gray-400 mt-0.5'>
              {stage.description}
            </p>
          </div>
        </div>

        {/* Overall Progress */}
        <div className='mt-2 sm:mt-3 p-2.5 sm:p-3 bg-gradient-to-r from-blue-50 dark:from-blue-950 to-purple-50 dark:to-purple-950 rounded-xl border border-blue-200 dark:border-blue-800'>
          <div className='flex items-center justify-between gap-2 mb-1.5'>
            <span className='text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300'>
              {completedProblems} / {totalProblems}
            </span>
            <span className='text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400'>
              {Math.round(stageProgressPercent)}%
            </span>
          </div>
          <div className='w-full h-1.5 sm:h-2 bg-gray-300 dark:bg-slate-600 rounded-full overflow-hidden border border-blue-200 dark:border-blue-800'>
            <motion.div
              className='h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full'
              initial={{ width: 0 }}
              animate={{ width: `${stageProgressPercent}%` }}
              transition={{ duration: 0.8 }}
            />
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className='space-y-2 sm:space-y-3'>
        {stage.categories.map((category) => (
          <CategorySection
            key={category.id}
            category={category}
            onToggleProblem={(problemId) =>
              onToggleProblem(category.id, problemId)
            }
            isExpanded={expandedCategories.has(category.id)}
            onToggleExpanded={() => toggleCategory(category.id)}
          />
        ))}
      </div>
    </motion.div>
  );
}
