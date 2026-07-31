import { test, expect } from "@playwright/test";

test("has heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Test" })).toBeVisible();
});
