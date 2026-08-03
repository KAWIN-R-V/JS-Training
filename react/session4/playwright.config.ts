import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  // Folder containing Playwright tests
  testDir: "./tests",

  // Run tests in parallel
  fullyParallel: true,

  // Prevent accidental test.only in CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests in CI
  retries: process.env.CI ? 2 : 0,

  // Use one worker in CI
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML report
  reporter: [["html", { open: "never" }]],

  use: {
    // Base URL of your Vite application
    baseURL: "http://localhost:5173",

    // Capture trace only on first retry
    trace: "on-first-retry",

    // Capture screenshot on failures
    screenshot: "only-on-failure",

    // Record video only on failures
    video: "retain-on-failure",
  },

  // Start Vite automatically before tests
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },

  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],
});