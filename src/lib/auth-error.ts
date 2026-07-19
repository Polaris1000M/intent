// src/lib/error-utils.ts
import type { ErrorContext } from "better-auth/react";

export function getAuthErrorMessage(ctx: unknown): string {
  if (ctx && typeof ctx === "object" && "error" in ctx) {
    const authError = (ctx as ErrorContext).error;

    switch (authError.code) {
      case "USER_ALREADY_EXISTS":
        return "Please check your inbox to verify your email address.";

      case "UNAUTHORIZED":
        return "Incorrect email or password. Please try again.";

      case "TOO_MANY_REQUESTS":
        return "Too many attempts. Please wait a moment and try again.";

      case "INVALID_EMAIL":
        return "Please enter a valid email address.";

      case "PASSWORD_TOO_SHORT":
        return "Your password is too short. Please choose a stronger password.";

      default: {
        const message = authError.message || "An authentication error occurred";
        return message.endsWith(".") ? message : `${message}.`;
      }
    }
  }

  if (ctx instanceof Error) {
    return ctx.message.endsWith(".") ? ctx.message : `${ctx.message}.`;
  }

  return "Something went wrong. Please try again later.";
}
