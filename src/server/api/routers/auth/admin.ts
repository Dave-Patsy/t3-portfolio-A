import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UserRole } from "@prisma/client";


export const adminRouter = createTRPCRouter({
  adminTest: protectedProcedure.query(async (opt) => {
    if(opt.ctx.session.user.role === UserRole.ADMIN) return { message: "success" };
    throw new TRPCError({
      code:'FORBIDDEN',
      message:"Admin only!"
    })
  }),
});