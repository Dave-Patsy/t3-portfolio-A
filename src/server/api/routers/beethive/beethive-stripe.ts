import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import type Stripe from "stripe";
import type { Pricing_plan_interval, Pricing_type } from "@prisma/client";
import { createOrRetrieveCustomer } from "@/stripe/prismaAdmin";
import { stripe } from "@/stripe/stripeServer";
import { getBaseUrl } from "@/lib/urls";

export const beethiveStripeRouter = createTRPCRouter({
  upsertProductRecord: protectedProcedure
    .input(
      z.object({
        product: z.custom<Stripe.Product>(),
      }),
    )
    .mutation(async (opts) => {
      const { product } = opts.input;
      try {
        return await opts.ctx.db.products.upsert({
          where: {
            id: product.id,
          },
          update: {
            id: product.id,
            active: product.active,
            name: product.name,
            description: product.description,
            image: product.images.at(0),
            metadata: product.metadata,
          },
          create: {
            id: product.id,
            active: product.active,
            name: product.name,
            description: product.description,
            image: product.images.at(0),
            metadata: product.metadata,
          },
        });
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  upsertPriceRecord: protectedProcedure
    .input(
      z.object({
        price: z.custom<Stripe.Price>(),
      }),
    )
    .mutation(async (opts) => {
      const { price } = opts.input;
      try {
        return await opts.ctx.db.prices.upsert({
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
      } catch {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  createOrRetrieveCustomer: protectedProcedure
    .input(
      z.object({
        email: z.string(),
        uuid: z.string(),
      }),
    )
    .mutation(async (opts) => {
      const { uuid } = opts.input;

      let data;
      try {
        try {
          data = await opts.ctx.db.customers.findFirst({
            where: {
              id: uuid,
            },
            select: { stripe_customer_id: true },
          });
        } catch (e) {}
        //no customer or customer error
        // if(error || !data?.stripe_customer_id){
        //   const customerData: { metadata: { supabaseUUID: string }; email?: string } =
        //     {
        //       metadata: {
        //         supabaseUUID: uuid,
        //       },
        //     };
        //   if (email) customerData.email = email;
        //   const customer = await opts.ctx.db.customers.create(customerData);
        //   let newCustomerData;
        //   try {
        //     newCustomerData = await opts.ctx.db.customers.create({
        //       data: {
        //         id: uuid,
        //         stripe_customer_id: customer.id,
        //         user: { connect: { id: uuid } },
        //       },
        //     });
        //   } catch (e) {

        //   }
        //   return customer.id;
        // }

        return data?.stripe_customer_id;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  // copyBillingDetailsToCustomer: protectedProcedure.mutation(async (opts) => {
  //   try {
  //   } catch {
  //     throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //   }
  // }),
  // manageSubscriptionStatusChange: protectedProcedure.mutation(async (opts) => {
  //   try {
  //   } catch {
  //     throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
  //   }
  // }),
  getSubscription: protectedProcedure.query(async (opts) => {
    try {
      return await opts.ctx.db.user
        .findFirst({
          where: {
            id: opts.ctx.session.user.id,
          },
          select: {
            subscription: {
              include: {
                price: {
                  include: {
                    product: true,
                  },
                },
              },
            },
          },
        })
        .then((e) => e?.subscription);
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  getTest: protectedProcedure.query(async (opts) => {
    try {
      const x = await opts.ctx.db.products.findMany({
        include: { prices: true },
      });
      return x;
      return await opts.ctx.db.user.findFirst({
        select: {
          subscription: {
            include: {
              price: {
                include: {
                  product: true,
                },
              },
            },
          },
        },
      });
    } catch {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  getProducts: protectedProcedure.query(async (opts) => {
    try {
      const x = await opts.ctx.db.products.findMany({
        include: { prices: true },
      });
      if (x) return x;
      throw new TRPCError({ code: "NOT_FOUND" });
    } catch (e) {
      throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
    }
  }),
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        price: z.string(),
        quantity: z.number().default(1),
        // metadata: z.custom<JSON>().nullable(),
      }),
    )
    .mutation(async (opts) => {
      try {
        const customer = await createOrRetrieveCustomer({
          uuid: opts.ctx.session.user.id,
          email: opts.ctx.session.user.email!,
        });

        const session = await stripe.checkout.sessions.create({
          payment_method_types: ["card"],
          billing_address_collection: "required",
          customer,
          line_items: [
            {
              price: opts.input.price,
              quantity: opts.input.quantity,
            },
          ],
          subscription_data: {
            metadata: {},
          },
          mode: "subscription",
          allow_promotion_codes: true,
          success_url: `${getBaseUrl()}/`,
          cancel_url: `${getBaseUrl()}/`,
        });
        console.log("createCheckoutSession", session.id);
        return session.id;
      } catch (e) {
        console.log(e);
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
  createPortalLink: protectedProcedure
    // .input(z.object({}))
    .mutation(async (opts) => {
      try {
        const customer = await createOrRetrieveCustomer({
          uuid: opts.ctx.session.user.id,
          email: opts.ctx.session.user.email!,
        });

        if (!customer)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Could not get customer",
          });

        const { url } = await stripe.billingPortal.sessions.create({
          customer,
          return_url: `${getBaseUrl()}/spotify/account`,
        });
        return url;
      } catch (e) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
