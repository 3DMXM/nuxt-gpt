<script lang='ts' setup>
import { marked } from 'marked';
import 'github-markdown-css/github-markdown-light.css'
import { useTheme } from 'vuetify'

marked.setOptions({ mangle: false, headerIds: false })

const openai = useOpenAi()
const theme = useTheme()


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
const body_color = computed(() => {
    return theme.global.current.value.dark ? "#fff" : "#24292e"
})

async function generate() {

    content.value = ""
    loading.value = true
    const messages = [
        { "role": "system", "content": porps.system },
        { "role": "user", "content": label.value },
    ]
    const onFuns = {
        onmessage(ev: any) {
            try {
                const json = JSON.parse(ev.data);
                const text = json.choices[0].delta.content
                // console.log(text);
                if (text) {
                    content.value += text
                    // 延迟100ms执行，等待dom渲染完成
                    setTimeout(() => {
                        // 滚动条滚动到底部
                        command.value!.scrollTop = command.value?.scrollHeight || 0
                    }, 100)
                }
            } catch (error) {
                console.log(error);
                ElMessage.error(`错误:${error}`)
            }


        },
        async onopen(response: any) {
            // console.log(`onopen: ${response}`);
        },
        onclose() {
            // console.log("onclose");
            ElMessage.success("完成~")
            loading.value = false
        },
        onerror(err: any) {
            console.log(err);
            ElMessage.error(`错误:${err}`)
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

    ElMessage.success(`复制完成, 共${content.value.length}个字.`)

}

defineExpose({
    label,
    content,
    generate,
})

</script>
<template>
    <div class="content">
        <v-row>
            <v-col cols="12">
                <div> <v-btn variant="text" append-icon="mdi-content-copy" @click="copy">复制</v-btn></div>
                <v-textarea label="原内容" v-model="label" rows="1" auto-grow variant="underlined">
                    <template v-slot:append-inner>
                        <v-btn variant="text" @click="generate" :loading="loading">生成</v-btn>
                    </template>
                </v-textarea>
                <div class="box" ref="command">
                    <div class="markdown-body" v-html="md"></div>
                </div>
            </v-col>
        </v-row>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'content'
}
</script>
<style lang='less' scoped>
.content {
    padding: 1rem;
    flex: 1 1 auto;
    min-width: 300px;

    .box {
        .markdown-body {
            padding: 8px 15px;
            border-radius: 3px;
            display: inline-block;
            background-color: transparent;
            color: v-bind(body_color);
        }
    }
}
</style>