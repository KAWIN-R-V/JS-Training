import { test, expect } from "@playwright/test";

test.describe("Self Learning", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Add Intern",
      })
    ).toBeVisible();
  });

  test("captures a screenshot", async ({ page }) => {
    await page.screenshot({
      path: "test-results/dashboard.png",
      fullPage: true,
    });

    await expect(true).toBeTruthy();
  });

  test("fills the name field using the keyboard", async ({
    page,
  }) => {
    const nameInput = page.locator(
      'input[name="name"]'
    );

    await nameInput.click();

    await page.keyboard.type("Rahul");

    await expect(nameInput).toHaveValue(
      "Rahul"
    );
  });

  test("uses Tab to move between inputs", async ({
    page,
  }) => {
    const nameInput = page.locator(
      'input[name="name"]'
    );

    const scoreInput =
      page.getByPlaceholder("Score");

    await nameInput.focus();

    await expect(nameInput).toBeFocused();

    await page.keyboard.press("Tab");

    await expect(scoreInput).toBeFocused();
  });

  test("double-clicks the Reset button", async ({
    page,
  }) => {
    const resetButton = page
      .getByRole("button", {
        name: "Reset",
      })
      .first();

    await page
      .locator('input[name="name"]')
      .fill("John");

    await resetButton.dblclick();

    await expect(
      page.locator('input[name="name"]')
    ).toHaveValue("");
  });

  test("selects Backend role", async ({
    page,
  }) => {
    const role =
      page.getByRole("combobox");

    await role.selectOption("Backend");

    await expect(role).toHaveValue(
      "Backend"
    );
  });

  test("searches for Rahul", async ({
    page,
  }) => {
    await page
      .getByPlaceholder("Search by name...")
      .fill("Rahul");

    await expect(
      page.getByText("Rahul - 92")
    ).toBeVisible();
  });

  test("adds an intern using keyboard and mouse", async ({
    page,
  }) => {
    await page
      .locator('input[name="name"]')
      .click();

    await page.keyboard.type("David");

    await page
      .getByPlaceholder("Score")
      .fill("90");

    await page
      .getByRole("combobox")
      .selectOption("Backend");

    await page
      .getByRole("button", {
        name: "Add Intern",
      })
      .click();

    await expect(
      page.getByText("David", {
        exact: true,
      }).first()
    ).toBeVisible();
  });
});