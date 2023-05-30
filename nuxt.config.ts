// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    css: [
        'vuetify/styles',
        '@mdi/font/css/materialdesignicons.css',
        'assets/main.less'
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
    ],
    imports: {
        dirs: ['./stores'],
    },
})
