'use server'
import bcrypt from "bcryptjs";
import { getUserByEmail, getUserById } from "@/data/user"
import { currentUser } from "@/lib/auth"
import { SettingsSchema } from "@/schemas"
import { db } from "@/server/db"
import {type z } from "zod"
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const settings = async(values:z.infer<typeof SettingsSchema>) => {
  const validatedFields = SettingsSchema.safeParse(values)
  if(!validatedFields.success){
    return {error:"Invalid fields"}
  }

  const user = await currentUser()

  if(!user) {
    return {error:'Unauthorized'}
  }

  const dbUser = await getUserById(user.id)

  if(!dbUser){
    return { error: "Unauthorized" };
  }

  if(!user.isOAuth){
    values.email = undefined
    values.newPassword = undefined
    values.confirmPassword = undefined
    values.isTwoFactorEnabled = undefined
  }

  if(values.email && values.email !== user.email){
    const existingUser = await getUserByEmail(values.email)

    if(existingUser && existingUser.id !== user.id){
      return {error: "Email already in use!"}
    }

    const verificationToken = await generateVerificationToken(
      values.email
    )
    await sendVerificationEmail("dgwh1995@gmail.com", verificationToken.token);

    return {Success: 'Verification email sent!'}
  }

  if(values.newPassword && values.confirmPassword && dbUser.password){
    const passwordsMatch = await bcrypt.compare(values.newPassword,dbUser.password)

    if(!passwordsMatch){
      return {error: 'Incorrect password'}
    }
    const hashedPassword = await bcrypt.hash(values.newPassword, 10);

    values.newPassword = hashedPassword

  }

 

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

  return { success: "Settings updated" };
}