"use client";

import { authClient } from "@/lib/auth-client";
import { ErrorContext } from "better-auth/client";

export default function SignUp() {
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
      },
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>Email</label>
      <input name="email" type="text" placeholder="Email" />
      <label>Username</label>
      <input name="username" type="text" placeholder="Username" />
      <label>Password</label>
      <input name="password" type="password" placeholder="Password" />
      <button type="submit">Sign Up</button>
    </form>
  );
}
