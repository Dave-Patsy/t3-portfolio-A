


import {loadStripe,type  Stripe} from "@stripe/stripe-js"



let stripePromise: Stripe | null

export const getStripe = async() => {
  if(!stripePromise) {
    stripePromise = await loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY!);
  }
  return stripePromise
}