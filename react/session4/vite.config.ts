/// <reference types="vitest/config" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { coverageConfigDefaults } from "vitest/config";

export default defineConfig({
  plugins: [react()],

  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/test/setup.ts",

    // Ignore Playwright tests
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "tests/**",
      "**/*.spec.ts",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",

      thresholds: {
        statements: 70,
        branches: 65,
        functions: 60,
        lines: 70,
      },
      
      exclude: [
        ...coverageConfigDefaults.exclude,
        "tests/**",
        "**/*.spec.ts",
      ],
    },
  },
});