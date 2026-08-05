import { test, expect } from "@playwright/test";

test.describe("Intern Dashboard", () => {
  test("loads the dashboard page", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/session4/i);
  });

  test("shows Add Intern heading", async ({ page }) => {
    await page.goto("/");

    await expect(
      page.getByRole("heading", {
        name: "Add Intern",
      })
    ).toBeVisible();
  });

  test("shows Add Intern name input", async ({ page }) => {
    await page.goto("/");

    const nameInput = page.locator('input[name="name"]');

    await expect(nameInput).toBeVisible();
  });

  test("shows score input", async ({ page }) => {
    await page.goto("/");

    const scoreInput = page.getByPlaceholder("Score");

    await expect(scoreInput).toBeVisible();
  });

  test("shows Add Intern button", async ({ page }) => {
    await page.goto("/");

    const addButton = page.getByRole("button", {
      name: "Add Intern",
    });

    await expect(addButton).toBeVisible();
  });

  test("shows Reset button", async ({ page }) => {
    await page.goto("/");

    const resetButton = page.getByRole("button", {
      name: "Reset",
    }).first();

    await expect(resetButton).toBeVisible();
  });

  test("name input starts empty", async ({ page }) => {
    await page.goto("/");

    const nameInput = page.locator('input[name="name"]');

    await expect(nameInput).toHaveValue("");
  });

  test("score starts at 0", async ({ page }) => {
    await page.goto("/");

    const scoreInput = page.getByPlaceholder("Score");

    await expect(scoreInput).toHaveValue("0");
  });

  test("role defaults to Frontend", async ({ page }) => {
    await page.goto("/");

    const roleSelect = page.getByRole("combobox");

    await expect(roleSelect).toHaveValue("Frontend");
  });

  test("allows typing in the name field", async ({ page }) => {
    await page.goto("/");

    const nameInput = page.locator('input[name="name"]');

    await nameInput.fill("Rahul");

    await expect(nameInput).toHaveValue("Rahul");
  });

  test("allows typing in the score field", async ({ page }) => {
  await page.goto("/");

  const scoreInput = page.getByPlaceholder("Score");

  await scoreInput.fill("95");

  await expect(scoreInput).toHaveValue("95");
  });

test("allows selecting a different role", async ({ page }) => {
  await page.goto("/");

  const roleSelect = page.getByRole("combobox");

  await roleSelect.selectOption("Backend");

  await expect(roleSelect).toHaveValue("Backend");
  });

test("allows toggling the Present checkbox", async ({ page }) => {
  await page.goto("/");

  const checkbox = page.getByRole("checkbox");

  await expect(checkbox).toBeChecked();

  await checkbox.uncheck();

  await expect(checkbox).not.toBeChecked();

  await checkbox.check();

  await expect(checkbox).toBeChecked();
  });

test("resets the form", async ({ page }) => {
  await page.goto("/");

  const nameInput = page.locator('input[name="name"]');
  const scoreInput = page.getByPlaceholder("Score");
  const roleSelect = page.getByRole("combobox");
  const resetButton = page
    .getByRole("button", { name: "Reset" })
    .first();

  await nameInput.fill("Rahul");
  await scoreInput.fill("90");
  await roleSelect.selectOption("Backend");

  await resetButton.click();

  await expect(nameInput).toHaveValue("");
  await expect(scoreInput).toHaveValue("0");
  await expect(roleSelect).toHaveValue("Frontend");
  });

test("adds a new intern", async ({ page }) => {
  await page.goto("/");

  await page.locator('input[name="name"]').fill("Rahul");
  await page.getByPlaceholder("Score").fill("95");
  await page.getByRole("combobox").selectOption("Backend");

  await page
    .getByRole("button", { name: "Add Intern" })
    .click();

  await expect(
    page.getByText("Rahul", { exact: true }).first()
  ).toBeVisible();
});

test("searches for an intern", async ({ page }) => {
  await page.goto("/");

  await page.locator('input[name="name"]').fill("Rahul");
  await page.getByPlaceholder("Score").fill("95");

  await page
    .getByRole("button", { name: "Add Intern" })
    .click();

  await page
    .getByPlaceholder("Search by name...")
    .fill("Rahul");

  await expect(
    page.getByText("Rahul", { exact: true }).first()
  ).toBeVisible();
});

test("removes an intern", async ({ page }) => {
  await page.goto("/");

  await page.locator('input[name="name"]').fill("Rahul");
  await page.getByPlaceholder("Score").fill("95");

  await page
    .getByRole("button", { name: "Add Intern" })
    .click();

  await page
    .getByRole("button", { name: "Remove" })
    .first()
    .click();

  await expect(
    page.getByText("Rahul", { exact: true })
  ).toHaveCount(0);
});
});