import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/schemas";
import { type z } from "zod";
import { db } from "@/server/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { createTRPCRouter, publicProcedure } from "../../trpc";
import { TRPCError } from "@trpc/server";

export const registerRouter = createTRPCRouter({
  register: publicProcedure
  .input(RegisterSchema)
  .mutation(async(opts)=>{
    try{
      const { email, password, name } = opts.input
      const hashedPassword = await bcrypt.hash(password,10)
      const existingUser = await getUserByEmail(email)
  
      if(existingUser){
        throw new TRPCError({code:'CONFLICT',message:'Email already in use!'})
      }
  
      await opts.ctx.db.user.create({
        data:{
          name,
          email,
          password:hashedPassword
        }
      })
  
      const verificationToken = await generateVerificationToken(email)
      await sendVerificationEmail(verificationToken.email,verificationToken.token)
      return { success: "Confirmation email sent!" };
    } catch {
      throw new TRPCError({code:'INTERNAL_SERVER_ERROR'})
    }
    
  }),
});
