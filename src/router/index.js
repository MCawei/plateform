import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/equipment/HelloWorld'

import PlateLogin from '@/home/Login'
import PlateError from '@/home/Error'
import Home from '@/home/Home'

// 组件
import PlateIndex from '@/components/index/plateHome'
import Table from '@/components/muban/Table'
import Swiper01 from '@/components/muban/swiper'

Vue.use(Router)

 const vueRouter = new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      hidden: true,
      component: PlateLogin,
    },
    {
      path: '/home',
      name: '主页',
      redirect: 'index',
      component: Home,
      singleMenu: true, //只有一个节点
      iconCls: 'icon-home',
      children: [
        {
          path: '/index',
          name: '主页',
          meta: {title: '主页'},
          component: PlateIndex,
        }
      ]
    },
    {
      path: '/home',
      name: '设备管理',
      iconCls: 'icon-xitongshezhi',
      component: Home,
      children: [
        {
          path: '/router1',
          name: 'home',
          component: HelloWorld,
          meta: {title: '路由'}
        }
      ]
    },
    {
      path: '/home',
      name: '模板组件',
      iconCls: 'icon-chaxun',
      component: Home,
      children: [
        {
          path: '/table',
          name: 'table',
          component: Table,
          meta: {title: 'Table'}
        },
        {
          path: '/swiper',
          name: 'swiper',
          component: Swiper01,
          meta: {title: 'Swiper01'}
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      hidden: true,
      component: PlateLogin,
      meta: {title: 'Login'}
    },
    {
      path: '*',
      name: 'error',
      hidden: true,
      component: PlateError,
      meta: {title: '404'}
    }
  ]
});

// 全局路由守卫
vueRouter.beforeEach((to, from, next) => {
  // 页面标题
  if (!to.name) {
    document.title = "美丽家园平台"
  } else {
    document.title = to.meta.title
  }

  let isLogin = sessionStorage.getItem('isLogin');
  if (to.name === 'Login') { // 登录页时，清除登录状态
    sessionStorage.removeItem('isLogin')
  }

  if (!isLogin && to.path != '/login') { //未登录状态
    next({
      path: '/login'
    })
  } else {
    next();
  }
});

export default vueRouter;
