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
    ElMessage.success(`全部复制完成, 共${el.value.length}个字.`)

}

</script>
<template>
    <div class="chat-box">
        <div>
            <v-row>
                <v-col cols="12">
                    <v-row class="chat-top">
                        <v-col cols="12" md="6" xl="4" class="chat-title">
                            <h2>{{ title }}</h2>
                            <v-btn variant="text" @click="contentNum++"> + </v-btn>
                            <v-btn variant="text" @click="contentNum--"> - </v-btn>
                            <v-btn variant="text" append-icon="mdi-content-copy" @click="copy">一键复制</v-btn>
                        </v-col>
                        <v-col cols="12" md="6" xl="8">
                            <slot name="title"></slot>
                        </v-col>
                    </v-row>

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
    height: calc(100vh - 80px);
    overflow-y: auto;
    overflow-x: hidden;

    .chat-top {
        display: flex;
        align-items: center;

        .chat-title {
            display: flex;
            align-items: center;
        }
    }

    .chat-content {
        flex: 1 1 auto;
        display: flex;
        flex-direction: row;
        overflow: auto;
    }
}
</style>