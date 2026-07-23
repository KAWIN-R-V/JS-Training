import { test } from "@playwright/test";
import { DashboardPage } from "./pages/DashboardPage";

test.describe("Page Object Model", () => {
  let dashboard: DashboardPage;

  test.beforeEach(async ({ page }) => {
    dashboard = new DashboardPage(page);

    await dashboard.goto();
  });

  test("adds a new intern", async () => {
    await dashboard.addIntern(
      "John",
      "90",
      "Backend"
    );

    await dashboard.expectInternVisible(
      "John - 90"
    );
  });

  test("searches for Rahul", async () => {
    await dashboard.search("Rahul");

    await dashboard.expectInternVisible(
      "Rahul - 92"
    );
  });

  test("resets the form", async () => {
    await dashboard.nameInput().fill("John");

    await dashboard.scoreInput().fill("88");

    await dashboard.reset();

    await dashboard.expectNameEmpty();
    await dashboard.expectScoreZero();
    await dashboard.expectRoleFrontend();
  });

  test("removes the first intern", async () => {
    await dashboard.removeFirstIntern();

    await dashboard.expectInternVisible(
      "Priya - 78"
    );
  });
});