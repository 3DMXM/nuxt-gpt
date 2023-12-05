import { config } from "@/model/config"

// import { OpenAIClient, AzureKeyCredential } from '@azure/openai'
import { fetchEventSource } from "@fortaine/fetch-event-source"

export const useOpenAi = defineStore('OpenAi', {
    state: () => ({

    }),
    getters: {
    },
    actions: {
        async chatCompletions(messages: any, onFuns: any) {
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


            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-requested-with": "XMLHttpRequest",
                    "api-key": randomValue.key,
                },
                body: JSON.stringify({
                    "messages": messages,
                    "max_tokens": 4000,
                    "temperature": 0.7,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "top_p": 0.95,
                    "stop": null,
                    "stream": true,
                }),
                openWhenHidden: true,
            }


            fetchEventSource(randomValue.url, {
                ...fetchOptions,
                ...onFuns,
            })
        },
        async chatGPT4(messages: any, onFuns: any) {
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-requested-with": "XMLHttpRequest",
                    "api-key": config().AZURE_OPENAI_KEY2,
                },
                body: JSON.stringify({
                    "messages": messages,
                    "max_tokens": 4000,
                    // 随机 0.6 - 1.0                    
                    "temperature": 0.7,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "top_p": 0.95,
                    "stop": null,
                    "stream": true,
                }),
                openWhenHidden: true,
            }


            fetchEventSource(config().AZURE_OPENAI_GPT4_ENDPOINT, {
                ...fetchOptions,
                ...onFuns,
            })
        }
    }
})