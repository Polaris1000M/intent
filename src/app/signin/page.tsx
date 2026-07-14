"use client";

import { authClient } from "@/lib/auth-client";

export default function SignIn() {
  async function handleClick() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
  }

  return <button onClick={handleClick}>Sign In</button>;
}
