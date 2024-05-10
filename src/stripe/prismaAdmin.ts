
import type Stripe from "stripe";
import  {type Pricing_plan_interval, type Pricing_type, Prisma } from "@prisma/client";
import { db } from "@/server/db";
import { toDateTime } from "./helpers";
import { stripe } from "./stripeServer";



const upsertProductRecord = async (product: Stripe.Product) => {
  await db.products.upsert({
    where: {
      id: product.id,
    },
    update: {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description ?? "",
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    },
    create: {
      id: product.id,
      active: product.active,
      name: product.name,
      description: product.description ?? "",
      image: product.images?.[0] ?? null,
      metadata: product.metadata,
    },
  });
};

const upsertPriceRecord = async (price: Stripe.Price) => {
  await db.prices.upsert({
    where: {
      id: price.id,
    },
    update: {
      id: price.id,
      product: {
        connect: {
          id: typeof price.product === "string" ? price.product : "",
        },
      },
      active: price.active,
      currency: price.currency,
      description: price.nickname ?? undefined,
      type: price.type.toUpperCase() as unknown as Pricing_type,
      unit_amount: price.unit_amount ?? undefined,
      interval:
        price.recurring?.interval.toUpperCase() as unknown as Pricing_plan_interval,
      interval_count: price.recurring?.interval_count,
      trial_period_days: price.recurring?.trial_period_days ?? undefined,
      metadata: price.metadata,
    },
    create: {
      id: price.id,
      product: {
        connect: {
          id: typeof price.product === "string" ? price.product : "",
        },
      },
      active: price.active,
      currency: price.currency,
      description: price.nickname ?? "",
      type: price.type.toUpperCase() as unknown as Pricing_type,
      unit_amount: price.unit_amount ?? undefined,
      interval:
        price.recurring?.interval.toUpperCase() as unknown as Pricing_plan_interval,
      interval_count: price.recurring?.interval_count,
      trial_period_days: price.recurring?.trial_period_days ?? undefined,
      metadata: price.metadata,
    },
  });
};

const createOrRetrieveCustomer = async ({
  email,
  uuid,
}: {
  email: string;
  uuid: string;
}) => {
  let error;
  let data;
  try {
    data = await db.customers.findFirst({
      where: {
        id: uuid,
      },
      select: { stripe_customer_id: true },
    });
  } catch (err) {
    error = err;
  }
  if (error || !data?.stripe_customer_id) {
    const customerData: { metadata: { supabaseUUID: string }; email?: string } =
      {
        metadata: {
          supabaseUUID: uuid,
        },
      };
    if (email) customerData.email = email;
    const customer = await stripe.customers.create(customerData);
    let newCustomerData;
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      newCustomerData = await db.customers.create({
        data: {
          id: uuid,
          stripe_customer_id: customer.id,
          user: { connect: { id: uuid } },
        },
      });
    } catch (e) {}
    return customer.id;
  }
  return data.stripe_customer_id;
};

const copyBillingDetailsToCustomer = async (
  uuid: string,
  payment_method: Stripe.PaymentMethod,
) => {
  const { name, phone, address } = payment_method.billing_details;

  if (!name || !phone || !address) return false;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  await stripe.customers.update(payment_method.customer, {
    name,
    phone,
    address,
  });

  await db.user.update({
    where: { id: uuid },
    data: {
      billing_address: { ...address },
      payment_method: {
        ...payment_method[payment_method.type],
      } as unknown as undefined,
    },
  });
};

const manageSubscriptionStatusChange = async (
  subscriptionId: string,
  customerId: string,
  createAction = false,
) => {
  const data = await db.customers.findFirst({
    where: {
      stripe_customer_id: customerId,
    },
  });
  const { id: uuid } = data!;

  const subscription = await stripe.subscriptions.retrieve(subscriptionId, {
    expand: ["default_payment_method"],
  });
  try {
    console.log("saving subscription", subscription);
    await db.subscriptions.upsert({
      where: {
        id: subscription.id,
      },
      update: {
        id: subscription.id,
        user: { connect: { id: data?.userId ?? undefined } },
        metadata: subscription.metadata,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status: subscription.status.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        price: { connect: { id: subscription.items.data[0].price.id } },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        quantity: subscription.items.data[0].quantity ?? null,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at
          ? toDateTime(subscription.cancel_at).toISOString()
          : null,
        canceled_at: subscription.canceled_at
          ? toDateTime(subscription.canceled_at).toISOString()
          : null,
        current_period_start: toDateTime(
          subscription.current_period_start,
        ).toISOString(),
        current_period_end: toDateTime(
          subscription.current_period_end,
        ).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at
          ? toDateTime(subscription.ended_at).toISOString()
          : null,
        trial_start: subscription.trial_start
          ? toDateTime(subscription.trial_start).toISOString()
          : null,
        trial_end: subscription.trial_end
          ? toDateTime(subscription.trial_end).toISOString()
          : null,
      },
      create: {
        id: subscription.id,
        user: { connect: { id: data?.userId ?? undefined } },
        metadata: subscription.metadata,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        status: subscription.status.toUpperCase(),
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        price: { connect: { id: subscription.items.data[0].price.id } },
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        quantity: subscription.items.data[0].quantity ?? null,
        cancel_at_period_end: subscription.cancel_at_period_end,
        cancel_at: subscription.cancel_at
          ? toDateTime(subscription.cancel_at).toISOString()
          : null,
        canceled_at: subscription.canceled_at
          ? toDateTime(subscription.canceled_at).toISOString()
          : null,
        current_period_start: toDateTime(
          subscription.current_period_start,
        ).toISOString(),
        current_period_end: toDateTime(
          subscription.current_period_end,
        ).toISOString(),
        created: toDateTime(subscription.created).toISOString(),
        ended_at: subscription.ended_at
          ? toDateTime(subscription.ended_at).toISOString()
          : null,
        trial_start: subscription.trial_start
          ? toDateTime(subscription.trial_start).toISOString()
          : null,
        trial_end: subscription.trial_end
          ? toDateTime(subscription.trial_end).toISOString()
          : null,
      },
    });
    console.log("subscription saved");
    console.log("subscription saved");
    console.log("subscription saved");
    console.log("subscription saved");
    console.log("subscription saved");
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      console.log("error code", e.code);
      console.log("error code", e.code);
      console.log("error code", e.code);
    }
    // console.log(e)
  }

  // For a new subscription copy the billing details to the customer object.
  // NOTE: This is a costly operation and should happen at the very end.
  if (createAction && subscription.default_payment_method && uuid)
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    await copyBillingDetailsToCustomer(
      uuid,
      subscription.default_payment_method as Stripe.PaymentMethod,
    );
};

export {
  upsertProductRecord,
  upsertPriceRecord,
  createOrRetrieveCustomer,
  manageSubscriptionStatusChange,
};
