'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useWatch } from 'react-hook-form';

// Enhanced addons with more detailed icons using SVG
const addons = [
  {
    id: 'deep_cleaning',
    label: 'Deep Cleaning',
    price: 30,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 6l3 6v6h12v-6l3-6H3z" />
        <path d="M7 12h10" />
        <path d="M8 18v-6" />
        <path d="M16 18v-6" />
      </svg>
    ),
    description: 'Thorough cleaning of all surfaces and hard-to-reach areas'
  },
  {
    id: 'laundry',
    label: 'Laundry',
    price: 9,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 8v8" />
        <path d="M8 12h8" />
      </svg>
    ),
    description: 'Per load of laundry washed, dried and folded'
  },
  {
    id: 'inside_fridge',
    label: 'Inside the Fridge',
    price: 15,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <line x1="5" y1="10" x2="19" y2="10" />
        <line x1="9" y1="6" x2="9" y2="6" />
        <line x1="9" y1="14" x2="9" y2="14" />
      </svg>
    ),
    description: 'Complete cleaning of refrigerator interior'
  },
  {
    id: 'inside_windows',
    label: 'Inside Windows',
    price: 10,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="12" y1="3" x2="12" y2="21" />
      </svg>
    ),
    description: 'Streak-free cleaning of interior window surfaces'
  },
];

function AddOnsSelector({ register, setValue, control }) {
  const [hoveredAddon, setHoveredAddon] = useState(null);
  const selectedAddons = useWatch({ control, name: 'addons', defaultValue: [] });
  const [showSelectionConfetti, setShowSelectionConfetti] = useState(false);

  const toggleAddon = (addon) => {
    let updated;
    const isCurrentlySelected = selectedAddons.find((a) => a.id === addon.id);

    if (isCurrentlySelected) {
      updated = selectedAddons.filter((a) => a.id !== addon.id);
    } else {
      updated = [...selectedAddons, { id: addon.id, price: addon.price }];
      // Trigger confetti animation when adding a new addon
      setShowSelectionConfetti(addon.id);
      setTimeout(() => setShowSelectionConfetti(false), 1000);
    }
    setValue('addons', updated);
  };

  const totalPrice = selectedAddons.reduce((sum, item) => sum + item.price, 0);

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

  const pulseVariants = {
    pulse: {
      scale: [1, 1.03, 1],
      transition: {
        repeat: Infinity,
        repeatType: "reverse",
        duration: 2.5
      }
    }
  };

  const iconVariants = {
    hover: {
      rotate: [-5, 5, -5, 5, 0],
      transition: { duration: 0.5 }
    },
    selected: {
      scale: [1, 1.2, 1],
      transition: { duration: 0.5 }
    }
  };

  const priceVariants = {
    initial: { scale: 1 },
    update: {
      scale: [1, 1.3, 1],
      transition: { duration: 0.3 }
    }
  };

  const confettiVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: [0, 1, 0],
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      whileHover={{ boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
    >
      {/* Header with gradient accent */}
      <motion.div variants={itemVariants} className="relative mb-6">
        <div className="absolute -left-7 top-0 bottom-0 w-2 bg-gradient-to-b from-indigo-400 to-orange-400 rounded-full"></div>
        <motion.h2
          className="text-xl font-bold text-gray-800 mb-2"
          animate="pulse"
          variants={pulseVariants}
        >
          STEP 4: Select Add-ons
        </motion.h2>
        <p className="text-sm text-gray-600 mb-2">
          Customize your cleaning service with these additional options.
        </p>
      </motion.div>

      {/* Add-ons grid */}
      <motion.div
        variants={itemVariants}
        className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6"
      >
        {addons.map((addon) => {
          const isSelected = selectedAddons.find((a) => a.id === addon.id);
          const isHovered = hoveredAddon === addon.id;

          return (
            <motion.div
              key={addon.id}
              onClick={() => toggleAddon(addon)}
              onMouseEnter={() => setHoveredAddon(addon.id)}
              onMouseLeave={() => setHoveredAddon(null)}
              className={`relative p-5 rounded-xl cursor-pointer transition-all duration-300 overflow-hidden ${isSelected
                ? 'bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-300 shadow-md'
                : 'bg-white border border-gray-200 hover:border-blue-200 hover:shadow-sm'
                }`}
              whileHover={{
                scale: 1.03,
                y: -5,
                boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.97 }}
              layout
            >
              {/* Background confetti effect when selected */}
              <AnimatePresence>
                {showSelectionConfetti === addon.id && (
                  <motion.div
                    className="absolute inset-0 pointer-events-none"
                    variants={confettiVariants}
                    initial="initial"
                    animate="animate"
                    exit={{ opacity: 0 }}
                  >
                    {[...Array(20)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 rounded-full"
                        style={{
                          backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD', '#BFDBFE'][i % 4],
                          top: `${Math.random() * 100}%`,
                          left: `${Math.random() * 100}%`,
                        }}
                        animate={{
                          y: [0, -(Math.random() * 100 + 50)],
                          x: [0, (Math.random() * 100 - 50)],
                          opacity: [1, 0],
                          scale: [0, 1, 0.5],
                        }}
                        transition={{
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Selection indicator */}
              <AnimatePresence>
                {isSelected && (
                  <motion.div
                    className="absolute top-3 right-3 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  >
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                    </svg>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Animated border highlight on hover */}
              {isHovered && !isSelected && (
                <motion.div
                  className="absolute inset-0 pointer-events-none border-2 border-blue-300 rounded-xl"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  layoutId="outline"
                />
              )}

              {/* Icon with animations */}
              <motion.div
                className={`text-3xl mb-3 ${isSelected ? 'text-blue-500' : 'text-gray-600'}`}
                animate={isSelected ? "selected" : isHovered ? "hover" : ""}
                variants={iconVariants}
              >
                {addon.icon}
              </motion.div>

              {/* Label with subtle animation */}
              <motion.div
                className="text-base font-medium mb-1"
                animate={{
                  x: isHovered ? 3 : 0,
                  transition: { duration: 0.2 }
                }}
              >
                {addon.label}
              </motion.div>

              {/* Description */}
              <div className="text-xs text-gray-500 mb-3">{addon.description}</div>

              {/* Price with animation */}
              <motion.div
                className={`text-sm font-semibold ${isSelected ? 'text-blue-600' : 'text-gray-700'}`}
                key={`price-${isSelected}`}
                initial="initial"
                animate="update"
                variants={priceVariants}
              >
                ${addon.price}
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Total price with animations */}
      <motion.div
        variants={itemVariants}
        className="mt-6 p-4 bg-gradient-to-r from-[#2112ac] to-[#1115ac] text-white rounded-lg overflow-hidden relative"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {/* Background animated elements */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            repeatType: "mirror",
          }}
          style={{
            background: 'radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10%) 0 0, radial-gradient(circle, rgba(255,255,255,0.1) 10%, transparent 10%) 8px 8px',
            backgroundSize: '16px 16px',
          }}
        />

        <div className="flex items-center justify-between relative z-10">
          <span className="text-white opacity-90 font-medium">Add-on Services:</span>
          <div className="flex flex-col items-end">
            <motion.span
              className="text-lg font-bold"
              key={totalPrice} // Force animation when price changes
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              ${totalPrice.toFixed(2)}
            </motion.span>

            <AnimatePresence>
              {selectedAddons.length > 0 && (
                <motion.span
                  className="text-xs text-blue-100"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  {selectedAddons.length} item{selectedAddons.length !== 1 ? 's' : ''} selected
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Animated progress bar */}
        <AnimatePresence>
          {selectedAddons.length > 0 && (
            <motion.div
              className="absolute bottom-0 left-0 h-1 bg-white opacity-50"
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, (totalPrice / 60) * 100)}%` }}
              exit={{ width: 0 }}
              transition={{ duration: 0.3 }}
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Optional promo message */}
      <AnimatePresence>
        {selectedAddons.length >= 2 && (
          <motion.div
            className="mt-3 text-xs text-center text-green-600 font-medium"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            Great choices! Add one more service and save an extra 5% on your total.
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default AddOnsSelector;
