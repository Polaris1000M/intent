"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { ErrorContext } from "better-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Marker } from "@/components/ui/marker";
import { GitHubIcon, GoogleIcon } from "@/components/icons";
import { Toaster, toast } from "sonner";
import { getAuthErrorMessage } from "@/lib/auth-error";

export default function SignUp() {
  async function handleGitHub() {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/",
        errorCallbackURL: "/signin",
      },
      {
        onError: (ctx: ErrorContext) => {
          toast.error(getAuthErrorMessage(ctx));
        },
      },
    );
  }

  async function handleGoogle() {
    await authClient.signIn.social(
      {
        provider: "google",
        callbackURL: "/",
        errorCallbackURL: "/signin",
      },
      {
        onError: (ctx: ErrorContext) => {
          toast.error(getAuthErrorMessage(ctx));
        },
      },
    );
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);

    await authClient.signUp.email(
      {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        name: String(formData.get("username")),
        callbackURL: "/",
      },
      {
        onSuccess: () => {
          toast.success("Please verify your email.");
        },
        onError: (ctx: ErrorContext) => {
          toast.error(getAuthErrorMessage(ctx));
        },
      },
    );
  }
  return (
    <div className="flex flex-col min-h-dvh items-center justify-center px-8 py-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 w-full max-w-sm"
      >
        <h1>Sign Up</h1>
        <p className="text-sm text-muted-foreground">Welcome to Intent!</p>
        <Input name="email" type="text" placeholder="Email" />
        <Input name="username" type="text" placeholder="Username" />
        <Input name="password" type="password" placeholder="Password" />
        <Button type="submit">Sign Up</Button>
        <Marker variant="separator">Sign up with Socials</Marker>
        <Button type="button" onClick={handleGoogle} variant="outline">
          Sign up with Google
          <GoogleIcon />
        </Button>
        <Button type="button" onClick={handleGitHub} variant="outline">
          Sign up with GitHub
          <GitHubIcon />
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          Returning user?{" "}
          <Link href="/signin" className="text-foreground underline">
            Sign in.
          </Link>
        </p>
      </form>
      <Toaster richColors />
    </div>
  );
}
