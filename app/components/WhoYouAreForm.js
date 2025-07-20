'use client';

import { motion } from 'framer-motion';

const WhoYouAreForm = ({ register }) => {
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
      className="rounded-xl my-6 p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header with gradient accent */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-1">STEP 1: WHO YOU ARE</h2>
        <p className="text-sm text-gray-500">
          This information will be used to contact you about your service.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
        {/* First Name Input */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="First Name*"
            {...register('firstName')}
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </motion.div>

        {/* Last Name Input */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Last Name*"
            {...register('lastName')}
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </motion.div>

        {/* Email Input */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <input
            type="email"
            placeholder="Email*"
            {...register('email')}
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </motion.div>

        {/* Phone Input */}
        <motion.div variants={itemVariants} className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
          </div>
          <input
            type="tel"
            placeholder="Phone*"
            {...register('phone')}
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
          />
        </motion.div>
      </div>

      {/* Text Message Checkbox */}
      {/* <motion.div 
        variants={itemVariants}
        className="flex items-start gap-3"
        whileHover={{ scale: 1.01 }}
      >
        <div className="relative flex items-center h-5 mt-1">
          <input
            type="checkbox"
            {...register('receiveTextReminders')}
            className="appearance-none h-5 w-5 border border-blue-200 rounded-md bg-white checked:bg-blue-500 checked:border-blue-500 focus:outline-none transition duration-200 cursor-pointer"
          />
          <svg 
            className="absolute text-white w-3 h-3 pointer-events-none left-1 top-1 opacity-0 peer-checked:opacity-100 transition-opacity" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <label className="text-sm text-gray-600">
          Send me reminders about my booking<br />via text message
        </label>
      </motion.div> */}
    </motion.div>
  );
};

export default WhoYouAreForm;
