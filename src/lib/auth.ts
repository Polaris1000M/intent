import { betterAuth } from "better-auth";
import { Resend } from "resend";
import { db } from "@/index";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

const resend = new Resend(process.env.RESEND_API_KEY);

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url }) => {
      void resend.emails.send({
        from: "Intent <hello@intent.ac>",
        to: user.email,
        subject: "Reset your password",
        html: `Click <a href="${url}">here</a> to reset your password.`,
      });
    },
    onExistingUserSignUp: async ({ user }) => {
      void resend.emails.send({
        from: "Intent <hello@intent.ac>",
        to: user.email,
        subject: "Invalid sign up attempt",
        html: "Someone tried to sign up with your email.",
      });
    },
  },
  emailVerification: {
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    sendVerificationEmail: async ({ user, url }) => {
      void resend.emails.send({
        from: "Intent <hello@intent.ac>",
        to: user.email,
        subject: "Verify your email address",
        html: `Click <a href="${url}">here</a> to verify your email.`,
      });
    },
  },
});
