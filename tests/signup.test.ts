import { test, expect } from "@playwright/test";

test("sign up page has sign up", async ({ page }) => {
  await page.goto("/signup");
  await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
});
