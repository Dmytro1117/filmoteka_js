import { defineConfig } from 'vite';
import handlebarsPlugin from '@yoichiro/vite-plugin-handlebars';
import env from 'vite-plugin-env-compatible';

export default defineConfig({
  base: '/',
  define: {
    global: 'window',
  },
  root: 'src',

  build: {
    outDir: '../dist',
    rollupOptions: {
      input: {
        main: 'src/index.html',
        portfolio: 'src/library.html',
      },
    },
  },
  plugins: [handlebarsPlugin(), env()],
});
