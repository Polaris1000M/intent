import { expect, Page, Request } from "@playwright/test";

export async function hasErrorToast(page: Page, text: string) {
  const toast = page.locator("[data-sonner-toast][data-type='error']");
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(text, { ignoreCase: true });
}

export async function hasSuccessToast(page: Page, text: string) {
  const toast = page.locator("[data-sonner-toast][data-type='success']");
  await expect(toast).toBeVisible();
  await expect(toast).toContainText(text, { ignoreCase: true });
}

export async function mockSignUpSuccess(page: Page) {
  await page.route("/api/auth/sign-up/email", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: null,
        user: {
          name: "testuser",
          email: "test@example.com",
          emailVerified: false,
          image: null,
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
          id: "mock-user-id",
        },
      }),
    }),
  );
}

export async function mockSignUpError(
  page: Page,
  code: string,
  message: string,
) {
  await page.route("/api/auth/sign-up/email", (route) =>
    route.fulfill({
      status: 400,
      contentType: "application/json",
      body: JSON.stringify({
        message: message,
        code: code,
      }),
    }),
  );
}

export async function mockSignUpSuccessDelayed(page: Page, delayMs: number) {
  await page.route("/api/auth/sign-up/email", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        token: null,
        user: {
          name: "testuser",
          email: "test@example.com",
          emailVerified: false,
          image: null,
          createdAt: "2025-01-01T00:00:00.000Z",
          updatedAt: "2025-01-01T00:00:00.000Z",
          id: "mock-user-id",
        },
      }),
    });
  });
}

export async function mockSignUpNetworkError(page: Page) {
  await page.route("/api/auth/sign-up/email", (route) =>
    route.abort("connectionrefused"),
  );
}

export async function validateSignUpRequest(
  requestPromise: Promise<Request>,
  email: string,
  name: string,
  password: string,
) {
  const request = await requestPromise;

  expect(request.method()).toBe("POST");
  expect(request.postData()).toBeDefined();
  const payload = JSON.parse(request.postData()!);
  expect(payload.email).toBe(email);
  expect(payload.name).toBe(name);
  expect(payload.password).toBe(password);
}
