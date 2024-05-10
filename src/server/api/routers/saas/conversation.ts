import { type ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import OpenAI from "openai";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export const conversationRoute = createTRPCRouter({
  conversation: protectedProcedure
    .input(
      z.object({
        message: z.custom<ChatCompletionMessageParam[]>(),
      }),
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

        const response = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: opts.input.message,
        });

        if (!isPro) {
          await incrementApiLimit(opts.ctx.session);
        }

        return response;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});
