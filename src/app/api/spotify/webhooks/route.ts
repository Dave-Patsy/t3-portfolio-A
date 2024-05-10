import type Stripe from "stripe";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { stripe } from "@/stripe/stripeServer";

import {
  upsertProductRecord,
  upsertPriceRecord,
  manageSubscriptionStatusChange,
} from "@/stripe/prismaAdmin";
import { env } from "@/env";
import { db } from "@/server/db";



const relevantEvents = new Set([
  "product.created",
  "product.updated",
  "price.created",
  "price.updated",
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
]);

export async function POST(request: Request) {
  const body = await request.text();
  const sig = headers().get("Stripe-Signature");

  const webhookSecret =
    env.STRIPE_WEBHOOK_SECRET_LIVE !== "place_holder"
      ? env.STRIPE_WEBHOOK_SECRET_LIVE
      : env.STRIPE_WEBHOOK_SECRET;
  let event: Stripe.Event;

  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err) {
    if (err instanceof Error) {

      console.log(`❌ Error message: ${err.message}`);
      return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    return new NextResponse(`Webhook Error: ${err}`, { status: 400 });
  }

  console.log('WebhookEvents',event.type)
  if (relevantEvents.has(event.type)) {
    try {
      switch (event.type) {
        case "product.created":
        case "product.updated":
          console.log('upserting product')
          await upsertProductRecord(event.data.object );
          break;
        case "price.created":
        case "price.updated":
          console.log("upserting price");
          await upsertPriceRecord(event.data.object);
          break;
        case "customer.subscription.created":
        case "customer.subscription.updated":
        case "customer.subscription.deleted":
          // const subscription = event.data.object as Stripe.Subscription;
          // await manageSubscriptionStatusChange(
          //   subscription.id,
          //   subscription.customer as string,
          //   // event.type === "customer.subscription.created"
          // );
          break;
        case "checkout.session.completed":
          const checkoutSession = event.data.object 
          console.log('Checkout Session',checkoutSession)
          const subscription = await stripe.subscriptions.retrieve(
            checkoutSession.subscription as string,
          );
          // checkoutSession.
          console.log("checkoutSession.mode", checkoutSession.mode);
          if (checkoutSession.mode === "subscription") {

            console.log(
              "checkoutSession?.metadata?.item",
              checkoutSession?.metadata?.item,
            );
            // const { item } = checkoutSession.metadata;
            if (!checkoutSession?.metadata?.id) {
              return new NextResponse("User id is required", { status: 400 });
            }

            if (checkoutSession?.metadata?.item) {
              console.log('updating user Saas subscription')
              await db.userSubscription.create({
                data: {
                  userId: checkoutSession?.metadata?.id,
                  stripeSubscriptionId: subscription.id,
                  stripeCustomerId: subscription.customer as string,
                  stripePriceId: subscription.items.data.at(0)?.price.id,
                  stripeCurrentPeriodEnd: new Date(
                    subscription.current_period_end * 1000,
                  ),
                },
              });
            } else {
              const subscriptionId = checkoutSession.subscription;
              await manageSubscriptionStatusChange(
                subscriptionId as string,
                checkoutSession.customer as string,
                true,
              );
            }
          }
          break;
        default:
          throw new Error("Unhandled relevant event!");
      }
    } catch (error) {
      console.log(error);
      return new NextResponse(
        'Webhook error: "Webhook handler failed. View logs."',
        { status: 400 },
      );
    }
  }

  return NextResponse.json({ received: true }, { status: 200 });
}
