import { loadStripe } from "@stripe/stripe-js";
import React from "react";

export async function checkout({ lineItems }) {
  let stripePromise = null;
  const getStripe = () => {
    const stripeKey = `${process.env.STRIPE_PUBLISHABLE_KEY}`;
    if (!stripeKey) {
      console.error(
        "Stripe key is undefined. Make sure your environment variables are correctly set."
      );
      return null;
    }
    if (!stripePromise) {
      stripePromise = loadStripe(stripeKey);
    }
    return stripePromise;
  };

  const stripe = await getStripe();
  if (!stripe) {
    alert("Stripe initialization failed. Please check the console for errors.");
    return;
  }

  await stripe.redirectToCheckout({
    mode: "payment",
    lineItems,
    successUrl: `${window.location.origin}/pricing?session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${window.location.origin}/pricing`,
  });
}
