import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node';
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    css: {
        preprocessorOptions: {
            scss: {
                charset: false
            }
        }
    },
    build: {
        minify: false,
        rollupOptions: {
            plugins: [
                // ↓ Needed for build
                nodePolyfills()
            ]
        },
    },
})
