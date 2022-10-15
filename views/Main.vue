<template>
    <!-- <div>我是Home页面</div> -->
    <el-container style="height: 100%">
        <el-aside width="auto">
            <Common-aside></common-aside> 
        </el-aside>
        <el-container>
            <el-header>
                <common-header />
            </el-header>
            <common-tag />
            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>

</template>


<script>
import CommonAside from '../src/components/CommonAside'
import CommonHeader from '../src/components/CommonHeader'
import CommonTag from '../src/components/CommonTag'

export default {
    name: 'Home',
    components: {
        CommonAside,
        CommonHeader,
        CommonTag
    },
    data () {
        return {}
    }
}
</script>


<style lang="less" scoped>
.el-header {
    background-color: #333;
    height: 50px !important;
}

.el-main {
    padding-top: 0;
}
</style>

