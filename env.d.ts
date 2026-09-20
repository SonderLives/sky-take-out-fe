/// <reference types="element-plus/global" />
/// <reference types="vite/client" />

// 让 TS 认识 .vue 文件
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

// 新增：声明你的自定义环境变量
interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  readonly VITE_SERVE: string
  // 以后新增的 VITE_ 变量都加在这里，例如：
  // readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
