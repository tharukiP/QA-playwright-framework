// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',

  fullyParallel: false,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: 1,

  reporter: 'html',

  use: {
    baseURL: 'https://app.optiomax.com',
    headless: false,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
    },

    {
      name: 'chromium',

      use: {
        ...devices['Desktop Chrome'],

        // Only normal tests should read the saved login session
        storageState: 'playwright/.auth/user.json',
      },

      dependencies: ['setup'],
    },
  ],
});