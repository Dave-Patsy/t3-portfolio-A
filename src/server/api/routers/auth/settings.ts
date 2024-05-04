import { TRPCError } from "@trpc/server";
import { createTRPCRouter, protectedProcedure } from "../../trpc";
import { UserRole } from "@prisma/client";
// import { z } from "zod";
import { SettingsSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import bcrypt from "bcryptjs";
import { auth } from "@/server/auth";

export const settingsRouter = createTRPCRouter({
  settingsTest: protectedProcedure.query(async (opt) => {
    if (typeof opt.ctx.session !==  undefined )
      return { message: "success" };
    throw new TRPCError({
      code: "FORBIDDEN",
      message: "logged in user only!",
    });
  }),
  getSettings:protectedProcedure
  .query(async(opts)=>{
    return opts.ctx.session
  }),
  updateSettings:protectedProcedure
  .input(SettingsSchema)
  .mutation(async(opts)=>{
    const session = opts.ctx.session
    const db = opts.ctx.db
    const {user} = session
    const values = opts.input
    const dbUser = await db.user.findFirst({
      where:{id:session.user.id}
    })
    console.log("values.isTwoFactorEnabled", values.isTwoFactorEnabled);
    if (!dbUser) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    if(user.isOAuth){
      values.email = undefined;
      values.newPassword = undefined;
      values.confirmPassword = undefined;
      values.isTwoFactorEnabled = undefined;
    }

    if (values.email && values.email !== user.email) {
      const existingUser = await getUserByEmail(values.email);

      if (existingUser && existingUser.id !== user.id) {
        return { error: "Email already in use!" };
      }

      const verificationToken = await generateVerificationToken(values.email);
      await sendVerificationEmail("dgwh1995@gmail.com", verificationToken.token);

      return { Success: "Verification email sent!" };
    }
    if (values.newPassword && values.confirmPassword && dbUser.password) {
      const passwordsMatch = await bcrypt.compare(
        values.newPassword,
        dbUser.password,
      );

      if (!passwordsMatch) {
        return { error: "Incorrect password" };
      }
      const hashedPassword = await bcrypt.hash(values.newPassword, 10);

      values.newPassword = hashedPassword;
    }
    console.log("values.isTwoFactorEnabled", values.isTwoFactorEnabled);
    await db.user.update({
      where: { id: dbUser.id },
      data: {
        name: values.name,
        email: values.email,
        isTwoFactorEnabled: values.isTwoFactorEnabled,
        role: values.role,
        password: values.newPassword,
      },
    });
    const newSession = await auth()
    return {session:newSession}
  })
});
