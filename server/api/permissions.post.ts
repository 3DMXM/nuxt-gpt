import { config } from '@/model/config'


export default defineEventHandler(async (event) => {
    const { user, password } = await readBody(event)

    if (user == config().LOGIN_USERNAME && password == config().LOGIN_PASSWORD) {
        return {
            "code": "00",
            "msg": "登录成功",
        }
    } else {
        return {
            "code": "99",
            "msg": "账号或密码错误",
            'USERNAME': config().LOGIN_USERNAME ?? "123",
        }
    }
})