import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../../trpc";
import { UserRole } from "@prisma/client";


export const adminRouter = createTRPCRouter({
  adminTest: protectedProcedure.query(async (opt) => {
    try {
        if (!opt.ctx.session) throw new TRPCError({code:'FORBIDDEN',message:'Must be logged in!'})
        if (opt.ctx.session.user.role === UserRole.ADMIN)
          return { message: "success" };

        throw new TRPCError({
          code: "FORBIDDEN",
          message: "Admin only!",
        });
      } catch (error) {
        if (error instanceof TRPCError){
          switch (error.code){
            case 'FORBIDDEN': 
              throw new TRPCError({
                code: "FORBIDDEN",
                message: "Admin only!",
              });
            default:throw new TRPCError({ code: "INTERNAL_SERVER_ERROR" });
          }
        }
        throw error
      }
  }),
});