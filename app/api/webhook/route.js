import Stripe from "stripe";
import { headers } from "next/headers";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = headers().get("stripe-signature");
  const body = await req.text(); // raw body for signature verification

  try {
    const event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );

    // Handle events
    if (event.type === "payment_intent.succeeded") {
      const paymentIntent = event.data.object;
      console.log("✅ Payment succeeded:", paymentIntent.id);
      // No DB needed, but here you could notify client or trigger email
    }

    if (event.type === "payment_intent.payment_failed") {
      const paymentIntent = event.data.object;
      console.log("❌ Payment failed:", paymentIntent.id);
    }

    return new Response(null, { status: 200 });
  } catch (err) {
    console.error("Webhook error:", err.message);
    return new Response(`Webhook error: ${err.message}`, { status: 400 });
  }
}
