import { sentryVitePlugin } from "@sentry/vite-plugin";
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), sentryVitePlugin({
    org: "party-sharing",
    project: "javascript-react"
  }), sentryVitePlugin({
    org: "party-sharing",
    project: "apple-website"
  })],

  build: {
    sourcemap: true
  }
})