"use client";

import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutForm({ finalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Create PaymentIntent on server
    const res = await fetch("/api/create-payment-intent", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: finalPrice }),
    });

    const { clientSecret, error } = await res.json();
    if (error) {
      alert(error);
      setLoading(false);
      return;
    }

    // Confirm payment
    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
      },
    });

    if (result.error) {
      alert(result.error.message);
    } else if (result.paymentIntent.status === "succeeded") {
      alert("✅ Payment successful!");
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto p-4">
      {/* No amount input anymore! */}
      <div className="p-2 border rounded">
        <CardElement />
      </div>
      <button
        disabled={!stripe || loading}
        className="w-full bg-blue-600 text-white p-2 rounded"
      >
        {loading ? "Processing..." : `Pay $${finalPrice}`}
      </button>
    </form>
  );
}


export default function CheckoutPage({ orderData }) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm finalPrice={orderData?.pricing?.finalPrice || 100} />
    </Elements>
  );
}
