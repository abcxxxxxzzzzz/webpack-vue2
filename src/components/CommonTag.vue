<template>
    <div class="tabs">

        <el-tag
            v-for="(tag, index) in tags"
            :key="tag.name"
            :closable="tag.name !== 'home'"
            :effect="$route.name === tag.name ? 'dark' :'plain'"
            @click="changeMenu(tag)"
            @close="handleClose(tag, index)"
            size="smaill"
        >
            {{ tag.label }}
        </el-tag>

    </div>
</template>


<script>
import { mapState,mapMutations } from 'vuex'

export default {
    name: "CommonTag",
    data() {
        return {
        }
    },
    computed: {
        ...mapState({
            tags: state => state.tab.tabsList
        })
    },
    methods: {
        ...mapMutations({
            close: 'closeTag'
        }),
        // tag 点击切换
        changeMenu(item) {
            this.$router.push({name: item.name })
        },
        // tag 点击删除
        handleClose(tag, index) {
            const length = this.tags.length -1 
            this.close(tag)
            if (tag.name !== this.$router.name) {
                return;
            }
            if (index === length) {
                this.$router.push({
                    name: this.tags[index-1].name
                })
            } else {
                this.$router.push({
                    name: this.tags[index].name
                })
            }
        }
    }
}
</script>


<style lang="less" scoped>
.tabs {
    padding: 20px;
    .el-tag{
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>