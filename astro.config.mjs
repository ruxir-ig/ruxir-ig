// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  site: 'https://www.ruchir.dev',
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['@paper-design/shaders', '@paper-design/shaders-react', 'lenis'],
    },
  },
});
