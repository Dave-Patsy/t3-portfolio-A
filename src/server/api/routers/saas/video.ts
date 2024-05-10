import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { checkApiLimit, incrementApiLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
import Replicate from "replicate";
import { env } from "@/env";

type audioType = {
  audio: string;
  spectrogram: string;
};


const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN,
});

export const videoRoute = createTRPCRouter({
  video: protectedProcedure
    .input(
      z.object({
        promt: z.string().min(1).max(50),
      })
    )
    .mutation(async (opts) => {
      try {
        if (!replicate.auth)
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

        const response = (await replicate.run(
          "anotherjesse/zeroscope-v2-xl:9f747673945c62801b13b84701c783929c0ee784e4748ec062204894dda1a351",
          {
            input: {
              prompt: opts.input.promt,
            },
          }
        )) as audioType;


        if (!isPro) {
          await incrementApiLimit(opts.ctx.session);
        }
        return response;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
      }
    }),
});

