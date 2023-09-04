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
    ssr: process.env.NODE_ENV != 'development',
    modules: [
        '@nuxt-alt/proxy',
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
            AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT ?? "",
            AZURE_OPENAI_KEY2: process.env?.AZURE_OPENAI_KEY2 ?? "",
            AZURE_OPENAI_ENDPOINT2: process.env.AZURE_OPENAI_ENDPOINT2 ?? "",
            AZURE_OPENAI_KEY3: process.env?.AZURE_OPENAI_KEY3 ?? "",
            AZURE_OPENAI_ENDPOINT3: process.env.AZURE_OPENAI_ENDPOINT3 ?? "",
            AZURE_OPENAI_GPT4_ENDPOINT: process.env.AZURE_OPENAI_GPT4_ENDPOINT ?? "",
            LOGIN_PASSWORD: process.env.LOGIN_PASSWORD ?? "",
            LOGIN_USERNAME: process.env.LOGIN_USERNAME ?? "",
        }
    },

    // proxy: {
    //     proxies: {
    //         '/gptifyjp': {
    //             target: 'https://gptifyjp.openai.azure.com',
    //             changeOrigin: true,
    //             rewrite: (path: any) => path.replace(/^\/gptifyjp/, '')
    //         },
    //         '/gptifywe': {
    //             target: 'https://gptifywe.openai.azure.com',
    //             changeOrigin: true,
    //             rewrite: (path: any) => path.replace(/^\/gptifywe/, '')
    //         },
    //         '/gptify': {
    //             target: 'https://gptify.openai.azure.com',
    //             changeOrigin: true,
    //             rewrite: (path: any) => path.replace(/^\/gptify/, '')
    //         },
    //     }
    // },
})
