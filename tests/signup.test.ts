import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/signup");
});

test("sign up page has sign up header", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Sign Up" })).toBeVisible();
});

test("empty credentials triggers error", async ({ page }) => {
  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  const toast = page.locator("[data-sonner-toast][data-type='error']");
  await expect(toast).toBeVisible();
});

test("invalid email triggers error", async ({ page }) => {
  await page.getByPlaceholder("Email").fill("invalid email");
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("password123");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  const toast = page.locator("[data-sonner-toast][data-type='error']");
  await expect(toast).toBeVisible();
});

test("invalid password triggers error", async ({ page }) => {
  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("1");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  const toast = page.locator("[data-sonner-toast][data-type='error']");
  await expect(toast).toBeVisible();
});

test("valid credentials trigger verification", async ({ page }) => {
  await page.getByPlaceholder("Email").fill("test@example.com");
  await page.getByPlaceholder("Username").fill("testuser");
  await page.getByPlaceholder("Password").fill("password123");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  const toast = page.locator("[data-sonner-toast][data-type='success']");
  await expect(toast).toBeVisible();
});
