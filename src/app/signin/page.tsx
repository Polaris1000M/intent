"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

export default function SignIn() {
  async function handleGitHubClick() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
  }

  async function handleGoogleClick() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
  }

  return (
    <>
      <button onClick={handleGitHubClick}>Sign In With GitHub</button>
      <button onClick={handleGoogleClick}>Sign In With Google</button>
      <Link href="/signup">Sign Up</Link>
    </>
  );
}
