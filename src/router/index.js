import Vue from 'vue'
import VueRouter from 'vue-router'
import Films from '@/views/Films-'
import Cinemas from '@/views/Cinemas-'
import Center from '@/views/Center-'
import NowPlaying from '@/views/films/Now-playing'
import ComingSoon from '@/views/films/Coming-soon'
import Search from '@/views/Search-'
import Detail from '@/views/Detail-'
// import Order from '@/views/Order-'
import Login from '@/views/Login-'
import City from '@/views/City-'

Vue.use(VueRouter)

const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: NowPlaying
      },
      {
        path: '/films/comingsoon',
        component: ComingSoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'details',
    path: '/detail/:myId',
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/center',
    component: Center,
    meta: {
      isRequired: true
    }
  },
  {
    path: '/order',
    component: () => import('@/views/Order-'), // 懒加载，解决第一次加载过慢
    meta: {
      isRequired: true
    }
  },
  {
    path: '*',
    redirect: '/films/nowplaying'
  }
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

// 全局拦截
router.beforeEach((to, from, next) => {
  if (to.meta.isRequired) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/login',
        // 记录从哪里来
        query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
