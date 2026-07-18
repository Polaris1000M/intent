"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ErrorContext } from "better-auth/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Marker } from "@/components/ui/marker";
import { GitHubIcon, GoogleIcon } from "@/components/icons";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";

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
    <div className="flex flex-col min-h-screen items-center justify-center gap-4 p-4">
      <Card className="w-full max-w-sm border-0">
        <CardHeader>
          <h1>Sign In</h1>
          <CardDescription>
          Welcome back to Intent.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input name="email" type="text" placeholder="Email" />
            <Input name="password" type="password" placeholder="Password" />
            <Button type="submit">Sign In</Button>
            <Marker variant="separator">Sign in with Socials</Marker>
            <Button type="button" onClick={handleGitHub} variant="outline">
              Sign in with GitHub
              <GitHubIcon />
            </Button>
            <Button type="button" onClick={handleGoogle} variant="outline">
              Sign in with Google
              <GoogleIcon />
            </Button>
          </form>
        </CardContent>
      </Card>
      <p className="text-center text-sm text-muted-foreground">
        New to Intent?{" "}
        <Link href="/signup" className="text-foreground underline">
          Sign up.
        </Link>
      </p>
    </div>
  );
}
