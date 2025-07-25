// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { useWatch } from 'react-hook-form'

// const FrequencyComponent = ({ register, setValue, control }) => {
//   const [selectedFrequency, setSelectedFrequency] = useState('one-time')
//   const [hoveredOption, setHoveredOption] = useState(null)

//   const cleaningType = useWatch({ control, name: 'cleaningType' })

//   useEffect(() => {
//     // Reset when cleaning type changes
//     if (cleaningType === 'airbnb') {
//       setValue('frequency', 'subscription')
//       setValue('frequencyLabel', 'Airbnb Subscription')
//       setValue('frequencyDiscount', 0)
//     } else {
//       setValue('frequency', 'one-time')
//       setValue('frequencyLabel', 'One Time')
//       setValue('frequencyDiscount', 0)
//     }
//   }, [cleaningType])

//   const frequencyOptions = [
//     {
//       id: 'every-4-weeks',
//       label: 'Every 4 Weeks',
//       discount: 5
//     },
//     {
//       id: 'every-3-weeks',
//       label: 'Every 3 Weeks',
//       discount: 5
//     },
//     {
//       id: 'every-2-weeks',
//       label: 'Every 2 Weeks',
//       discount: 10
//     },
//     {
//       id: 'every-week',
//       label: 'Every Week',
//       discount: 15
//     },
//     {
//       id: 'one-time',
//       label: 'One Time',
//       discount: 0
//     }
//   ]

//   const handleFrequencySelect = (option) => {
//     setSelectedFrequency(option.id)
//     setValue('frequency', option.id)
//     setValue('frequencyLabel', option.label)
//     setValue('frequencyDiscount', option.discount)
//   }

//   return (
//     <motion.div
//       className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <h2 className="text-xl font-bold mb-5">How often?</h2>

//       {cleaningType === 'airbnb' ? (
//         <>
//           <div className="mb-4">
//             <label className="block font-medium mb-1">Subscribe for how many months?</label>
//             <select
//               {...register('subscriptionLength')}
//               className="w-full border border-gray-300 rounded px-4 py-2"
//             >
//               <option value="1">1 Month</option>
//               <option value="2">2 Months</option>
//               <option value="3">3 Months</option>
//               <option value="4">4 Months</option>
//               <option value="5">5 Months</option>
//               <option value="6">6 Months</option>
//             </select>
//           </div>

//           <div className="mb-4">
//             <label className="block font-medium mb-1">Paste your calendar link (Airbnb, VRBO, etc)</label>
//             <input
//               {...register('calendarLink')}
//               type="url"
//               placeholder="https://..."
//               className="w-full border border-gray-300 rounded px-4 py-2"
//             />
//             kuh
//           </div>

//           <p className="text-sm italic text-gray-600">
//             This will be billed per turnover. Minimum 1 month.
//           </p>
//         </>
//       ) : (
//         <>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
//             {frequencyOptions.map((option) => (
//               <button
//                 key={option.id}
//                 type="button"
//                 onClick={() => handleFrequencySelect(option)}
//                 onMouseEnter={() => setHoveredOption(option.id)}
//                 onMouseLeave={() => setHoveredOption(null)}
//                 className={`rounded-lg py-3 px-2 text-sm font-medium transition-all ${selectedFrequency === option.id
//                   ? 'bg-[#1115ac] text-white shadow-md'
//                   : 'bg-white border border-gray-200 text-gray-700 hover:border-blue-300'
//                   }`}
//               >
//                 {option.label}
//                 {option.discount > 0 && (
//                   <span className="ml-2 text-green-600 font-bold">{option.discount}% off</span>
//                 )}
//               </button>
//             ))}
//           </div>

//           {selectedFrequency !== 'one-time' && (
//             <div className="mt-4 text-sm text-green-700 font-medium">
//               You're saving {frequencyOptions.find(f => f.id === selectedFrequency)?.discount}% per cleaning
//             </div>
//           )}
//         </>
//       )}

//       {/* Hidden inputs */}
//       <input type="hidden" {...register('frequency')} />
//       <input type="hidden" {...register('frequencyLabel')} />
//       <input type="hidden" {...register('frequencyDiscount')} />
//     </motion.div>
//   )
// }

// export default FrequencyComponent

'use client'

import { useEffect, useState } from 'react'
import { useWatch } from 'react-hook-form'

const FrequencyComponent = ({ register, setValue, control }) => {
  const [selectedFrequency, setSelectedFrequency] = useState('one-time')
  const cleaningType = useWatch({ control, name: 'cleaningType' }) // residential or airbnb

  useEffect(() => {
    if (cleaningType === 'airbnb') {
      setSelectedFrequency('subscription')
      setValue('frequency', 'subscription')
      setValue('frequencyLabel', 'Airbnb Subscription')
      setValue('frequencyDiscount', 0)
    } else {
      setSelectedFrequency('one-time')
      setValue('frequency', 'one-time')
      setValue('frequencyLabel', 'One Time')
      setValue('frequencyDiscount', 0)
    }
  }, [cleaningType])

  const handleFrequencySelect = (option) => {
    setSelectedFrequency(option.id)
    setValue('frequency', option.id)
    setValue('frequencyLabel', option.label)
    setValue('frequencyDiscount', option.discount)
  }

  const frequencyOptions = [
    {
      id: 'every-4-weeks',
      label: 'Every 4 Weeks',
      discount: 5
    },
    {
      id: 'every-3-weeks',
      label: 'Every 3 Weeks',
      discount: 5
    },
    {
      id: 'every-2-weeks',
      label: 'Every 2 Weeks',
      discount: 10
    },
    {
      id: 'every-week',
      label: 'Every Week',
      discount: 15
    },
    {
      id: 'one-time',
      label: 'One Time',
      discount: 0
    }
  ]

  return (
    <div className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100">
      <h2 className="text-xl font-bold text-gray-800 mb-5">How often?</h2>

      {cleaningType === 'airbnb' ? (
        <>
          <div className="mb-4">
            <label className="block font-medium mb-1">Subscribe for how many months?</label>
            <select
              {...register('subscriptionLength')}
              className="w-full border border-gray-300 rounded px-4 py-2"
            >
              <option value="1">1 Month</option>
              <option value="2">2 Months</option>
              <option value="3">3 Months</option>
              <option value="4">4 Months</option>
              <option value="5">5 Months</option>
              <option value="6">6 Months</option>
            </select>
          </div>

          <div className="mb-4">
            <label className="block font-medium mb-1">Paste your calendar link (Airbnb, VRBO, etc)</label>
            <input
              {...register('calendarLink')}
              type="url"
              placeholder="https://..."
              className="w-full border border-gray-300 rounded px-4 py-2"
            />
          </div>

          <p className="text-sm italic text-gray-600">
            You will be billed per turnover. Minimum 1 month subscription.
          </p>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {frequencyOptions.map((option) => (
              <button
                key={option.id}
                type="button"
                onClick={() => handleFrequencySelect(option)}
                className={`rounded-lg px-3 py-2 transition-all text-sm font-medium ${selectedFrequency === option.id
                  ? 'bg-[#1115ac] text-white shadow'
                  : 'bg-white border border-gray-300 hover:border-blue-400'
                  }`}
              >
                {option.label}
                {option.discount > 0 && (
                  <span className="block text-green-600 text-xs">{option.discount}% Off</span>
                )}
              </button>
            ))}
          </div>

          {selectedFrequency !== 'one-time' && (
            <p className="mt-4 text-sm text-green-700 font-medium">
              You're saving {frequencyOptions.find(f => f.id === selectedFrequency)?.discount}% per cleaning
            </p>
          )}
        </>
      )}

      {/* Hidden fields */}
      <input type="hidden" {...register('frequency')} />
      <input type="hidden" {...register('frequencyLabel')} />
      <input type="hidden" {...register('frequencyDiscount')} />
    </div>
  )
}

export default FrequencyComponent
