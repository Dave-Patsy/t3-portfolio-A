import OpenAI from "openai";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const imageRoute = createTRPCRouter({
  image: protectedProcedure
    .input(
      z.object({
        promt: z.string().min(1).max(100),
        amount: z.string().min(1).max(4),
      })
    )
    .mutation(async (opts) => {
      try {
        if (!openai.apiKey)
          throw new TRPCError({
            code: "INTERNAL_SERVER_ERROR",
            message: "Bad API key.",
          });
        const freeTrial = await checkApiLimit(opts.ctx.session);
        const isPro = await checkSubscription(opts.ctx.session);

        if (!freeTrial && !isPro) {
          throw new TRPCError({
            code: "UNAUTHORIZED",
            message: "Free trial has expired. Please upgrade to pro.",
          });
        }

        const response = await openai.images.generate({
          model:"dall-e-3",
          prompt: opts.input.promt,
          n: parseInt(opts.input.amount, 10),
          size: "1792x1024",
        });

        if (!isPro) {
          await incrementApiLimit(opts.ctx.session);
        }

        return response;
      } catch (error) {
        console.log(error)
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});

