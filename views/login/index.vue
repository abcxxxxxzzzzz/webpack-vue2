<template>
    <el-form
        :model="form"
        states-icon
        :rules="rules"
        ref="form"
        label-width="100px"
        class="login-container"
        @submit.native.prevent
    >
        <h3 class="login-title">系统登录</h3>
        <el-form-item label="用户名" label-width="80px" prop="username" class="username">
            <el-input type="input" v-model="form.username" aria-autocomplete="off" aria-placeholder="请输入账号" ></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="80px" prop="password" class="password">
            <el-input type="password" v-model="form.password" aria-autocomplete="off" aria-placeholder="请输入密码"  @keyup.enter.native="login"></el-input>
        </el-form-item>

        <el-form-item class="login_submit">
            <el-button type="primary" @click="login" class="login_submit">登录</el-button>
        </el-form-item>

    </el-form>
</template>


<script>
// import Cookie from "js-cookie"
import { Login } from "../../api/data"

export default {
    name: "login",
    data() {
        return {
            form: {
            },
            rules: {
                username: [
                    { required: true, message: "请输入用户名", trigger: "blur"},
                    { min: 1, message: "用户名不能小于1位", trigger: "blur"}
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: "blur"},
                    { min: 1, message: "用户名不能小于1位", trigger: "blur"}
                ]
            }
        }
    },
    methods: {
        login(){
            // const token = "aa"
            // Cookie.set('token', token)
            // this.$router.push('/home')
            this.$refs.form.validate((valid) => {
                if (valid) {
                    Login(this.form).then(({ data }) => {
                        console.log(data)
                        if (data.code === 307) { 
                            this.handleOpenCode()
                        }
                        // console.log(data)
                        if (data.code === 200) {
                            // Cookie.set('token', data.data.token)
                            // 保存在本地
                            localStorage.setItem('token', data.data.token)
                            this.$message.success('Login success!')
                            this.$router.push('/home')
                        } else if (data.code === 302) { 
                            this.open()
                        } else {
                            this.$message.error(data.msg)
                        }
                    })
                }
            })
        },

        // 弹框 口令
        handleOpenCode() {
            this.$prompt('请输入口令', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{6}$/,
                inputErrorMessage: 'Code Error!'
            }).then(({ value }) => {
                // 如果开启谷歌验证码,重新再发送
                this.form.code = value
                Login(this.form).then(({ data }) => {
                    if (data.code === 200) {
                        localStorage.setItem('token', data.data.token)
                        this.$message.success('Login success!')
                        this.$router.push('/home')
                    } else {
                        this.$message.error(data.msg)
                    }
                })
                // this.$message.success('You code: ' + value);
            }).catch(() => {
                this.$message.info('Cancel login!');
            });
        }
    }
}
</script>


<style lang="less" scoped>
.login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 35px 18px;
    background-color: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cacaca;
    box-sizing: border-box;

    .el-input {
        width: 198px;
    }
    
    .login-title {
            margin: 0px auto 40px auto;
            text-align: center;
            color: #505458;
        }
    
    .login_submit {
        margin: 10px;
    }
}


</style>