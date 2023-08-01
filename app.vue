<script lang='ts' setup>
import { useTheme } from 'vuetify'

const main = useMain()
const theme = useTheme()

let _theme = ref(false)

watch(_theme, () => {
    toggleTheme()
})

function toggleTheme() {
    // theme.value.global.name.value = theme.value.global.current.value.dark ? 'light' : 'dark'
    theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'

}

useHead({
    htmlAttrs: {
        class: 'dark'
    }
})


</script>
<template>
    <NuxtLayout>
        <v-card>
            <v-layout>
                <v-app-bar title="ChatGPT 可视化界面">
                    <template v-slot:prepend>
                        <v-btn icon="mdi-menu" @click="main.drawer = !main.drawer"></v-btn>
                    </template>
                    <template v-slot:append>
                        <v-switch label="切换主题" v-model="_theme" color="indigo"></v-switch>
                    </template>
                </v-app-bar>
                <!-- <LeftMenu></LeftMenu> -->
                <base-left-menu></base-left-menu>
                <v-main style="height: 100vh;">
                    <router-view v-slot="{ Component }">
                        <keep-alive>
                            <component :is="Component" />
                        </keep-alive>
                    </router-view>
                </v-main>
            </v-layout>
        </v-card>
    </NuxtLayout>
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
