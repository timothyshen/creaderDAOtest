import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    preprocessorOptions: {
        scss: {
            includePaths: [
                'node_modules',
                'src/styles/variables.scss',
                'src/styles/mixins.scss',
                'src/styles/base.scss',
                'src/styles/components.scss',
                'src/styles/pages.scss',
            ]
        }
    }
  }
})
