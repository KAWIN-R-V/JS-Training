import { test, expect } from "@playwright/test";

test.describe("User Journeys", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait until the default intern list loads
    await expect(page.getByText("Rahul - 92")).toBeVisible();
  });

  test("user adds a new intern", async ({ page }) => {
    await page.locator('input[name="name"]').fill("John");
    await page.getByPlaceholder("Score").fill("88");
    await page.getByRole("combobox").selectOption("Backend");

    await page
      .getByRole("button", { name: "Add Intern" })
      .click();

    await expect(
      page.getByText("John", { exact: true }).first()
    ).toBeVisible();
  });

  test("user resets the form", async ({ page }) => {
    const nameInput = page.locator('input[name="name"]');
    const scoreInput = page.getByPlaceholder("Score");
    const roleSelect = page.getByRole("combobox");

    await nameInput.fill("John");
    await scoreInput.fill("88");
    await roleSelect.selectOption("Backend");

    await page
      .getByRole("button", { name: "Reset" })
      .first()
      .click();

    await expect(nameInput).toHaveValue("");
    await expect(scoreInput).toHaveValue("0");
    await expect(roleSelect).toHaveValue("Frontend");
  });

  test("user searches for Rahul", async ({ page }) => {
    const searchBox = page.getByPlaceholder("Search by name...");

    await searchBox.fill("Rahul");

    await expect(
      page.getByText("Rahul - 92")
    ).toBeVisible();
  });

  test("user removes Rahul", async ({ page }) => {
    const rahulRow = page
      .getByText("Rahul - 92")
      .locator("..");

    await rahulRow
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(
      page.getByText("Rahul - 92")
    ).toHaveCount(0);
  });

  test("user adds multiple interns", async ({ page }) => {
    // Add first intern
    await page.locator('input[name="name"]').fill("John");
    await page.getByPlaceholder("Score").fill("90");

    await page
      .getByRole("button", { name: "Add Intern" })
      .click();

    // Add second intern
    await page.locator('input[name="name"]').fill("David");
    await page.getByPlaceholder("Score").fill("80");

    await page
      .getByRole("button", { name: "Add Intern" })
      .click();

    await expect(
      page.getByText("John", { exact: true }).first()
    ).toBeVisible();

    await expect(
      page.getByText("David", { exact: true }).first()
    ).toBeVisible();
  });

  test("user searches after adding an intern", async ({ page }) => {
    await page.locator('input[name="name"]').fill("Alice");
    await page.getByPlaceholder("Score").fill("91");

    await page
      .getByRole("button", { name: "Add Intern" })
      .click();

    await page
      .getByPlaceholder("Search by name...")
      .fill("Alice");

    await expect(
      page.getByText("Alice", { exact: true }).first()
    ).toBeVisible();
  });
});