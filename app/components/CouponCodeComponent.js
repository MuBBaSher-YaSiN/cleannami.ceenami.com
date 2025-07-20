'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const CouponCodeComponent = ({ register, setValue, control }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponStatus, setCouponStatus] = useState({ applied: false, message: '' });
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [isApplyHovered, setIsApplyHovered] = useState(false);

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

  const handleApplyCoupon = () => {
    // Predefined valid coupon codes
    const validCoupons = {
      'CLEAN10': 10,
      'CLEAN20': 20,
      'FIRST25': 25
    };

    if (!couponCode.trim()) {
      setCouponStatus({ applied: false, message: 'Please enter a coupon code' });
      return;
    }

    const upperCaseCode = couponCode.toUpperCase();

    // Create animation effect for success/error
    if (validCoupons[upperCaseCode]) {
      setValue('couponCode', upperCaseCode);
      setValue('couponDiscount', validCoupons[upperCaseCode]);
      setCouponStatus({
        applied: true,
        message: `Success! ${validCoupons[upperCaseCode]}% discount applied`
      });

      // Visual celebration for successful coupon
      const confetti = document.createElement('div');
      confetti.className = 'confetti-container';
      document.body.appendChild(confetti);

      setTimeout(() => {
        document.body.removeChild(confetti);
      }, 2000);

    } else {
      setCouponStatus({ applied: false, message: 'Invalid coupon code' });
      setValue('couponDiscount', 0);
    }
  };

  return (
    <motion.div
      className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-orange-400 to-purple-500 rounded-full"></div>
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-1"
          whileHover={{ scale: 1.01 }}
        >
          Discount code
        </motion.h2>
        <p className="text-sm text-gray-600 mb-4">
          If you have a discount code, enter it here
        </p>
      </motion.div>

      <motion.div
        className="flex flex-col sm:flex-row gap-3"
        variants={itemVariants}
      >
        <div className="relative flex-grow">
          <motion.div
            className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-400"
            animate={isInputFocused ?
              { scale: 1.2, color: "#2563EB" } :
              { scale: 1, color: "#60A5FA" }
            }
            transition={{ duration: 0.2 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 2a1 1 0 011 1v1h8V3a1 1 0 112 0v1h1a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2h1V3a1 1 0 011-1zm11 14a1 1 0 01-1 1H5a1 1 0 01-1-1v-7h12v7z" clipRule="evenodd" />
            </svg>
          </motion.div>

          <motion.input
            type="text"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            onFocus={() => setIsInputFocused(true)}
            onBlur={() => setIsInputFocused(false)}
            placeholder="Discount Code (or leave this blank)"
            className="w-full pl-10 bg-white border border-blue-100 rounded-lg px-4 py-3 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent shadow-sm hover:shadow-md"
            whileFocus={{ scale: 1.005 }}
            style={{ caretColor: '#3B82F6' }}
          />

          {/* Animated clear button that appears when text is entered */}
          <AnimatePresence>
            {couponCode && (
              <motion.button
                type="button"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => {
                  setCouponCode('');
                  setCouponStatus({ applied: false, message: '' });
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          type="button"
          onClick={handleApplyCoupon}
          className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-3 rounded-lg shadow-md flex items-center justify-center min-w-[120px]"
          whileHover={{
            scale: 1.03,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          }}
          whileTap={{ scale: 0.97 }}
          onMouseEnter={() => setIsApplyHovered(true)}
          onMouseLeave={() => setIsApplyHovered(false)}
        >
          <motion.span
            animate={isApplyHovered ? { y: [-1, 1, -1] } : {}}
            transition={{ repeat: Infinity, duration: 0.6 }}
            className="font-medium"
          >
            APPLY
          </motion.span>
        </motion.button>
      </motion.div>

      {/* Message container with AnimatePresence for smooth transitions */}
      <div className="h-8 mt-2 relative">
        <AnimatePresence mode="wait">
          {couponStatus.message && (
            <motion.p
              key={couponStatus.message} // Force re-render on message change
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`text-sm flex items-center ${couponStatus.applied ? 'text-green-600' : 'text-red-500'}`}
            >
              <motion.span
                animate={couponStatus.applied ?
                  { rotate: [0, 15, 0, 15, 0] } :
                  { x: [-2, 2, -2, 0] }
                }
                transition={{ duration: 0.5 }}
                className="mr-2"
              >
                {couponStatus.applied ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                )}
              </motion.span>
              {couponStatus.message}
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Popular codes hint - appears when focused but no code entered yet */}
      <AnimatePresence>
        {isInputFocused && !couponCode && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 text-xs text-gray-500 overflow-hidden"
          >
            <p className="font-medium mb-1">Popular codes:</p>
            <div className="flex flex-wrap gap-2">
              {["CLEAN10", "CLEAN20", "FIRST25"].map(code => (
                <motion.button
                  key={code}
                  type="button"
                  onClick={() => setCouponCode(code)}
                  className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200 text-gray-600 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {code}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hidden fields for form data */}
      <input type="hidden" {...register('couponCode')} />
      <input type="hidden" {...register('couponDiscount')} />

      {/* CSS for confetti animation */}
      <style jsx global>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        
        .confetti-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 100;
        }
        
        .confetti-container::before,
        .confetti-container::after {
          content: '';
          position: absolute;
          top: -10px;
          left: 50%;
          width: 10px;
          height: 10px;
          opacity: 0;
        }
        
        .confetti-container::before {
          background-color: #3B82F6;
          animation: confetti-fall 2s ease-out;
          left: 40%;
        }
        
        .confetti-container::after {
          background-color: #10B981;
          animation: confetti-fall 1.5s ease-out 0.2s;
          left: 60%;
        }
      `}</style>
    </motion.div>
  );
};

export default CouponCodeComponent;
