import { test, expect } from "@playwright/test";

test.describe("page structure", () => {
  test("page should have correct elements and metadata", async ({ page }) => {
    await page.goto("/signin");

    await expect(
      page.getByRole("heading", { name: "Sign In", exact: true }),
    ).toBeVisible();

    await expect(page.getByPlaceholder("Email")).toBeVisible();
    await expect(page.getByPlaceholder("Password")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "Sign In", exact: true }),
    ).toBeVisible();
    await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
    await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();

    await expect(page.getByRole("link", { name: "sign up" })).toBeVisible();
  });
});
