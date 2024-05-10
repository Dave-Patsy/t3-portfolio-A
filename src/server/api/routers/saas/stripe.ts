
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { stripe } from "@/stripe/stripeServer";
import { extendBaseURL } from "@/lib/urls";

const settingsUrl = extendBaseURL("/WebForge/settings");

export const stripeRoute = createTRPCRouter({
  stripe: protectedProcedure
    .mutation(async (opts) => {
      try{
        const userSubscription = await opts.ctx.db.userSubscription.findUnique({
          where:{
            userId:opts.ctx.session.user.id
          }
        })

        if (userSubscription?.stripeCustomerId) {
          const stripeSession = await stripe.billingPortal.sessions.create({
            customer: userSubscription.stripeCustomerId,
            return_url: settingsUrl,
          });
          return { url: stripeSession.url };
        }

        const stripeSession = await stripe.checkout.sessions.create({
          success_url: settingsUrl,
          cancel_url: settingsUrl,
          payment_method_types: ["card"],
          mode: "subscription",
          billing_address_collection: "auto",
          customer_email: opts.ctx.session.user.email ?? undefined,

          line_items: [
            {
              price_data: {
                currency: "USD",
                product_data: {
                  name: "WebForge Pro",
                  description: "Unlimited AI Generations",
                },
                unit_amount: 2000,
                recurring: {
                  interval: "month",
                },
              },
              quantity: 1,
            },
          ],
          metadata: {
            id: opts.ctx.session.user.id,
            item: "saas",
          },
        });
        return { url: stripeSession.url };
      } catch (error) {
        console.log(error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
