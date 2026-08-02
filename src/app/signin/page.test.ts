import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SignIn from "./page";

test("Page", () => {
  render(SignIn());
  expect(
    screen.getByRole("heading", { level: 1, name: "Sign In" }),
  ).toBeDefined();
});
