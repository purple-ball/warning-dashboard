import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';

export default defineConfig({
  plugins: [react(), viteSingleFile()],
  base: './',
  build: {
    // 针对单文件优化，防止代码分割导致加载失败
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
});