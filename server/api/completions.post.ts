// 忘了干嘛的了

import axios from 'axios'
import { config } from '@/model/config'

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const obj = [
        {
            key: config().AZURE_OPENAI_KEY,
            url: config().AZURE_OPENAI_ENDPOINT
        },
        {
            key: config().AZURE_OPENAI_KEY2,
            url: config().AZURE_OPENAI_ENDPOINT2
        },
        {
            key: config().AZURE_OPENAI_KEY3,
            url: config().AZURE_OPENAI_ENDPOINT3
        }
    ]

    const randomValue = obj[Math.floor(Math.random() * obj.length)];

    let type = body.type
    let content = body.content

    let system = () => {
        if (type == 1) {
            return '根据给出的文章内容，写一篇软件介绍，内容包含软件说明、软件亮点、软件功能、软件特色、软件优势、软件点评各4点，字数在3000字左右'
        }
        if (type == 2) {
            return '根据给出的文章内容，写一篇游戏介绍，内容包含游戏介绍、游戏亮点、游戏特色、游戏优势、游戏点评各4点，字数在3000字左右'
        }
        return ''
    }

    const messages = [
        { "role": "system", "content": system() },
        { "role": "user", "content": content },
    ]

    console.log(messages);


    let data = await fetch(randomValue.url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "api-key": randomValue.key,
        },
        body: JSON.stringify({
            "messages": messages,
            "max_tokens": 4000,
            "temperature": 0.9,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "top_p": 0.95,
            "stop": null,
        })
    })

    let text = await data.text()
    let json = JSON.parse(text)

    return {
        body: body,
        data: json,
    }
})
