import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto("/");
    await expect(
      this.page.getByText("Rahul - 92")
    ).toBeVisible();
  }

  // ---------- Locators ----------

  nameInput(): Locator {
    return this.page.locator('input[name="name"]');
  }

  scoreInput(): Locator {
    return this.page.getByPlaceholder("Score");
  }

  roleDropdown(): Locator {
    return this.page.getByRole("combobox");
  }

  presentCheckbox(): Locator {
    return this.page.getByRole("checkbox");
  }

  addButton(): Locator {
    return this.page.getByRole("button", {
      name: "Add Intern",
    });
  }

  resetButton(): Locator {
    return this.page
      .getByRole("button", {
        name: "Reset",
      })
      .first();
  }

  searchInput(): Locator {
    return this.page.getByPlaceholder(
      "Search by name..."
    );
  }

  removeButtons(): Locator {
    return this.page.getByRole("button", {
      name: "Remove",
    });
  }

  // ---------- Actions ----------

  async addIntern(
    name: string,
    score: string,
    role: string = "Frontend"
  ) {
    await this.nameInput().fill(name);
    await this.scoreInput().fill(score);
    await this.roleDropdown().selectOption(role);

    await this.addButton().click();
  }

  async search(name: string) {
    await this.searchInput().fill(name);
  }

  async reset() {
    await this.resetButton().click();
  }

  async removeFirstIntern() {
    await this.removeButtons().first().click();
  }

  // ---------- Assertions ----------

  async expectInternVisible(text: string) {
    await expect(
      this.page.getByText(text)
    ).toBeVisible();
  }

  async expectNameEmpty() {
    await expect(
      this.nameInput()
    ).toHaveValue("");
  }

  async expectScoreZero() {
    await expect(
      this.scoreInput()
    ).toHaveValue("0");
  }

  async expectRoleFrontend() {
    await expect(
      this.roleDropdown()
    ).toHaveValue("Frontend");
  }
}