import { config } from '@/model/config'
import { GradioChatBot } from 'gradio-chatbot'
import { sendStream } from 'h3'


export default defineEventHandler(async (event) => {

    const { input, system } = await readBody(event)

    const bot = new GradioChatBot({
        url: 'https://gpt4.aoe.top/',
    });
    console.log('input', input);

    try {
        const message = await bot.chat(`${system} \n ${input}`, {
            onMessage(partialMsg) {
                console.log('stream output:', partialMsg);
            }
        }).catch((error) => {
            console.log('error', error);
        })

        console.log('message', message);

        return {
            code: '00',
            message
        }
    } catch (error) {
        return {
            code: '99',
            msg: `错误:${error}`
        }
    }


})