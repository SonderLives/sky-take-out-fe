import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 7070,
    // 启动时预热核心入口，减少首次访问的转换等待
    warmup: {
      clientFiles: ['./src/main.ts', './src/App.vue', './src/router/routers.ts'],
    },
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  // 显式声明依赖预构建范围。
  // Element Plus 按需引入后，各组件的 style/css 是运行期扫描到 import 才被发现的，
  // 会触发 Vite 二次预构建并强制刷新页面，表现为「启动后第一次操作卡住、像没反应」。
  // 提前列全可让预构建一次完成。
  optimizeDeps: {
    include: [
      'vue',
      'vue-router',
      'pinia',
      'axios',
      'element-plus/es',
      'element-plus/es/locale/lang/zh-cn',
      'element-plus/es/components/base/style/css',
      'element-plus/es/components/button/style/css',
      'element-plus/es/components/input/style/css',
      'element-plus/es/components/message/style/css',
      'element-plus/es/components/config-provider/style/css',
      'element-plus/es/components/container/style/css',
      'element-plus/es/components/aside/style/css',
      'element-plus/es/components/header/style/css',
      'element-plus/es/components/main/style/css',
    ],
  },
  plugins: [
    vue(),
    vueDevTools(),
    // 自动按需注册模板中使用的 Element Plus 组件及其样式
    // 说明：未启用 unplugin-auto-import。其生成的 d.ts 头部带 `// @ts-nocheck`，
    // 在 TypeScript 6 下会使 `declare global` 的全局声明失效，导致 vue-tsc 报 Cannot find name。
    Components({
      // 不扫描本地组件目录：本地组件均通过显式 import / 路由引入，
      // 且 404View.vue 会被推导为全局组件名 `404View`，以数字开头不是合法标识符，会导致类型声明语法错误
      dirs: [],
      resolvers: [ElementPlusResolver()],
      dts: 'src/types/components.d.ts',
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
