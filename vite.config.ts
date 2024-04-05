import ViteYaml from '@modyfi/vite-plugin-yaml';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/laskuri/', 
  plugins: [react(), ViteYaml()],
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },
/*   optimizeDeps: {
    include: ['@mui/material', '@mui/icons-material'], 
  }, */
});