import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import 'regenerator-runtime/runtime';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    target: "es2015",
  },
  test:{
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    css:true,
  }

});
