import { test, expect } from "@playwright/test";

/*
page.fill()
- Replaces existing text immediately.

page.type()
- Types character by character.
- Useful when testing typing behaviour.
*/

test("fill example", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Name").fill("Rahul");
});

/*
Keyboard.press()

Presses keyboard keys like Tab,
Enter, Escape etc.
*/

test("keyboard tab example", async ({ page }) => {
  await page.goto("/");

  await page.getByPlaceholder("Name").fill("Rahul");

  await page.keyboard.press("Tab");

  await expect(
    page.getByPlaceholder("Score")
  ).toBeFocused();
});

/*
page.screenshot()

Captures the current browser page.
*/

test("take screenshot", async ({ page }) => {
  await page.goto("/");

  await page.screenshot({
    path: "homepage.png",
  });
});

/*
test.only()

Runs only one test.
Useful while debugging.

test.skip()

Skips a test temporarily.

Never commit test.only()
because the remaining tests
will not execute.
*/