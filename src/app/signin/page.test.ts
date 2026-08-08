import { expect, test, describe } from "vitest";
import { render, screen } from "@testing-library/react";
import SignIn from "./page";

describe("happy paths", () => {
  test("should sign in on valid credentials", () => {});

  test("should sign in with valid Google account", () => {});

  test("should create new account when signing in with unregistered Google account", () => {});
});

describe("bad paths", () => {
  test("should not sign in on empty credentials", () => {});

  test("should not sign in on invalid password", () => {});

  test("should not sign in on unverified email", () => {});
});

describe("components", () => {
  test("should have sign in components", () => {});

  test("should not have scrollable components", () => {});

  test("should disable sign in button while processing", () => {});
});

describe("navigation", () => {
  test("should navigate to sign up page when clicking link", () => {});
});
