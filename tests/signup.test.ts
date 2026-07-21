import { test, expect } from "@playwright/test";
import {
  hasSuccessToast,
  hasErrorToast,
  mockSignUpSuccess,
  mockSignUpSuccessDelayed,
  mockSignUpError,
  mockSignUpNetworkError,
  validateSignUpRequest,
} from "./helpers";

const email = "test@example.com";
const username = "testuser";
const password = "password123";
const invalid_email = "invalid email";
const short_password = "1234567";

test.describe("page structure", () => {
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
});

test.describe("navigation", () => {
  test("sign in link should redirect to sign in page", async ({ page }) => {
    await page.goto("/signup");

    await page.getByRole("link", { name: "sign in" }).click();
    await expect(page).toHaveURL("/signin");
  });
});

test.describe("form validation", () => {
  test("empty credentials triggers error", async ({ page }) => {
    await mockSignUpError(
      page,
      "VALIDATION_ERROR",
      "[body.email] Invalid input; [body.password] Invalid input",
    );
    const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
    await page.goto("/signup");

    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await hasErrorToast(page, "check your input");
    await validateSignUpRequest(requestPromise, "", "", "");
  });

  test("invalid email triggers error", async ({ page }) => {
    await mockSignUpError(
      page,
      "VALIDATION_ERROR",
      "[body.email] Invalid input",
    );
    const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(invalid_email);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await hasErrorToast(page, "check your input");
    await validateSignUpRequest(
      requestPromise,
      invalid_email,
      username,
      password,
    );
  });

  test("invalid password triggers error", async ({ page }) => {
    await mockSignUpError(page, "PASSWORD_TOO_SHORT", "Password too short");
    const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(short_password);

    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await hasErrorToast(page, "short");
    await validateSignUpRequest(
      requestPromise,
      email,
      username,
      short_password,
    );
  });
});

test.describe("form submission", () => {
  test("valid credentials trigger verification", async ({ page }) => {
    await mockSignUpSuccess(page);
    const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await hasSuccessToast(page, "verify");
    await validateSignUpRequest(requestPromise, email, username, password);
  });

  test("pressing enter on keyboard triggers submission with valid credentials", async ({
    page,
  }) => {
    await mockSignUpSuccess(page);
    const requestPromise = page.waitForRequest("/api/auth/sign-up/email");
    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Username").fill(username);
    const passwordInput = page.getByPlaceholder("Password");
    await passwordInput.fill(password);

    await passwordInput.press("Enter");

    await hasSuccessToast(page, "verify");
    await validateSignUpRequest(requestPromise, email, username, password);
  });

  test("network failure shows error toast", async ({ page }) => {
    await mockSignUpNetworkError(page);
    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);

    await page.getByRole("button", { name: "Sign Up", exact: true }).click();

    await hasErrorToast(page, "wrong");
  });

  test("submit button is disabled during submission and only one request is sent", async ({
    page,
  }) => {
    await mockSignUpSuccessDelayed(page, 500);

    const requests: unknown[] = [];
    page.on("request", (req) => {
      if (req.url().includes("/api/auth/sign-up/email")) {
        requests.push(req);
      }
    });

    await page.goto("/signup");

    await page.getByPlaceholder("Email").fill(email);
    await page.getByPlaceholder("Username").fill(username);
    await page.getByPlaceholder("Password").fill(password);

    const submitButton = page.getByRole("button", {
      name: "Sign Up",
      exact: true,
    });
    await submitButton.click();

    await expect(submitButton).toBeDisabled();
    await submitButton.click({ force: true });

    await hasSuccessToast(page, "verify");
    expect(requests).toHaveLength(1);
  });
});
