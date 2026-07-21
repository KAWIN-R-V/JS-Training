import { test, expect } from "@playwright/test";

test.describe("Intern Dashboard", () => {

  // beforeEach runs before every test so each test starts
  // from the same page instead of repeating page.goto("/")
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("shows the page title", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Intern Dashboard" })
    ).toBeVisible();
  });

  test("shows the initial intern names", async ({ page }) => {
    await expect(page.getByText("Rahul")).toBeVisible();
    await expect(page.getByText("Priya")).toBeVisible();
    await expect(page.getByText("Amit")).toBeVisible();
    await expect(page.getByText("Sneha")).toBeVisible();
  });

  test("shows the correct number of intern cards", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);
  });

  test("shows the theme toggle button", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();
  });

});

/*
Difference between Playwright's toBeVisible() and
React Testing Library's toBeInTheDocument():

toBeVisible()
- Confirms the element exists and is visible to the user.

toBeInTheDocument()
- Only confirms the element exists in the DOM.
- It may still be hidden.
*/

test.describe("Locator Practice — getByRole", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("finds the Add Intern button by role", async ({ page }) => {
    const addButton = page.getByRole("button", {
      name: "Add Intern",
    });

    await expect(addButton).toBeVisible();
  });

  test("finds the heading by role", async ({ page }) => {
    const heading = page.getByRole("heading", {
      name: "Intern Dashboard",
    });

    await expect(heading).toBeVisible();
  });

  test("finds the name input by placeholder", async ({ page }) => {
    const input = page.getByPlaceholder("Name");

    await expect(input).toBeVisible();
    await expect(input).toBeEmpty();
  });

  test("finds the score input by placeholder", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Score")
    ).toBeVisible();
  });

  test("finds text with exact matching", async ({ page }) => {
    await expect(
      page.getByText("Rahul")
    ).toBeVisible();
  });

  test("finds text with regex matching", async ({ page }) => {
    await expect(
      page.getByText(/Score: \d+/).first()
    ).toBeVisible();
  });

  test("asserts absent element", async ({ page }) => {
    await expect(
      page.getByText("Placeholder")
    ).not.toBeVisible();
  });

});

/*
Why use getByRole()?

It locates elements the same way assistive technologies do,
making tests more reliable and encouraging accessible HTML.

Why .first()?

The regex matches several score elements.
.first() selects the first matching element.
*/



test.describe("Assertions", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("heading has correct text", async ({ page }) => {
    await expect(
      page.getByRole("heading", {
        name: "Intern Dashboard",
      })
    ).toHaveText("Intern Dashboard");
  });

  test("button contains Dark", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toContainText("Dark");
  });

  test("error is hidden initially", async ({ page }) => {
    await expect(
      page.getByText("Name is required")
    ).not.toBeVisible();
  });

  test("name input empty", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Name")
    ).toHaveValue("");
  });

  test("score starts at zero", async ({ page }) => {
    await expect(
      page.getByPlaceholder("Score")
    ).toHaveValue("0");
  });

  test("remove button count", async ({ page }) => {
    await expect(
      page.getByRole("button", {
        name: "Remove",
      })
    ).toHaveCount(4);
  });

});

/*
toHaveText()
Requires an exact text match.

toContainText()
Checks only that the expected text appears somewhere
inside the element.
*/

test.describe("Add Intern Journey", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  /*
    This E2E test verifies the complete user workflow:
    entering data, submitting the form, updating the UI,
    and rendering the new intern. Unit tests cannot verify
    the interaction between all these parts together.
  */

  test("adds a new intern and shows them in the list", async ({ page }) => {
    await page.getByPlaceholder("Name").fill("Vikram");

    await page.getByPlaceholder("Score").clear();
    await page.getByPlaceholder("Score").fill("88");

    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(page.getByText("Vikram")).toBeVisible();
    await expect(page.getByText(/88/)).toBeVisible();
  });

  test("intern count increases after adding", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

    await page.getByPlaceholder("Name").fill("Vikram");
    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(5);
  });

  test("form clears after successful submission", async ({ page }) => {
    await page.getByPlaceholder("Name").fill("Vikram");
    await page.getByPlaceholder("Score").fill("88");

    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(
      page.getByPlaceholder("Name")
    ).toHaveValue("");
  });

  test("shows validation error when name is empty", async ({ page }) => {
    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(
      page.getByText("Name is required")
    ).toBeVisible();
  });

  test("does not add intern when form is invalid", async ({ page }) => {
    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);
  });

  test("validation disappears after entering name", async ({ page }) => {
    await page.getByRole("button", { name: "Add Intern" }).click();

    await expect(
      page.getByText("Name is required")
    ).toBeVisible();

    await page.getByPlaceholder("Name").fill("Vikram");

    await expect(
      page.getByText("Name is required")
    ).not.toBeVisible();
  });

});

/*
Playwright automatically waits for the element
to become hidden, so not.toBeVisible() is the
preferred assertion instead of queryByText().
*/


test.describe("Remove Intern Journey", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("removes an intern", async ({ page }) => {
    await expect(page.getByText("Rahul")).toBeVisible();

    const rahulCard = page.getByText("Rahul").locator("..");

    await rahulCard
      .getByRole("button", { name: "Remove" })
      .click();

    await expect(page.getByText("Rahul")).not.toBeVisible();
  });

  test("intern count decreases", async ({ page }) => {
    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(4);

    await page
      .getByRole("button", { name: "Remove" })
      .first()
      .click();

    await expect(
      page.getByRole("button", { name: "Remove" })
    ).toHaveCount(3);
  });

});

/*
Alternative using locator.filter():

page.locator("div")
.filter({ hasText: "Rahul" })
.getByRole("button",{name:"Remove"})
.click();
*/




test.describe("Theme Toggle Journey", () => {

  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("changes Dark to Light", async ({ page }) => {

    await page
      .getByRole("button", {
        name: /switch to dark mode/i,
      })
      .click();

    await expect(
      page.getByRole("button", {
        name: /switch to light mode/i,
      })
    ).toBeVisible();
  });

  test("toggles back", async ({ page }) => {

    await page
      .getByRole("button", {
        name: /switch to dark mode/i,
      })
      .click();

    await page
      .getByRole("button", {
        name: /switch to light mode/i,
      })
      .click();

    await expect(
      page.getByRole("button", {
        name: /switch to dark mode/i,
      })
    ).toBeVisible();
  });

});

/*
Unlike a unit test, this verifies the application
running inside a real browser, including rendering,
DOM updates and user interaction.
*/