import { ResetSchema } from "@/schemas";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { z } from "zod";

export const resetRouter = createTRPCRouter({
  test:publicProcedure.query(async(opts)=>{
    return {message:'hi'}
  }),
  resetPassowrd: publicProcedure
  .input(ResetSchema)
  .mutation(async (opts) => {
    try{

      const existingUser = await getUserByEmail(opts.input.email)

      if(!existingUser){
        throw  new TRPCError({code:'NOT_FOUND',message:'Email not found'})
      }

      const passwordResetToken = await generatePasswordResetToken(opts.input.email)
      await sendPasswordResetEmail(passwordResetToken.email,passwordResetToken.token);
      return {success:'Reset email sent'}
    } catch {
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})
    }
  }),
});