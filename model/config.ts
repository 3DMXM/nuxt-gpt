
export const config = () => {
    const config = useRuntimeConfig();
    // console.log(config);
    return {
        AZURE_OPENAI_KEY: config.public.AZURE_OPENAI_KEY,
        AZURE_OPENAI_ENDPOINT: config.public.AZURE_OPENAI_ENDPOINT,
        AZURE_OPENAI_KEY2: config.public.AZURE_OPENAI_KEY2,
        AZURE_OPENAI_ENDPOINT2: config.public.AZURE_OPENAI_ENDPOINT2,
    }
}