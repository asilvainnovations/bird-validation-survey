import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Vendor chunks — split large dependencies for faster first paint
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-data': ['@supabase/supabase-js', '@tanstack/react-query'],
          'vendor-utils': ['zod', 'clsx', 'tailwind-merge', 'sonner'],
        },
      },
    },
    chunkSizeWarningLimit: 600,
    sourcemap: false,
    minify: 'esbuild',
    target: 'es2020',
  },
}));
