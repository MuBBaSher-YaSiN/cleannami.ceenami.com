'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdditionalInformationComponent = ({ register, control, watch }) => {
  const [focusedField, setFocusedField] = useState(null);
  const [expandedHelp, setExpandedHelp] = useState(null);

  // Get the current value of entryMethod for conditional rendering
  const entryMethod = watch ? watch('entryMethod') : '';

  // Options for dropdown selections
  const parkingOptions = [
    'Street parking',
    'Driveway',
    'Garage',
    'Parking lot',
    'No parking available'
  ];

  const flexibilityOptions = [
    'Yes, my schedule is flexible',
    'No, I need the exact day/time selected',
    'Somewhat flexible (±2 hours)'
  ];

  const entryOptions = [
    'I will be home',
    'Doorman',
    'Key in lockbox',
    'Smart lock code',
    'Hide key somewhere',
    'Neighbor/friend will let them in'
  ];

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
      whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header with gradient accent */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-purple-400 to-blue-500 rounded-full"></div>
        <h2 className="text-xl font-bold text-gray-800 mb-2">Additional Information</h2>
        <p className="text-sm text-gray-600 mb-4">
          Help us prepare for your cleaning service with these important details.
        </p>
      </motion.div>

      {/* Parking options */}
      <motion.div variants={itemVariants} className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">
            Where can your cleaners park? <span className="text-red-500">*</span>
          </label>
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setExpandedHelp(expandedHelp === 'parking' ? null : 'parking')}
            className="text-[#1115ac] text-xs flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
            Help
          </motion.button>
        </div>

        <AnimatePresence>
          {expandedHelp === 'parking' && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-3 p-3 rounded-md bg-blue-50 text-xs text-blue-700"
            >
              Letting us know where to park helps our cleaners arrive on time and prepared. If parking is difficult in your area, please provide specific instructions.
            </motion.div>
          )}
        </AnimatePresence>

        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" />
              <path d="M2 13.692V16a2 2 0 002 2h12a2 2 0 002-2v-2.308A24.974 24.974 0 0110 15a24.98 24.98 0 01-8-1.308z" />
            </svg>
          </div>
          <motion.select
            {...register('parking', { required: true })}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
            onFocus={() => setFocusedField('parking')}
            onBlur={() => setFocusedField(null)}
            whileFocus={{ scale: 1.01 }}
            animate={focusedField === 'parking' ? { borderColor: "#3B82F6" } : {}}
          >
            <option value="">Select an option</option>
            {parkingOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </motion.select>
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            animate={{
              rotate: focusedField === 'parking' ? 180 : 0,
              color: focusedField === 'parking' ? "#3B82F6" : "#94A3B8"
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Flexibility options */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Is your day/time flexible? <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.select
            {...register('flexibility', { required: true })}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
            onFocus={() => setFocusedField('flexibility')}
            onBlur={() => setFocusedField(null)}
            whileFocus={{ scale: 1.01 }}
            animate={focusedField === 'flexibility' ? { borderColor: "#3B82F6" } : {}}
          >
            <option value="">Select an option</option>
            {flexibilityOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </motion.select>
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            animate={{
              rotate: focusedField === 'flexibility' ? 180 : 0,
              color: focusedField === 'flexibility' ? "#3B82F6" : "#94A3B8"
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Entry options */}
      <motion.div variants={itemVariants} className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          How can your cleaners get inside your home? <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.select
            {...register('entryMethod', { required: true })}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
            onFocus={() => setFocusedField('entryMethod')}
            onBlur={() => setFocusedField(null)}
            whileFocus={{ scale: 1.01 }}
            animate={focusedField === 'entryMethod' ? { borderColor: "#3B82F6" } : {}}
          >
            <option value="">Select an option</option>
            {entryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </motion.select>
          <motion.div
            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2"
            animate={{
              rotate: focusedField === 'entryMethod' ? 180 : 0,
              color: focusedField === 'entryMethod' ? "#3B82F6" : "#94A3B8"
            }}
            transition={{ duration: 0.3 }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>
        </div>

        {/* Conditional follow-up question for specific entry methods */}
        <AnimatePresence>
          {entryMethod && ['Key in lockbox', 'Smart lock code', 'Hide key somewhere'].includes(entryMethod) && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="mt-4"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.1 }}
                className="p-3 mb-4 bg-yellow-50 border border-yellow-100 rounded-lg flex items-start gap-3"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
                <p className="text-sm text-yellow-800">
                  This information is kept secure and only shared with your assigned cleaner.
                </p>
              </motion.div>

              <label className="block text-sm font-medium text-gray-700 mb-2">
                Please provide details about access:
              </label>
              <div className="relative">
                <div className="absolute left-3 top-3 text-[#1115ac]">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </div>
                <motion.input
                  type="text"
                  {...register('entryDetails')}
                  placeholder="E.g., lockbox code, location of hidden key, etc."
                  className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
                  whileHover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}
                  whileFocus={{ scale: 1.01 }}
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Additional notes */}
      <motion.div variants={itemVariants} className="mb-2">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Anything else your cleaners should know about?
        </label>
        <div className="relative">
          <div className="absolute left-3 top-3 text-[#1115ac]">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
          </div>
          <motion.textarea
            {...register('additionalNotes')}
            rows={4}
            placeholder="No one likes surprises. Please give your cleaners any additional details they should know about your home here."
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md resize-none"
            whileHover={{ boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)" }}
            whileFocus={{ scale: 1.005 }}
            onFocus={() => setFocusedField('additionalNotes')}
            onBlur={() => setFocusedField(null)}
          />
        </div>
      </motion.div>

      {/* Form completion indicator */}
      <motion.div
        className="flex justify-center mt-6"
        variants={itemVariants}
        animate={{ opacity: 1 }}
      >
        <motion.div
          className="w-10 h-1 bg-gradient-to-r from-purple-400 to-blue-500 rounded-full"
          initial={{ width: 10 }}
          animate={{ width: [10, 40, 10] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AdditionalInformationComponent;
