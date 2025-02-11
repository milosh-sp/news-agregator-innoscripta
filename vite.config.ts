import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // TODO: Use env for host and port
    port: 8080,
    host: '0.0.0.0',
  },

  css: {
    modules: {
      generateScopedName:
        'production' === process.env.NODE_ENV
          ? `[hash:base64:5]`
          : // CSS File names are only hashed in production/staging
            `[local]`,
    },
  },
})
