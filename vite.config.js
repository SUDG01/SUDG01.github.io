import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import { nodePolyfills } from 'vite-plugin-node-polyfills' 
import viteImagemin from 'vite-plugin-imagemin' // ✅ 引入插件

const root = path.resolve(process.cwd());

export default defineConfig(() => {
  return {
    base: '/', 
    plugins: [
      vue(),
      nodePolyfills(),
      viteImagemin({
        // PNG 压缩
        pngquant: {
          quality: [0.6, 0.8]
        },
        // JPEG 压缩
        mozjpeg: {
          quality: 75,
        },
        // SVG 压缩
        svgo: {
          plugins: [
            { name: 'removeViewBox', active: false },
            { name: 'removeEmptyAttrs', active: false },
          ]
        },
        // GIF 压缩
        gifsicle: {
          optimizationLevel: 3,
          interlaced: false
        },
        // WebP 生成
        webp: {
          quality: 75
        }
      }) 
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
