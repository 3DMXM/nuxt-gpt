<script lang='ts' setup>

const main = useMain()

</script>
<template>
    <v-navigation-drawer v-model="main.drawer">
        <v-list>
            <!-- <v-list-item title="首页" to="/" prepend-icon="mdi-home"></v-list-item> -->
            <v-list-item title="伪原创" to="/" prepend-icon="mdi-home"></v-list-item>
            <v-list-item title="游戏介绍" to="/game" prepend-icon="mdi-home"></v-list-item>
            <v-list-item title="软件介绍" to="/software" prepend-icon="mdi-home"></v-list-item>
        </v-list>
    </v-navigation-drawer>
</template>
<script lang='ts'>

export default {
    name: 'LeftMenu',
}
</script>
<style lang='less' scoped></style>