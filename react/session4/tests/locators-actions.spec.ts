import { test, expect } from "@playwright/test";

test.describe("Locator Chaining and Actions", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");

    // Wait until default interns are loaded
    await expect(page.getByText("Rahul - 92")).toBeVisible();
  });

  test("finds Rahul card using filter(hasText)", async ({ page }) => {
    const rahulCard = page
      .locator("div")
      .filter({ hasText: "Rahul - 92" })
      .first();

    await expect(rahulCard).toBeVisible();
  });

  test("finds Rahul Remove button using locator chaining", async ({ page }) => {
  const removeButton = page
    .getByText("Rahul - 92")
    .locator("..")
    .getByRole("button", { name: "Remove" });

  await expect(removeButton).toBeVisible();
  });

  test("finds Priya card using filter(hasText)", async ({
    page,
  }) => {
    const priyaCard = page
      .locator("div")
      .filter({ hasText: "Priya - 78" })
      .first();

    await expect(priyaCard).toContainText("Priya");
    await expect(priyaCard).toContainText("78");
  });

  test("counts Remove buttons", async ({ page }) => {
    const removeButtons = page.getByRole("button", {
      name: "Remove",
    });

    await expect(removeButtons).toHaveCount(4);
  });

  test("gets first Remove button", async ({ page }) => {
    await expect(
      page
        .getByRole("button", {
          name: "Remove",
        })
        .first()
    ).toBeVisible();
  });

  test("gets last Remove button", async ({ page }) => {
    await expect(
      page
        .getByRole("button", {
          name: "Remove",
        })
        .last()
    ).toBeVisible();
  });

  test("gets second Remove button using nth()", async ({
    page,
  }) => {
    await expect(
      page
        .getByRole("button", {
          name: "Remove",
        })
        .nth(1)
    ).toBeVisible();
  });

  test("fills name input", async ({ page }) => {
    const nameInput = page.locator(
      'input[name="name"]'
    );

    await nameInput.fill("Vikram");

    await expect(nameInput).toHaveValue(
      "Vikram"
    );
  });

  test("selects Backend role", async ({
    page,
  }) => {
    const role = page.getByRole("combobox");

    await role.selectOption("Backend");

    await expect(role).toHaveValue(
      "Backend"
    );
  });

  test("checks and unchecks Present checkbox", async ({
    page,
  }) => {
    const checkbox =
      page.getByRole("checkbox");

    await checkbox.uncheck();

    await expect(checkbox).not.toBeChecked();

    await checkbox.check();

    await expect(checkbox).toBeChecked();
  });

  test("Tab moves focus to score input", async ({
    page,
  }) => {
    const name = page.locator(
      'input[name="name"]'
    );
    const score =
      page.getByPlaceholder("Score");

    await name.focus();

    await expect(name).toBeFocused();

    await page.keyboard.press("Tab");

    await expect(score).toBeFocused();
  });

  test("clears score input", async ({ page }) => {
  const score = page.getByPlaceholder("Score");

  await score.fill("95");

  await expect(score).toHaveValue("95");

  await score.clear();

  await expect(score).toHaveValue("0");
  });

  test("types into search input", async ({
    page,
  }) => {
    const search =
      page.getByPlaceholder(
        "Search by name..."
      );

    await search.type("Rah");

    await expect(
      page.getByText("Rahul - 92")
    ).toBeVisible();
  });
});