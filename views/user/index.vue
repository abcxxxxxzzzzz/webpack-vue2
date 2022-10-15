<template>
        <el-card class="box-card" shadow="hover" style="width: 100%">

            <!-- 模态框 -->
        <el-dialog title="修改账户密码" :visible.sync="dialogVisible" width="30%" :before-close="handleClose" center>
            <el-form :model="form" ref="form" label-width="80px" class="demo-dynamic">
                <el-form-item prop="username" label="用户名:" :rules="[
                    { required: true, message: '请输入自定义的用户', trigger: 'blur' },
                ]">
                    <el-input v-model="form.username" placeholder="请输入自定义的用户，下次登录使用新的用户名"></el-input>
                </el-form-item>

                <el-form-item prop="password" label="密码:" :rules="[
                    { required: true, message: '请输入自定义的密码', trigger: 'blur' },
                ]">
                    <el-input type="password" v-model="form.password" placeholder="请输入自定义的密码，下次登录使用新的密码"></el-input>
                </el-form-item>

                </span>
            </el-form>

            <!-- 模态框底部 -->
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </span>
        </el-dialog>

            <!-- 表格 -->
            <el-table :data="userData" style="width: 100%" max-height="630" border :header-cell-style="{background:'#fff'}">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="username" label="用户"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column prop="updated_at" label="更新时间"></el-table-column>

                <el-table-column label="操作" width="180" fixed="right">
                    <template slot-scope="scope">

                        <el-tooltip class="item" effect="dark" content="修改账户密码" placement="top-start">
                            <el-button size="mini" type="success" @click="updateUser(scope.$index, scope.row)" icon="el-icon-edit-outline" circle>
                            </el-button>
                        </el-tooltip>

                    </template>
                </el-table-column>
            </el-table>
        </el-card>
</template>


<script>
import { UsersList, UsersUpdate, UsersDelele } from "../../api/user"

export default {
    name: 'user',
    data () {
        return {
            dialogVisible: false,
            userData: [],
            form: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        // 获取用户
        getUsersList() {
            UsersList().then((res) => {
                if (res.data.code === 200) {
                    this.userData = res.data.data.data
                }
            })
        },
        // 更新用户
        updateUser(index, row) {
            this.dialogVisible = true
            this.form = JSON.parse(JSON.stringify(row))
        },
        // 删除用户
        delUser() {
            
        },
        handleClose(done) {
            this.dialogVisible = false
            this.$refs.form.resetFields();
        },
        cancel() {
            this.handleClose()
        },
        submit() {
            this.$refs.form.validate((valid) => {
                if (valid) { 
                    delete this.form.created_at
                    delete this.form.updated_at
                    UsersUpdate(this.form.id, this.form).then((res) => {
                        if (res.data.code === 200) {
                            this.$message.success('Update user success!')
                            this.handleClose()
                            this.getUsersList()
                        } else {
                            this.$message.error(res.data.msg)
                            this.handleClose()
                        }

                    })
                }
            })
            
        }
    },
    created() {
        this.getUsersList()
    }
}
</script>