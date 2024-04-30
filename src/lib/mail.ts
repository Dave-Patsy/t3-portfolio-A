import { env } from '@/env'
import {Resend} from 'resend'

const resend = new Resend(env.RESEND_API_KEY)


export const sendTwoFactorEmail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Your 2FA code ${token}</p>`,
  });
};
export const sendPasswordResetEmail = async (email: string, token: string) => {
  const ResetLink = `${env.NEXT_PUBLIC_VERCEL_URL}/auth/new-password?token=${token}`;
  // console.log('Confirmation linke: ',confirmationLink)
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${ResetLink}">here</a> to reset password.</p>`,
  });
};

export const sendVerificationEmail = async(
  email: string,
  token: string
) => {
  const confirmationLink = `${env.NEXT_PUBLIC_VERCEL_URL}/auth/new-verification?token=${token}`;
  // console.log('Confirmation linke: ',confirmationLink)
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm email.</p>`,
  });
}