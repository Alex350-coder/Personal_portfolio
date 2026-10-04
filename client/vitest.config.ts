import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(import.meta.dirname, './src') },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
    restoreMocks: true,
    coverage: {
      provider: 'v8',
      reporter: ['text-summary', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        // WebGL2 shader pipeline: jsdom has no WebGL context. Covered by the
        // Playwright smoke test (canvas present, no console errors) instead.
        'src/components/ui/halftone-nebula.tsx',
        // Bootstrap only: mounts <App/> into #root.
        'src/main.tsx',
        'src/test/**',
        'src/**/*.d.ts',
        'src/**/*.test.{ts,tsx}',
      ],
      thresholds: { lines: 80, branches: 80, functions: 80, statements: 80 },
    },
  },
})
