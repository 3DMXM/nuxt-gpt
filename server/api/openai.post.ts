import { sendStream } from 'h3'

export default defineEventHandler(async (event) => {
    let content = "你好"
    let systemType = 0
    let system = [
        "我给你一段介绍,你根据这段介绍继续写一篇大概500字的文章."
    ]


    let messages = [
        { "role": "system", "content": system[systemType] },
        { "role": "user", "content": content }
    ]

    let req = await fetch(`https://gptify.openai.azure.com/openai/deployments/gpt-35/chat/completions?api-version=2023-03-15-preview`, {
        headers: {
            "Content-Type": "application/json",
            "api-key": "bd33b4bde504455cae7e0582a24c0527"
        },
        body: JSON.stringify({
            "messages": messages,
            "max_tokens": 1000,
            "temperature": 0.7,
            "frequency_penalty": 0,
            "presence_penalty": 0,
            "top_p": 0.95,
            "stop": null,
            stream: true
        })
    })

    return sendStream(event, req)
})
