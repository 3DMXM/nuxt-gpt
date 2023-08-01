<script lang='ts' setup>

const main = useMain()

</script>
<template>
    <v-navigation-drawer v-model="main.drawer">
        <v-list>
            <!-- <v-list-item title="首页" to="/" prepend-icon="mdi-home"></v-list-item> -->
            <v-list-item title="伪原创工具" to="/"></v-list-item>
            <v-list-item title="扩写工具" to="/expand"></v-list-item>
            <v-list-item title="游戏工具" to="/game"></v-list-item>
            <v-list-item title="软件工具" to="/software"></v-list-item>
            <v-list-item title="自定义工具" to="/customize"></v-list-item>
            <v-list-item title="GPT4 测试" to="/gpt4"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'LeftMenu',
}
</script>
<style lang='less' scoped></style>