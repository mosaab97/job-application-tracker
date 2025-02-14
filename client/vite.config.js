import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Customize the development server port
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // Proxy API requests to your backend
        changeOrigin: true,
        secure: false,
      },
    },
  },
});