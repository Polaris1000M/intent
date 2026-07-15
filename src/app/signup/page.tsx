"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorContext } from "better-auth/client";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SignUp() {
  const router = useRouter();

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
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <Input name="email" type="text" placeholder="Email" />
          <Input name="username" type="text" placeholder="Username" />
          <Input name="password" type="password" placeholder="Password" />
          <Button type="submit">Sign Up</Button>
          <Link
            href="/signin"
            className={buttonVariants({ variant: "default" })}
          >
            Sign In
          </Link>
        </form>
      </div>
    </div>
  );
}
