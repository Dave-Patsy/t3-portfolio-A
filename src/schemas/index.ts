import * as z from 'zod'

export const LoginSchema = z.object({
  email: z.string().email({message:'Email is required.'}),
  password: z.string().min(1,{message:"Password is required."})
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