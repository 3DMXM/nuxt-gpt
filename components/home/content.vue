<script lang='ts' setup>
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css'


const openai = useOpenAi()

const porps = defineProps<{
    system: string
}>()

let label = ref("")
let content = ref("")
let loading = ref(false)
let command = ref<any>()

const md = computed(() => {
    return marked(content.value)
})

async function test() {
    content.value = ""
    loading.value = true
    const messages = [
        { "role": "system", "content": porps.system },
        { "role": "user", "content": label.value },
    ]
    const onFuns = {
        onmessage(ev: any) {
            const json = JSON.parse(ev.data);
            const text = json.choices[0].delta.content
            console.log(text);
            if (text) {
                content.value += text
                // 延迟100ms执行，等待dom渲染完成
                setTimeout(() => {
                    // 滚动条滚动到底部
                    command.value!.scrollTop = command.value?.scrollHeight || 0
                }, 100)
            }
        },
        async onopen(response: any) {
            console.log(`onopen: ${response}`);
        },
        onclose() {
            console.log("onclose");
            loading.value = false
        },
        onerror(err: any) {
            console.log(`onerror: ${err}`);
            loading.value = false
        },
    }
    openai.chatCompletions(messages, onFuns)
}

function copy() {
    // 复制 md.value 的内容
    // navigator.clipboard.writeText(content.value)
    const el = document.createElement('textarea');
    el.value = content.value;
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

}

</script>
<template>
    <div class="content">
        <v-row>
            <v-col cols="12">
                <div> <v-btn append-icon="mdi-content-copy" @click="copy">复制</v-btn></div>
                <v-text-field label="Label" v-model="label">
                    <template v-slot:append-inner>
                        <v-btn variant="text" @click="test" :loading="loading">生成</v-btn>
                    </template>
                </v-text-field>
                <div class="box" ref="command">
                    <div class="markdown-body" v-html="md"></div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'content',
}
</script>
<style lang='less' scoped>
.content {
    padding: 1rem;
    flex: 1 1 auto;
}

.box {
    overflow: auto;
    max-height: 500px;

    .markdown-body {
        padding: 8px 15px;
        border-radius: 3px;
        display: inline-block;
        background-color: transparent;
        color: white;
    }

}
</style>