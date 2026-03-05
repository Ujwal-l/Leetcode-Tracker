// 'use client';

// import Link from 'next/link';
// import { motion } from 'framer-motion';

// export function Header() {
//   return (
//     <motion.header
//       initial={{ opacity: 0, y: -20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.6 }}
//       className='sticky top-0 z-50 bg-white border-b border-gray-100'
//     >
//       <div className='max-w-7xl mx-auto px-6 sm:px-8 py-6 md:py-8'>
//         <div className='flex items-center justify-between'>
//           <Link
//             href='/'
//             className='text-2xl font-semibold tracking-tight hover:text-gray-600 transition-colors'
//           >
//             Interview
//           </Link>
//           <nav className='hidden sm:flex gap-8 text-sm font-medium text-gray-600'>
//             <Link
//               href='/problems'
//               className='hover:text-black transition-colors duration-200'
//             >
//               Problems
//             </Link>
//             <Link
//               href='/system-design'
//               className='hover:text-black transition-colors duration-200'
//             >
//               Design
//             </Link>
//           </nav>
//         </div>
//       </div>
//     </motion.header>
//   );
// }
