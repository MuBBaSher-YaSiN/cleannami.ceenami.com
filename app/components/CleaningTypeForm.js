'use client'

import { motion } from 'framer-motion'

const CleaningTypeForm = ({ register }) => {
    return (
        <motion.div
            className="mb-10 rounded-xl p-7 bg-gradient-to-br from-white to-blue-50 shadow-lg border border-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <h2 className="text-xl font-bold text-gray-800 mb-4">STEP 2: What type of cleaning are you booking?</h2>

            <div className="space-y-4">
                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        value="residential"
                        {...register('cleaningType')}
                        className="form-radio h-4 w-4 text-[#1115ac]"
                        defaultChecked
                    />
                    <span>Residential Cleaning</span>
                </label>

                <label className="flex items-center space-x-3">
                    <input
                        type="radio"
                        value="airbnb"
                        {...register('cleaningType')}
                        className="form-radio h-4 w-4 text-[#1115ac]"
                    />
                    <span>Airbnb / Vacation Rental Turnover</span>
                </label>
            </div>
        </motion.div>
    )
}

export default CleaningTypeForm
