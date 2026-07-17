import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "@/lib/prisma";
import { Resend } from "resend";

// const resend = new Resend()

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  // emailVerification: {
  //   sendVerificationEmail: async ({ user, url }) => {
  //     await sendEmail({
  //       to: user.email,
  //       subject: "Verify your email address",
  //       text: `Click the link to verify your email: ${url}`,
  //     });
  //   },
  //   sendOnSignUp: true,
  // },
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
