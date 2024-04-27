import { env } from '@/env'
import {Resend} from 'resend'
import { getBaseUrl } from './urls'

const resend = new Resend(env.RESEND_API_KEY)

export const sendPasswordResetEmail = async (email: string, token: string) => {
  const ResetLink = `${getBaseUrl()}/auth/new-password?token=${token}`;
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
  const confirmationLink = `${getBaseUrl()}/auth/new-verification?token=${token}`
  // console.log('Confirmation linke: ',confirmationLink)
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `<p>Click <a href="${confirmationLink}">here</a> to confirm email.</p>`,
  });
}