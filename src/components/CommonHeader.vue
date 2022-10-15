<template>
    <div class="header-container">
        <!-- header 左侧 -->
        <div class="l-content">
            <el-button @click="handleMenu" plain icon="el-icon-menu" size="mini" style="margin-right: 15px"></el-button>
            <!-- <h3 style="color: #fff">首页</h3> -->
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item v-for="item in tags" :key="item.path" :to="{ path: item.path }">{{ item.label }}</el-breadcrumb-item>
            </el-breadcrumb>


        </div>
        <!-- header 右侧 -->
        <div class="r-content">
            <el-dropdown tigger="click" size="mini" @command="handClick">
                <span>
                    <img class="user" :src="userImg" alt="">
                </span>

                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
    </div>
</template>


<script>
import { mapState } from 'vuex'
import { Logout } from "../../api/data"

export default {
    name:  "CommonHeader",
    data() {
        return {
            userImg: require('../assets/logo.png')
        }
    },
    methods: {
        handleMenu(){
        // tab.js 下的方法
            this.$store.commit('collapseMenu')
        },

        handClick(command) {
            if (command === 'logout') {
                // Cookie.remove('token')
                Logout().then(res => {
                    localStorage.removeItem('token')
                    this.$message.success('Logout success!')
                    this.$router.push({ name: 'login' })
                }) 
                // this.$router.push({name: 'login'})
            }

        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },

}
</script>


<style lang="less" scoped>
// header {
//     display: flex;
//     height: 100%;
//     justify-content: space-between;
//     align-items: center;
// }

// .l-content {
//     display: flex;
//     align-items: center;
//     .el-button {
//         margin-right: 20px;
//     }
// }

// .r-content {
//     .user {
//         width: 40px;
//         height: 40px;
//         border-radius: 50%;
//     }
// }


.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .text {
        color: #fff;
        font-size: 14px;
        margin-left: 10px;
    }

    .r-content {
        .user {
            width: 40px;
            height: 40px;
            border-radius: 50%;
        }
    }

    .l-content {
        display: flex;
        align-items: center;


        /deep/.el-breadcrumb__item {
            .el-breadcrumb__inner {
                font-weight: normal;
                color: #fff; // 下面不生效，直接写成全局


                .is-link {
                    .el-breadcrumb__inner{
                        color: #666;
                    }
                }

                &:last-child {
                    .el-breadcrumb__inner{
                        color: #fff;
                    }
                }
            }
        }
    }
}
</style>