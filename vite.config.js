import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['react-calendar-heatmap'],
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
      },
      '/swagger-ui': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
      },
      '/v3/api-docs': {
        target: 'http://127.0.0.1:8080/',
        changeOrigin: true,
      },
    },
  },
});
