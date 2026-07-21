import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./tests",

  // Runs multiple test files in parallel for faster execution.
  fullyParallel: true,

  // Retries failed tests twice only in CI.
  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  reporter: "html",

  timeout: 30000,

  use: {
    // Base URL used when calling page.goto("/")
    baseURL: "http://localhost:5173",

    // Records a trace only if a test fails and retries.
    trace: "on-first-retry",

    screenshot: "only-on-failure",
  },

  // Browser/device configuration.
  // Desktop Chrome provides viewport, user agent and device pixel ratio.
  // Other available presets:
  // - devices['iPhone 14']
  // - devices['Pixel 7']
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  // Starts the Vite dev server before running tests.
  webServer: {
    command: "npm run dev",
    url: "http://localhost:5173",
    reuseExistingServer: !process.env.CI,
  },
});