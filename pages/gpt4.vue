<script lang='ts' setup>
import axios from 'axios'
import { marked } from 'marked';
import { useTheme } from 'vuetify'



marked.setOptions({ mangle: false, headerIds: false })
const theme = useTheme()

let input = ref('')
let loading = ref(false)
let content = ref('')
let system = ref('')
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
    // '鲁迅和周树人两人打架谁会赢'
    axios.post('/api/gpt4', { input: input.value, system: system.value }).then(({ data }) => {
        // console.log(data);
        if (data.code == "00") {
            content.value = data.message
        } else {
            ElMessage.error(data.message)
        }

        loading.value = false
    })

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