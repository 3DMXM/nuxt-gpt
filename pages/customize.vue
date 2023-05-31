<script lang='ts' setup>

const system = ref("")

const items = [
    "我给你一个游戏标题,你帮我写一篇大约1000字的文章",
    "我告诉你首段文字,你在此基础上继续帮我写一篇大约1000字的文章",
    ""
]

</script>
<template>
    <v-container fluid>
        <HomeChatBox title="自定义" :system="system">
            <template v-slot:title>
                <!-- header 插槽的内容放这里 -->
                <v-text-field v-model="system" :items="items" variant="underlined" placeholder="在此输入魔法咒语"
                    hide-details></v-text-field>
            </template>
        </HomeChatBox>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'customize',
}
</script>
<style lang='less' scoped></style>