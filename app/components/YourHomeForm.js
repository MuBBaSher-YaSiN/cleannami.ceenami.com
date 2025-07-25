'use client';

import { motion } from 'framer-motion';

const YourHomeForm = ({ register }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300, damping: 24 }
    }
  };

  return (
    <motion.div
      className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with gradient accent */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-indigo-400 to-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">STEP 3: YOUR HOME</h2>
        <p className="text-sm text-gray-500">Where would you like the cleaning?</p>
      </motion.div>

      {/* First row of inputs */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div className="md:col-span-2 relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <input
            {...register('address')}
            placeholder="Address*"
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            {...register('apt')}
            placeholder="Apt/Suite #"
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </div>
      </motion.div>

      {/* Second row of inputs */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
          </div>
          <input
            {...register('city')}
            placeholder="City*"
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            {...register('state')}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          >
            <option value="">State*</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
            <option value="IL">Illinois</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1115ac]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 14a1 1 0 01-1 1H5a1 1 0 01-1-1V7h12v9z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            {...register('zip')}
            placeholder="Zip Code*"
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </div>
      </motion.div>

      {/* Map illustration */}
      <motion.div
        variants={itemVariants}
        className="mt-6 flex justify-center opacity-60 hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.02 }}
      >
        <svg className="w-24 h-24 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.5,3C19.98,3 22,5.02 22,7.5C22,10.5 19,13.26 17.61,14.44C17.28,14.71 16.72,14.71 16.39,14.44C15,13.26 12,10.5 12,7.5C12,5.02 14.02,3 16.5,3M16.5,5A2.5,2.5 0 0,0 14,7.5C14,9.5 16.5,12.33 16.5,12.33C16.5,12.33 19,9.5 19,7.5A2.5,2.5 0 0,0 16.5,5M8.83,17C10.7,17 12.5,17.34 14.11,18C15.17,18.43 16.14,18.94 17,19.5V8C16.21,7.19 15.3,6.5 14.28,6C12.46,5.34 10.5,5 8.5,5C6.5,5 4.54,5.34 2.72,6C1.7,6.5 0.79,7.19 0,8V19.5C0.9,18.94 1.87,18.43 2.93,18C4.5,17.34 6.65,17 8.83,17M20.18,13.4L21.58,15.18L17.16,18.9L14.42,16.5L15.83,15.18L17.16,16.31L20.18,13.4Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default YourHomeForm;



