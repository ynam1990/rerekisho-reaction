import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  console.log('Loaded environment variables:', env);

  return {
    plugins: [react()],
    build: {
      outDir: 'dist',
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": "/src",
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api': {
          target: `http://localhost:${ env.VITE_LOCAL_API_PORT || 3001 }`,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    test: {
      setupFiles: '/src/test/setup.ts',
      environment: 'jsdom',
      globals: true,
      css: true,
      coverage: {
        provider: 'v8',
      }
    },
  };
});
