import { UserRole } from '@prisma/client';

import * as z from 'zod'

export const SettingsSchema = z
  .object({
    name: z.string().optional(),
    isTwoFactorEnabled: z.boolean().optional(),
    role:z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.string().optional(),
    newPassword: z.string().min(6).optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (values) => {
      if(values.newPassword && !values.confirmPassword) return false
      if (values.confirmPassword && !values.newPassword) return false;
      if (values.newPassword) return values.newPassword === values.confirmPassword;
      return true
    },
    {
      message: "Passords must match!",
      path: ["confirmPassword"],
    },
  );
export const LoginSchema = z.object({
  email: z.string().email({message:'Email is required.'}),
  password: z.string().min(1,{message:"Password is required."}),
  code: z.optional(z.string()),
})
export const ResetSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
});

export const RegisterSchema = z.object({
  email: z.string().email({ message: "Email is required." }),
  name:z.string().min(1,{message:'Name is required.'}),
  password: z.string().min(6, { message: "Password is required." }),
  confirmPassword: z.string().min(6, { message: "Password is required." }),
}).refine((values)=>{
  return values.password === values.confirmPassword
},{
  message: 'Passords must match!',
  path:['confirmPassword']
});

export const NewPasswordSchema = z
  .object({
    password: z.string().min(6, { message: "Password is required." }),
    confirmPassword: z.string().min(6, { message: "Password is required." }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Passords must match!",
      path: ["confirmPassword"],
    },
  );