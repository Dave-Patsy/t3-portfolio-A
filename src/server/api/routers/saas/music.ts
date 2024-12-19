
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

export const musicRoute = createTRPCRouter({
  music: protectedProcedure
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
 
        // const response = await replicate.run(
        //   "riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05",
        //   {
        //     input: {
        //       prompt_a: opts.input.promt,
        //     },
        //   }
        // ) as audioType
        const response = await openai.audio.transcriptions.create({
          model:'whisper-1',
          prompt: 'asd',
          file:
        }) as audioType

        if (!isPro) {
          await incrementApiLimit(opts.ctx.session);
        }
        console.log(response);
        return response;
      } catch (error) {
        throw new TRPCError({ code: "INTERNAL_SERVER_ERROR",message:'TRPC Failed' });
      }
      
    }),
});
