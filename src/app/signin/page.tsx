"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorContext } from "better-auth/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignIn() {
  const router = useRouter();
  async function handleGitHub() {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
  }

  async function handleGoogle() {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
      errorCallbackURL: "/signin",
    });
  }

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData: FormData = new FormData(e.currentTarget);

    await authClient.signIn.email(
      {
        email: String(formData.get("email")),
        password: String(formData.get("password")),
        callbackURL: "/",
        rememberMe: false,
      },
      {
        onError: (ctx: ErrorContext) => {
          alert(ctx.error.message);
        },
        onSuccess: () => {
          router.push("/");
        },
      },
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input name="email" type="text" placeholder="Email" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">Sign In</Button>
          <Button type="button" onClick={handleGitHub}>
            Sign In With GitHub
          </Button>
          <Button type="button" onClick={handleGoogle}>
            Sign In With Google
          </Button>
          <Link
            href="/signup"
            className={buttonVariants({ variant: "default" })}
          >
            Sign Up
          </Link>
        </form>
      </div>
    </div>
  );
}
