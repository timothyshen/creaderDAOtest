import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import nodePolyfills from 'rollup-plugin-polyfill-node';
import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
import rollupNodePolyFill from "rollup-plugin-node-polyfills";
import builtins from "rollup-plugin-node-builtins";
import inject from '@rollup/plugin-inject';
// https://vitejs.dev/config/
export default ({mode}) => {
    process.env = {...process.env, ...loadEnv(mode, process.cwd(), '')};
    return defineConfig({
        server: {
            port: 5000,
        },
        plugins: [
            vue(),
            nodePolyfills({
                include: [
                    "buffer"
                ]
            }),
        ],
        optimizeDeps: {
            esbuildOptions: {
                define: {
                    global: "globalThis",
                },
                plugins: [
                    NodeGlobalsPolyfillPlugin({
                        process: true,
                        buffer: true,
                    }),
                    NodeModulesPolyfillPlugin(),
                ],
            }
        },
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
                    builtins(),
                    rollupNodePolyFill(),
                    inject({
                        include: ['node_modules/@ledgerhq/**'],
                        modules: { Buffer: ['buffer', 'Buffer'], }
                    })
                ]
            },
            commonjsOptions: {
                transformMixedEsModules: true,
                exclude: [ 'node_modules/lodash-es/**', 'node_modules/@types/lodash-es/**', ]
            },
        },
        resolve: {
            alias: {
                "readable-stream": "vite-compatible-readable-stream",
                process: "process/browser",
                stream: "stream-browserify",
                zlib: "browserify-zlib",
                util: 'util'
            }
        }
    })
}
