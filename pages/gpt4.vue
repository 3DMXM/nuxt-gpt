<script lang='ts' setup>
import axios from 'axios'
import { marked } from 'marked';
import { useTheme } from 'vuetify'
import { fetchEventSource } from "@fortaine/fetch-event-source"



marked.setOptions({ mangle: false, headerIds: false })
const theme = useTheme()
const openai = useOpenAi()

let input = ref('')
let loading = ref(false)
let content = ref('')
let system = ref('')
let command = ref<any>()
const body_color = computed(() => {
    return theme.global.current.value.dark ? "#fff" : "#24292e"
})

const md = computed(() => {
    return marked(content.value)
})

async function send() {
    if (input.value == "") {
        ElMessage.error('请先输入内容')
        return
    }

    if (loading.value) {
        ElMessage.error('请等待上一次请求完成')
        return
    }

    loading.value = true

    content.value = ""

    // '鲁迅和周树人两人打架谁会赢'
    // TypeError: Cannot read properties of undefined (reading 'delta')


    const messages = [
        { "role": "system", "content": system.value },
        { "role": "user", "content": input.value },
    ]
    const onFuns = {
        onmessage(ev: any) {
            try {
                const json = JSON.parse(ev.data);
                if (json.choices.length > 0) {
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
    openai.chatGPT4(messages, onFuns)

}






</script>
<template>
    <v-container fluid>
        <v-text-field label="系统" v-model="system"></v-text-field>
        <v-textarea label="内容" v-model="input"></v-textarea>
        <v-btn @click="send" :loading="loading">生成</v-btn>
        <div class="box" ref="command">
            <div class="markdown-body" v-html="md"></div>
        </div>
    </v-container>
</template>
<script lang='ts'>

export default {
    name: 'gpt4',
}
</script>
<style lang='less' scoped>
.box {
    .markdown-body {
        padding: 8px 15px;
        border-radius: 3px;
        display: inline-block;
        background-color: transparent;
        color: v-bind(body_color);
    }
}
</style>