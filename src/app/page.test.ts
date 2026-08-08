import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./page";

test("page has correct elements", () => {
  render(Home());
  expect(screen.getByRole("heading", { level: 1, name: "Home" })).toBeDefined();
});
