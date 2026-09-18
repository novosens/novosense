import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  workers: 2,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: {
    browserName: 'chromium',
    launchOptions: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH
      ? { executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH }
      : {},
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'site',
      testMatch: 'site.spec.ts',
      use: { baseURL: 'http://127.0.0.1:4321' },
    },
    {
      name: 'consent',
      testMatch: 'consent.spec.ts',
      use: { baseURL: 'http://127.0.0.1:4322' },
    },
  ],
  webServer: [
    {
      command: 'mise run preview',
      url: 'http://127.0.0.1:4321',
      reuseExistingServer: false,
    },
    {
      command: 'mise run preview:analytics',
      url: 'http://127.0.0.1:4322',
      reuseExistingServer: false,
    },
  ],
});
