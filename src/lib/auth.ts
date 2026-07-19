import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";
import VerificationEmail from "@/emails/verification";
import PreexistingAccountEmail from "@/emails/preexisting";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    autoSignIn: true,
    onExistingUserSignUp: async ({ user }) => {
      void resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: [user.email],
        subject: "Someone tried to sign up with your email",
        react: PreexistingAccountEmail(),
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      resend.emails.send({
        from: process.env.EMAIL_FROM!,
        to: [user.email],
        subject: "Please verify your email address",
        react: VerificationEmail({ url }),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
