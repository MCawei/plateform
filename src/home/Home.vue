<template>
  <div class="home">
    <el-container>
      <el-aside :class="{showHide: isCollapse}">
        <div class="logo">
          <span v-if="isCollapse" class="iconfont icon-dianxin1"></span>
          <span v-if="!isCollapse" class="iconfont icon-dianxin"></span>
        </div>
        <el-menu class="el-menu-vertical-demo" text-color="#fff" active-text-color="#ffd04b"
                 :collapse="isCollapse"
                 :default-active="activeIndex">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <!-- 有子菜单 -->
            <el-submenu :index="index+''" v-if="!item.singleMenu">
              <template slot="title"><i class="iconfont" :class="item.iconCls"></i><span slot="title">{{item.name}}</span></template>
              <el-menu-item v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden"
                            @click="()=>$router.push(child.path)">{{child.name}}</el-menu-item>
            </el-submenu>
            <!-- 主菜单 -->
            <el-menu-item v-if="item.singleMenu&&item.children.length>0" :index="item.children[0].path" @click="()=>$router.push(item.children[0].path)">
              <i class="iconfont" :class="item.iconCls"></i><span slot="title">{{item.children[0].name}}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <el-row>
            <el-col :span="2" class="menu"><i class="iconfont icon-caidan" @click="collapse"></i></el-col>
            <el-col :span="3" :offset="18">
              <el-dropdown class="user-info">
              <span class="el-dropdown-link">
                个人中心 <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item>帮助中心</el-dropdown-item>
                  <el-dropdown-item>修改密码</el-dropdown-item>
                  <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </el-col>
            <!--<el-col :span="1"><span class="menu"><i class="iconfont icon-xitongshezhi"></i></span></el-col>-->
          </el-row>
        </el-header>
        <el-main>
          <div class="routes">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          <div class="main">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </div>
        </el-main>
        <!-- <el-footer>Footer</el-footer> -->
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        isCollapse: false,
        sysUserAvatar: '',
        activeIndex: '/index',
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
          menuList: []
        }
      }
    },
    computed: {},
    created: function () {
      // console.log(this.$router.options.routes)
    },
    methods: {
      //退出登录
      logout() {
        let _this = this;
        this.$confirm('确认退出吗?', '提示', {
          type: 'warning'
        }).then(() => {
          sessionStorage.removeItem('login');
          _this.$router.push('/login');
        }).catch(() => {

        });
      },
      //折叠导航栏
      collapse: function () {
        this.isCollapse = !this.isCollapse;
      }
    },
    mounted() {
      var user = sessionStorage.getItem('user');
      if (user) {
        user = JSON.parse(user);
        this.sysUserName = user.name || '';
        this.sysUserAvatar = user.avatar || '';
      }
    }
  }

</script>

<style scoped lang="scss">

</style>
