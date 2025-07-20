'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SchedulingComponent = ({ register, setValue }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [focusedField, setFocusedField] = useState(null);

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

  // Available time slots
  const timeSlots = [
    '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  // Handle date selection
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    setValue('scheduledDate', date);
  };

  // Handle time selection
  const handleTimeChange = (e) => {
    const time = e.target.value;
    setSelectedTime(time);
    setValue('scheduledTime', time);
  };

  return (
    <motion.div
      className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      {/* Header with gradient accent */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-green-400 to-blue-500 rounded-full"></div>
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-2"
          whileHover={{ scale: 1.01 }}
        >
          When would you like your cleaners to come?
        </motion.h2>
        <motion.p
          className="text-sm text-gray-600 mb-2"
          initial={{ opacity: 0.8 }}
          animate={{ opacity: 1 }}
        >
          If you can't reserve the day and time that you want, feel free to call us at{' '}
          <motion.span
            className="text-blue-600 font-medium"
            whileHover={{ color: "#1E40AF" }}
          >
            1 (844) 700-1427
          </motion.span>{' '}
          and we will be happy to see if we can make scheduling arrangements for you.
        </motion.p>

        <motion.div
          className="bg-blue-50 border-l-4 border-blue-300 p-3 rounded-r-lg mt-3"
          variants={itemVariants}
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          <p className="text-sm text-gray-600 italic">
            The time below is the time the cleaners will arrive.
          </p>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Date picker with animation */}
        <motion.div
          className="relative"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <motion.div
            className="absolute left-3 top-3 text-[#1115ac]"
            animate={focusedField === 'date' ? { rotate: [0, 15, 0, -15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <motion.input
            type="date"
            {...register('scheduledDate')}
            onChange={handleDateChange}
            onFocus={() => setFocusedField('date')}
            onBlur={() => setFocusedField(null)}
            className="pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
            min={new Date().toISOString().split('T')[0]}
            whileFocus={{ scale: 1.01 }}
            style={{ caretColor: '#3B82F6' }}
          />

          {selectedDate && (
            <motion.div
              className="absolute right-3 top-3 text-green-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>

        {/* Time picker with animation */}
        <motion.div
          className="relative"
          whileHover={{ y: -2 }}
          whileTap={{ y: 0 }}
        >
          <motion.div
            className="absolute left-3 top-3 text-[#1115ac]"
            animate={focusedField === 'time' ? { rotate: [0, 15, 0, -15, 0] } : {}}
            transition={{ duration: 0.5 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
          </motion.div>
          <motion.select
            {...register('scheduledTime')}
            onChange={handleTimeChange}
            onFocus={() => setFocusedField('time')}
            onBlur={() => setFocusedField(null)}
            className="appearance-none pl-10 w-full bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#1115ac] focus:border-transparent shadow-sm hover:shadow-md"
            whileFocus={{ scale: 1.01 }}
          >
            <option value="">Select a time</option>
            {timeSlots.map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </motion.select>

          <motion.div
            className="pointer-events-none absolute inset-y-0 right-3 flex items-center"
            animate={{
              y: focusedField === 'time' ? -2 : 0,
              color: focusedField === 'time' ? '#3B82F6' : '#94A3B8'
            }}
          >
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </motion.div>

          {selectedTime && (
            <motion.div
              className="absolute right-10 top-3 text-green-500"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </motion.div>
          )}
        </motion.div>
      </motion.div>

      {/* Decorative elements */}
      <AnimatePresence>
        {(selectedDate && selectedTime) && (
          <motion.div
            className="mt-6 flex justify-center items-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <motion.div
              className="flex items-center p-3 bg-green-50 border border-green-100 rounded-lg text-green-700 text-sm"
              whileHover={{ scale: 1.03, boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.05)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>Scheduled for {selectedDate} at {selectedTime}</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SchedulingComponent;
