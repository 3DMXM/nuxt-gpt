<script lang='ts' setup>
// import content from '@src/components/home/content.vue'
import { ref } from "vue";

let contentNum = ref(1)

const porps = defineProps<{
    title: string,
    system: string
}>()
const content = ref<any>()

function copy() {
    // console.log(content.value);
    const el = document.createElement('textarea');
    content.value.forEach((item: any) => {
        el.value += `\n\n${item.label} \n\n${item.content}`
    });
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
    ElMessage.success("全部复制完成~")

}

</script>
<template>
    <div class="chat-box">
        <div>
            <v-row>
                <v-col cols="12">
                    <h2>{{ title }}</h2>
                    <v-btn @click="contentNum++"> + </v-btn>
                    <v-btn @click="contentNum--"> - </v-btn>
                    <v-btn append-icon="mdi-content-copy" @click="copy">一键复制</v-btn>
                </v-col>
                <v-col cols="12" class="chat-content">
                    <home-content v-for="index in contentNum" :key="index" :system="system" ref="content"></home-content>
                </v-col>
            </v-row>
        </div>

    </div>
</template>
<script lang='ts'>

export default {
    name: 'ChatBox',
}
</script>
<style lang='less' scoped>
.chat-box {
    // display: flex;
    // flex-direction: column;
    height: calc(100vh - 80px);

    .chat-content {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
    }
}
</style>