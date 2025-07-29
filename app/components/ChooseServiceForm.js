'use client';

import { motion } from 'framer-motion';

const ChooseServiceForm = ({ register }) => {
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
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">STEP 4: CHOOSE YOUR SERVICE</h2>
      </motion.div>

      {/* Service selection grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Bedrooms select */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
            </svg>
          </div>
          <select
            {...register('bedrooms')}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          >
            <option value="">Studio</option>
            <option value="1 Bedroom">1 Bedroom</option>
            <option value="2 Bedrooms">2 Bedrooms</option>
            <option value="3 Bedrooms">3 Bedrooms</option>
            <option value="4 Bedrooms">4 Bedrooms</option>
            <option value="5+ Bedrooms">5+ Bedrooms</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1115ac]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </motion.div>

        {/* Full Bathrooms select */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            {...register('fullBathrooms')}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          >
            <option value="1">1 Full Bathroom</option>
            <option value="2">2 Full Bathrooms</option>
            <option value="3">3 Full Bathrooms</option>
            <option value="4">4 Full Bathrooms</option>
            <option value="5+">5+ Full Bathrooms</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1115ac]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </motion.div>

        {/* Half Bathrooms select */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 7H7v6h6V7z" />
              <path fillRule="evenodd" d="M7 2a1 1 0 012 0v1h2V2a1 1 0 112 0v1h2a2 2 0 012 2v2h1a1 1 0 110 2h-1v2h1a1 1 0 110 2h-1v2a2 2 0 01-2 2h-2v1a1 1 0 11-2 0v-1H9v1a1 1 0 11-2 0v-1H5a2 2 0 01-2-2v-2H2a1 1 0 110-2h1V9H2a1 1 0 010-2h1V5a2 2 0 012-2h2V2zM5 5h10v10H5V5z" clipRule="evenodd" />
            </svg>
          </div>
          <select
            {...register('halfBathrooms')}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          >
            <option value="0">0 Half Bathrooms</option>
            <option value="1">1 Half Bathroom</option>
            <option value="2">2 Half Bathrooms</option>
            <option value="3">3 Half Bathrooms</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1115ac]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </motion.div>

        {/* Home Size select */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
          </div>
          <select {...register('homeSize')}
                      className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
>
  <option value="0-999">0 - 999 Sq Ft</option>
  <option value="1000-1499">1000 - 1499 Sq Ft</option>
  <option value="1500-1999">1500 - 1999 Sq Ft</option>
  <option value="2000-2499">2000 - 2499 Sq Ft</option>
  <option value="2500-2999">2500 - 2999 Sq Ft</option>
  <option value="3000+">3000+ Sq Ft</option>
</select>

          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#1115ac]">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </motion.div>
      </div>

      {/* Home illustration */}
      <motion.div
        variants={itemVariants}
        className="mt-6 flex justify-center opacity-60 hover:opacity-100 transition-opacity"
        whileHover={{ scale: 1.02 }}
      >
        <svg className="w-24 h-24 text-blue-300" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10,20V14H14V20H19V12H22L12,3L2,12H5V20H10Z" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default ChooseServiceForm;
