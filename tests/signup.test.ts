import { test, expect } from "@playwright/test";
import {
  hasSuccessToast,
  hasErrorToast,
  mockSignUpSuccess,
  mockSignUpError,
  validateSignUpRequest,
} from "./helpers";

const invalid_credentials = {
  email: "invalid email",
  name: "testuser",
  password: "1234567",
};

const valid_credentials = {
  email: "test@example.com",
  name: "testuser",
  password: "password123",
};

test("page should have correct elements and metadata", async ({ page }) => {
  await page.goto("/signup");

  await expect(
    page.getByRole("heading", { name: "Sign Up", exact: true }),
  ).toBeVisible();

  await expect(page.getByPlaceholder("Email")).toBeVisible();
  await expect(page.getByPlaceholder("Username")).toBeVisible();
  await expect(page.getByPlaceholder("Password")).toBeVisible();

  await expect(
    page.getByRole("button", { name: "Sign Up", exact: true }),
  ).toBeVisible();
  await expect(page.getByRole("button", { name: "Google" })).toBeVisible();
  await expect(page.getByRole("button", { name: "GitHub" })).toBeVisible();

  await expect(page.getByRole("link", { name: "sign in" })).toBeVisible();
});

test("no scrollable space on page", async ({ page }) => {
  await page.goto("/signup");

  const isPageScrollable = await page.evaluate(() => {
    const root = document.documentElement;
    return root.scrollHeight > root.clientHeight;
  });

  expect(isPageScrollable).toBe(false);
});

test("sign in link should redirect to sign in page", async ({ page }) => {
  await page.goto("/signup");

  await page.getByRole("link", { name: "sign in" }).click();
  await expect(page).toHaveURL("/signin");
});

test("empty credentials triggers error", async ({ page }) => {
  await mockSignUpError(
    page,
    "VALIDATION_ERROR",
    "[body.email] Invalid input; [body.password] Invalid input",
  );
  const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
  await page.goto("/signup");

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await hasErrorToast(page, "invalid");
  await validateSignUpRequest(requestPromise, "", "", "");
});

test("invalid email triggers error", async ({ page }) => {
  await mockSignUpError(page, "VALIDATION_ERROR", "[body.email] Invalid input");
  const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
  await page.goto("/signup");

  await page.getByPlaceholder("Email").fill(invalid_credentials.email);
  await page.getByPlaceholder("Username").fill(valid_credentials.name);
  await page.getByPlaceholder("Password").fill(valid_credentials.password);

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await hasErrorToast(page, "invalid");
  await validateSignUpRequest(
    requestPromise,
    invalid_credentials.email,
    valid_credentials.name,
    valid_credentials.password,
  );
});

test("invalid password triggers error", async ({ page }) => {
  await mockSignUpError(page, "PASSWORD_TOO_SHORT", "Password too short");
  const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
  await page.goto("/signup");

  await page.getByPlaceholder("Email").fill(valid_credentials.email);
  await page.getByPlaceholder("Username").fill(valid_credentials.name);
  await page.getByPlaceholder("Password").fill(invalid_credentials.password);

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await hasErrorToast(page, "short");
  await validateSignUpRequest(
    requestPromise,
    valid_credentials.email,
    valid_credentials.name,
    invalid_credentials.password,
  );
});

test("valid credentials trigger verification", async ({ page }) => {
  await mockSignUpSuccess(page);
  const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
  await page.goto("/signup");

  await page.getByPlaceholder("Email").fill(valid_credentials.email);
  await page.getByPlaceholder("Username").fill(valid_credentials.name);
  await page.getByPlaceholder("Password").fill(valid_credentials.password);

  await page.getByRole("button", { name: "Sign Up", exact: true }).click();

  await hasSuccessToast(page, "verify");
  await validateSignUpRequest(
    requestPromise,
    valid_credentials.email,
    valid_credentials.name,
    valid_credentials.password,
  );
});

test("pressing enter on keyboard triggers submission with valid credentials", async ({
  page,
}) => {
  await mockSignUpSuccess(page);
  const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
  await page.goto("/signup");

  await page.getByPlaceholder("Email").fill(valid_credentials.email);
  await page.getByPlaceholder("Username").fill(valid_credentials.name);
  const passwordInput = page.getByPlaceholder("Password");
  await passwordInput.fill(valid_credentials.password);

  await passwordInput.press("Enter");

  await hasSuccessToast(page, "verify");
  await validateSignUpRequest(
    requestPromise,
    valid_credentials.email,
    valid_credentials.name,
    valid_credentials.password,
  );
});
