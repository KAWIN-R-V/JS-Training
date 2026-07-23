import { test, expect } from "@playwright/test";

test.describe("Advanced Assertions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/session4/i);
  });

  test("Add Intern heading is visible", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Add Intern",
      })
    ).toBeVisible();
  });

  test("Name input is visible", async ({ page }) => {
    await expect(
      page.locator('input[name="name"]')
    ).toBeVisible();
  });

  test("Score input is visible", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Score")
    ).toBeVisible();
  });

  test("Name input starts empty", async ({ page }) => {
    await expect(
      page.locator('input[name="name"]')
    ).toHaveValue("");
  });

  test("Score input starts with 0", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Score")
    ).toHaveValue("0");
  });

  test("Role defaults to Frontend", async ({ page }) => {
    await expect(
      page.getByRole("combobox")
    ).toHaveValue("Frontend");
  });

  test("Present checkbox is checked", async ({ page }) => {
    await expect(
      page.getByRole("checkbox")
    ).toBeChecked();
  });

  test("Add Intern button is enabled", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: "Add Intern",
      })
    ).toBeEnabled();
  });

  test("Reset button is enabled", async ({ page }) => {
    await expect(
      page
        .getByRole("button", {
          name: "Reset",
        })
        .first()
    ).toBeEnabled();
  });

  test("Search input is visible", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Search by name...")
    ).toBeVisible();
  });

  test("Intern list is visible after loading", async ({ page }) => {
    await expect(
      page.getByText("Rahul - 92")
    ).toBeVisible();
  });

  test("Remove button is visible", async ({ page }) => {
    await expect(
      page
        .getByRole("button", {
          name: "Remove",
        })
        .first()
    ).toBeVisible();
  });
});