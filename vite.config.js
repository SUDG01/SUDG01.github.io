import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills' 

const root = path.resolve(process.cwd());

export default defineConfig(() => {
  return {
    base: '/', 
    plugins: [
      vue(),
      nodePolyfills() 
    ],
    resolve: {
      alias: {
        '@': path.resolve(root, 'src'),
        'buffer': 'buffer',
      }
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
        },
      },
    },
  };
});
