<script lang='ts' setup>
import axios from 'axios'
import { ElMessage } from 'element-plus';

const permissions = useCookie<boolean>('user2')

// console.log(permissions);

let user = ref('')
let password = ref('')


function login() {

    if (user.value == "" || password.value == "") {
        ElMessage.error("用户名或密码不能为空")
        return
    }

    axios.post("/api/permissions", {
        user: user.value,
        password: password.value
    }).then(({ data }) => {
        // console.log(data);
        if (data.code == "00") {
            ElMessage.success(data.msg)
            permissions.value = true
        } else {
            ElMessage.error(data.msg)
        }
    })
}

</script>
<template>
    <slot v-if="permissions"></slot>
    <div class="login" v-else>
        <h1 class="title">登录</h1>
        <div class="form">
            <v-text-field label="用户名" @keyup.enter="login" v-model="user" variant="solo-filled"></v-text-field>
            <v-text-field label="密码" @keyup.enter="login" v-model="password" variant="solo-filled"
                type="password"></v-text-field>
            <v-btn class="login-btn" variant="text" color="#00BCD4" @click="login">登录</v-btn>
        </div>
    </div>
</template>
<script lang='ts'>

export default {
    name: 'default',
}
</script>
<style lang='less'>
.login {
    display: flex;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .title {
        font-size: 1.6rem;
        margin-bottom: 30px;
    }

    .form {
        width: 400px;
        display: flex;
        flex-direction: column;

        .login-btn {

            display: block;
        }
    }
}
</style>