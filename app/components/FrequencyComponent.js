'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FrequencyComponent = ({ register, setValue, control }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('one-time');
  const [hoveredOption, setHoveredOption] = useState(null);

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

  // Frequency options with their discount rates and icons
  const frequencyOptions = [
    {
      id: 'every-4-weeks',
      label: 'Every 4 Weeks',
      discount: 5,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 16H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'every-3-weeks',
      label: 'Every 3 Weeks',
      discount: 5,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M8 16H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'every-2-weeks',
      label: 'Every 2 Weeks',
      discount: 10,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 12H8.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 12H16.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'every-week',
      label: 'Every Week',
      discount: 15,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 12H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      )
    },
    {
      id: 'one-time',
      label: 'One Time',
      discount: 0,
      icon: (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M8 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M16 2V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M3 9H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19 4H5C3.89543 4 3 4.89543 3 6V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V6C21 4.89543 20.1046 4 19 4Z" stroke="currentColor" strokeWidth="1.5" />
          <path d="M8 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      )
    }
  ];

  const handleFrequencySelect = (option) => {
    setSelectedFrequency(option.id);
    setValue('frequency', option.id);
    setValue('frequencyLabel', option.label);
    setValue('frequencyDiscount', option.discount);
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
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-400 to-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">How often?</h2>

        {/* Discount info cards */}
        <motion.div
          className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl p-4 mt-4"
          variants={itemVariants}
        >
          <p className="text-sm text-gray-700 font-medium mb-3">Save with recurring service:</p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {frequencyOptions.slice(0, 4).map((option, index) => (
              <motion.div
                key={option.id}
                className={`flex items-center space-x-2 p-2 rounded-md ${option.discount > 0 ? 'bg-white/50 border border-blue-100' : 'opacity-50'
                  }`}
                whileHover={{ scale: 1.03 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <div className="flex items-center justify-center">
                  <div className={`h-2 w-2 rounded-full ${option.discount >= 15 ? 'bg-green-500' :
                    option.discount >= 10 ? 'bg-green-400' :
                      option.discount > 0 ? 'bg-green-300' :
                        'bg-gray-300'
                    }`}></div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-medium">{option.label}</p>
                  <p className="text-xs text-green-600 font-bold">
                    {option.discount > 0 ? `${option.discount}% Off` : 'Regular Price'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </motion.div>

      {/* Frequency selection buttons */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3"
      >
        {frequencyOptions.map((option) => (
          <motion.button
            key={option.id}
            type="button"
            onClick={() => handleFrequencySelect(option)}
            onMouseEnter={() => setHoveredOption(option.id)}
            onMouseLeave={() => setHoveredOption(null)}
            className={`relative overflow-hidden rounded-lg transition-all py-3 px-2 ${selectedFrequency === option.id
              ? 'bg-gradient-to-br from-blue-500 to-[#1115ac] text-white border-0 shadow-md'
              : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
              }`}
            whileHover={{
              y: -3,
              boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.1)"
            }}
            whileTap={{ scale: 0.97 }}
            animate={selectedFrequency === option.id ? { y: -3 } : { y: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            {/* Animated ripple effect on selection */}
            <AnimatePresence>
              {selectedFrequency === option.id && (
                <motion.div
                  className="absolute inset-0 bg-white opacity-20"
                  initial={{ scale: 0, opacity: 0.8, x: 0, y: 0 }}
                  animate={{ scale: 2, opacity: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                />
              )}
            </AnimatePresence>

            {/* Discount badge */}
            {option.discount > 0 && (
              <motion.div
                className={`absolute -top-1 -right-1 bg-green-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center ${selectedFrequency === option.id ? 'bg-white text-blue-600' : ''
                  }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 15, delay: 0.1 }}
              >
                {option.discount}%
              </motion.div>
            )}

            <div className="flex flex-col items-center justify-center relative z-10">
              <motion.div
                className={`mb-1 ${selectedFrequency === option.id ? 'text-white' : 'text-blue-500'}`}
                animate={hoveredOption === option.id || selectedFrequency === option.id ?
                  { scale: 1.2, y: -2 } : { scale: 1, y: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              >
                {option.icon}
              </motion.div>
              <span className="text-sm font-medium">{option.label}</span>
            </div>
          </motion.button>
        ))}
      </motion.div>

      {/* Hidden fields for form data */}
      <input type="hidden" {...register('frequency')} value={selectedFrequency} />
      <input type="hidden" {...register('frequencyDiscount')} />
      <input type="hidden" {...register('frequencyLabel')} />

      {/* Savings indicator */}
      <AnimatePresence>
        {selectedFrequency !== 'one-time' && (
          <motion.div
            className="mt-5 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="inline-block bg-green-100 text-green-700 rounded-full px-4 py-1 text-sm font-medium"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              You're saving {frequencyOptions.find(opt => opt.id === selectedFrequency)?.discount}% on each cleaning!
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default FrequencyComponent;
