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
        }
    }
})