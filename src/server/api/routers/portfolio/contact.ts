import { TRPCError } from "@trpc/server";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "../../trpc";
import { z } from "zod";
import { sendContactEmail } from "@/lib/mail";

const ContactFormSchema = z.object({
  name: z.string().min(1).max(30),
  email: z.string().email(),
  message: z.string().max(1500).min(5),
});

export const portfolioRouter = createTRPCRouter({
  sendContactEmail: publicProcedure
    .input(ContactFormSchema)
    .mutation(async (opts) => {
      const { name, email, message } = opts.input;
      try {
        await sendContactEmail(name, email, message);
      } catch (error) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to send email",
        });
      }
      return { success: true, message: "Email sent successfully" };
    }),
});