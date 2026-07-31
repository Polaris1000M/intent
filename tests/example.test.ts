import { test, expect } from "@playwright/test";
import { eq } from "drizzle-orm";
import { usersTable } from "@/db/schema";
import { db } from "@/index";

test("has heading", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Home" })).toBeVisible();
});

test("database liveness", async ({}, { workerIndex }) => {
  const user: typeof usersTable.$inferInsert = {
    name: "John",
    age: 30,
    email: `john-worker-${workerIndex}-@example.com`,
  };
  await db.insert(usersTable).values(user);
  const users = await db.select().from(usersTable);
  expect(users.length).toBeGreaterThan(0);
  await db
    .update(usersTable)
    .set({
      age: 31,
    })
    .where(eq(usersTable.email, user.email));
  await db.delete(usersTable).where(eq(usersTable.email, user.email));
});
