import {
    EventStreamContentType,
    fetchEventSource,
} from "@fortaine/fetch-event-source";

export const useOpenAi = defineStore('OpenAi', {
    state: () => ({

    }),
    getters: {
    },
    actions: {
        async chatCompletions(messages: any, onFuns: any) {
            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-requested-with": "XMLHttpRequest",
                    "api-key": "OPENAI_API_KEY",
                },
                body: JSON.stringify({
                    "messages": messages,
                    "max_tokens": 2000,
                    "temperature": 0.7,
                    "frequency_penalty": 0,
                    "presence_penalty": 0,
                    "top_p": 0.95,
                    "stop": null,
                    "stream": true,
                }),
            }

            fetchEventSource("https://gptify.openai.azure.com/openai/deployments/gpt-35/chat/completions?api-version=2023-03-15-preview", {
                ...fetchOptions,
                ...onFuns,
            })
        }
    }
})