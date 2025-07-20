'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import WhoYouAreForm from './WhoYouAreForm';
import YourHomeForm from './YourHomeForm';
import ChooseServiceForm from './ChooseServiceForm';
import AddOnsSelector from './AddOnsSelector';
import CouponCodeComponent from './CouponCodeComponent';
import SchedulingComponent from './SchedulingComponent';
import FrequencyComponent from './FrequencyComponent';
import AdditionalInformationComponent from './AdditionalInformationComponent';
import OrderSummaryPopup from './OrderSummaryPopup';
import Fotter from './Fotter';
import { db } from '../firebase-config';
import { collection, addDoc } from 'firebase/firestore';


const Main = () => {
  const basePrice = 100; // Default base price
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [orderData, setOrderData] = useState(null);

  const { register, handleSubmit, reset, setValue, control, watch } = useForm({
    defaultValues: {
      addons: [],
      couponDiscount: 0,
      frequencyDiscount: 0,
      frequency: 'one-time',
      frequencyLabel: 'One Time',
      basePrice: basePrice
    }
  });

  // Watch for changes to calculate price
  const addons = watch('addons') || [];
  const couponDiscount = watch('couponDiscount') || 0;
  const frequencyDiscount = watch('frequencyDiscount') || 0;
  const frequencyLabel = watch('frequencyLabel') || 'One Time';

  // Calculate pricing
  const addonTotal = addons.reduce((sum, addon) => sum + addon.price, 0);
  const subtotal = basePrice + addonTotal;
  const couponDiscountAmount = (subtotal * couponDiscount) / 100;
  const frequencyDiscountAmount = (subtotal * frequencyDiscount) / 100;
  const totalDiscount = couponDiscountAmount + frequencyDiscountAmount;
  // Ensure price never falls below basePrice
  const finalPrice = Math.max(basePrice, subtotal - totalDiscount);

  const onSubmit = async (data) => {
    // Add calculated pricing to the submission data
    const finalData = {
      ...data,
      pricing: {
        basePrice,
        addonTotal,
        subtotal,
        couponDiscountAmount,
        frequencyDiscountAmount,
        totalDiscount,
        finalPrice
      }
    };

    // Store order data and open popup
    setOrderData(finalData);
    setIsPopupOpen(true);

    // Note: We'll only reset the form when the user confirms in the popup
    // console.log('Final Data:', finalData);
    try {
      // await addDoc(collection(db, 'orders'), finalData);
      await addDoc(collection(db, 'orders'), {
        ...finalData,
        status: 'pending'
      });

      console.log('Data successfully uploaded to Firestore');
    } catch (error) {
      console.error('Error uploading data to Firestore:', error);
    }

  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    // Optional: Reset form after popup closes
    // reset();
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="w-[95%] lg:w-[80%] mx-auto pb-20">
        <div className='flex max-md:flex-col gap-10 relative'>
          {/* Left Container */}
          <div className='md:w-[70%]'>
            <WhoYouAreForm register={register} />
            <YourHomeForm register={register} />
            <ChooseServiceForm register={register} />
            <AddOnsSelector register={register} setValue={setValue} control={control} />
            <SchedulingComponent register={register} setValue={setValue} />
            <FrequencyComponent register={register} setValue={setValue} control={control} />
            <AdditionalInformationComponent register={register} control={control} watch={watch} />
            {/* <CouponCodeComponent register={register} setValue={setValue} control={control} /> */}
          </div>


          {/* Order Summary Section - Right Container */}
          <div className="md:w-[30%] h-full sticky top-24 p-6 bg-gradient-to-br from-white to-blue-300 border border-gray-200 rounded-lg ">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span>Base Cleaning Price:</span>
                <span>${basePrice.toFixed(2)}</span>
              </div>

              {addonTotal > 0 && (
                <div className="flex justify-between">
                  <span>Add-ons:</span>
                  <span>${addonTotal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between font-semibold border-t pt-2">
                <span>Subtotal:</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {frequencyDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>{frequencyLabel} Discount ({frequencyDiscount}%):</span>
                  <span>-${frequencyDiscountAmount.toFixed(2)}</span>
                </div>
              )}

              {couponDiscount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Coupon Discount ({couponDiscount}%):</span>
                  <span>-${couponDiscountAmount.toFixed(2)}</span>
                </div>
              )}
            </div>

            <div className="flex justify-between text-xl font-bold border-t border-gray-300 pt-3">
              <span>Total:</span>
              <span>${finalPrice.toFixed(2)}</span>
            </div>

            {frequencyDiscount > 0 && (
              <p className="mt-3 text-sm text-gray-600 italic">
                * This price applies to each recurring cleaning.
              </p>
            )}
          </div>

        </div>

        <button
          type="submit"
          className="w-40 mt-8 bg-[#1115ac] text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors font-medium text-lg"
        >
          Book Now
        </button>
      </form>
      {/* <Fotter /> */}
      {/* Order Summary Popup */}
      <OrderSummaryPopup
        isOpen={isPopupOpen}
        onClose={handleClosePopup}
        orderData={orderData}
      />
    </>
  );
};

export default Main;
