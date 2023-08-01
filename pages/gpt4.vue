<script lang='ts' setup>
import axios from 'axios'
import { marked } from 'marked';
import { useTheme } from 'vuetify'
import { fetchEventSource } from "@fortaine/fetch-event-source"



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
    // axios.post('/api/gpt4', { input: input.value, system: system.value }).then(({ data }) => {
    //     // console.log(data);
    //     if (data.code == "00") {
    //         content.value = data.message
    //     } else {
    //         ElMessage.error(data.message)
    //     }

    //     loading.value = false
    // })

    axios.post('https://www.miyagpt.com/api/Chat/CreateMessage', {
        "sessionId": "606399586071740480",
        "msg": "你好",
        "messageType": "chat"
    }, {
        headers: {
            'X-Token': '40981107-989b-48af-b2f2-1ad4e89f4507',
            'Cookie': '_ga=GA1.1.984206243.1690875534; X-Token=40981107-989b-48af-b2f2-1ad4e89f4507; __gads=ID=dce09418b62de7ed-222d72941ee300ef:T=1690875530:RT=1690875839:S=ALNI_MbHGAf-nUExC7pDBLm3OnvT246OTA; __gpi=UID=00000d3b013885b7:T=1690875530:RT=1690875839:S=ALNI_Mbt2OvUPCWOOsi38Vqei3_SmL4q3g; _ga_2KT36BZ97H=GS1.1.1690875533.1.1.1690876088.0.0.0',
            'Content-Type': 'application/json'
        }
    }).then(async ({ data }) => {
        console.log(data);
        let result = data.result
        let url = `https://www.miyagpt.com/api/Chat/Gpt?sessionId=${result}&version=1`

        let e = await fetch(url, {
            method: "post",
            headers: {
                "Content-Type": "application/json",
                "X-Token": "40981107-989b-48af-b2f2-1ad4e89f4507"
            }
        })

        if (e.body) {
            const re = e.body.getReader();
            // const {value: t, done: o} = await re.read();

            while (true) {
                const { value: t, done: o } = await re.read();
                console.log(t);
                console.log(o);
                if (o) {
                    break
                }
                const a = new TextDecoder("utf-8").decode(t, {
                    stream: !0
                });
                console.log(a);

            }

        }


        // const fetchOptions = {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //         "x-requested-with": "XMLHttpRequest",
        //         'X-Token': '40981107-989b-48af-b2f2-1ad4e89f4507'
        //     },
        //     openWhenHidden: true,
        // }

        // fetchEventSource(url, {
        //     ...fetchOptions,
        //     onmessage(ev: any) {
        //         console.log(`onmessage:${ev.data}`);
        //     },
        //     async onopen(response: any) {
        //         console.log(`onopen: ${response}`);
        //     },
        //     onclose() {
        //         // console.log("onclose");
        //         ElMessage.success("完成~")
        //         loading.value = false
        //     },
        //     onerror(err: any) {
        //         console.log(err);
        //         ElMessage.error(`错误:${err}`)
        //         loading.value = false
        //     },
        // })
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