<template>
    

  <el-menu @click="clickMenu(item)" default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <!-- <el-menu-item index="2">
      <i class="el-icon-menu"></i>
      <span slot="title">导航二</span>
    </el-menu-item>
    
    <el-submenu index="1">
      <template slot="title">
        <i class="el-icon-location"></i>
        <span slot="title">导航一</span>
      </template>
      <el-menu-item-group>
        <span slot="title">分组一</span>
        <el-menu-item index="1-1">选项1</el-menu-item>
      </el-menu-item-group>
    </el-submenu> -->

        <!-- 后台标题 -->
    <h3>{{ isCollapse ? "后台" : "管理后台"}}</h3>

    <!-- 没有子菜单的渲染 -->
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path + ''" :key="item.path">
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    
    <!-- 有子菜单的渲染 -->
    <el-submenu v-for="item in hasChildren" :index="item.path + ''" :key="item.path">
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
      </template>
      <el-menu-item-group v-for="(subItem, subIndex) in item.children" :key="subItem.path">
        <el-menu-item @click="clickMenu(subItem)" :index="subIndex +''">{{ subItem.label }}</el-menu-item>
      </el-menu-item-group>
    </el-submenu>
    
  </el-menu>



</template>


<style>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>

<script>
  export default {
    data() {
      return {
        // isCollapse: false,
        menu: [
    {
        path: '/',
        name: 'home',
        label: '首页',
        icon: 's-home',
        url: 'Home/Home'
    },
    {
        path: '/shop',
      name: 'shop',
        label: '域名管理',
        icon: 'video-play',
      url: 'ShopManage/ShopManage'
    },
    {
        path: '/user',
        name: 'user',
        label: '用户管理',
        icon: 'user',
        url: 'UserManage/UserManage' 
    },
    // {
    //     label: '其他',
    //     icon: 'location',
    //     children: [
    //         {
    //             path: '/page1',
    //             name: 'page1',
    //             label: '页面1',
    //             icon: 'setting',
    //             url: 'Other/PageOne'
    //         },
    //         {
    //             path: '/page2',
    //             name: 'page2',
    //             label: '页面2',
    //             icon: 'setting',
    //             url: 'Other/PageTwo'
    //         },
    //     ]
    // },
]
      };
    },
    methods: {
      clickMenu(item) {
        // 通过全局路由 push 方法
        if (this.$route.path !== item.path && !(this.$route.path === '/home' && (item.path === '/'))) {
          this.$router.push({ name: item.name })
        }
        this.$store.commit('selectMenu', item)
        
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    },
    // 使用计算组件过滤
    computed: {
        // 没有子菜单过滤
        noChildren() {
            return this.menu.filter(item => !item.children)
        },
        // 有子菜单过滤
        hasChildren() {
            return this.menu.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        }
    },
  }
</script>


<style lang="less" scope>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 150px;
    min-height: 400px;
  }

  .el-menu {
    height: 100%;
    border: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style>