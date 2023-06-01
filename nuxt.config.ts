// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        'assets/main.less',
        'element-plus/theme-chalk/dark/css-vars.css'
    ],
    build: {
        transpile: ['vuetify'],
    },
    modules: [
        [
            '@pinia/nuxt',
            {
                autoImports: [
                    // 自动引入 `usePinia()`
                    'defineStore',
                    // 自动引入 `usePinia()` 并重命名为 `usePiniaStore()`
                    ['defineStore', 'definePiniaStore'],
                ],
            },
        ],
        '@element-plus/nuxt',
    ],
    imports: {
        dirs: ['./stores'],
    },
    runtimeConfig: {
        public: {
            AZURE_OPENAI_KEY: process.env?.AZURE_OPENAI_KEY ?? "",
            AZURE_OPENAI_KEY2: process.env?.AZURE_OPENAI_KEY2 ?? "",
        }
    }
})
