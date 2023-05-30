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

            // const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] ?? "gptify.openai.azure.com";
            // const azureApiKey = process.env["AZURE_OPENAI_KEY"] ?? "";

            // const endpoint = "https://gptify.openai.azure.com";
            // const azureApiKey = config().AZURE_OPENAI_KEY;

            // const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
            // const deploymentId = "gpt-35";
            // const options = {
            //     maxTokens: 4000,
            //     temperature: 0.7,
            //     frequencyPenalty: 0,
            //     presencePenalty: 0,
            //     topP: 0.95,
            //     stream: false,
            // }

            // client.getChatCompletions(deploymentId, messages, options).then(res => {
            //     console.log(res);
            // })

            // const result = await client.getChatCompletions(deploymentId, messages, {
            //     maxTokens: 4000,
            //     temperature: 0.7,
            //     frequencyPenalty: 0,
            //     presencePenalty: 0,
            //     topP: 0.95,
            //     stream: true,
            // });

            // for (const choice of result.choices) {
            //     console.log(choice.message);
            // }


            const fetchOptions = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "x-requested-with": "XMLHttpRequest",
                    "api-key": config().AZURE_OPENAI_KEY ?? "",
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
            }

            fetchEventSource("https://gptify.openai.azure.com/openai/deployments/gpt-35/chat/completions?api-version=2023-03-15-preview", {
                ...fetchOptions,
                ...onFuns,
            })
        }
    }
})