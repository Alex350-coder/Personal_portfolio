import { defineConfig, devices } from '@playwright/test'

const PORT = 4173
const DEV_PORT = 4174

// Headless Chromium has no GPU: SwiftShader gives the Hero a WebGL2 context.
const launchOptions = {
  args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
}

export default defineConfig({
  testDir: './tests/e2e',
  // SwiftShader renders WebGL on the CPU: parallel workers starve each other and make timing tests flaky.
  workers: 1,
  timeout: 60_000,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? [['list'], ['html', { open: 'never' }]] : 'list',
  use: {
    baseURL: `http://127.0.0.1:${PORT}`,
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      testIgnore: /.dev.spec.ts$/,
      use: { ...devices['Desktop Chrome'], launchOptions },
    },
    {
      // Dev-server-only pages (the /__kit gallery). *.dev.spec.ts files run here, not against the build.
      name: 'chromium-dev',
      testMatch: /.dev.spec.ts$/,
      use: { ...devices['Desktop Chrome'], baseURL: `http://127.0.0.1:${DEV_PORT}`, launchOptions },
    },
  ],
  webServer: [
    {
      // Tests run against the production build, as specified in docs/Testing.md.
      command: `npm run build && npm run preview -- --host 127.0.0.1 --port ${PORT} --strictPort`,
      url: `http://127.0.0.1:${PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 120_000,
    },
    {
      command: `npm run dev -- --host 127.0.0.1 --port ${DEV_PORT} --strictPort`,
      url: `http://127.0.0.1:${DEV_PORT}`,
      reuseExistingServer: !process.env.CI,
      timeout: 60_000,
    },
  ],
})
