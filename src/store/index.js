import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/util/http'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export default new Vuex.Store({
  // 储存store里面的值在localStorage
  plugins: [createPersistedState({
    reducer: (state) => {
      return {
        cityId: state.cityId,
        cityName: state.cityName
      }
    }
  })],
  // 公共状态
  state: {
    cityId: '110100',
    cityName: '北京',
    cinemaList: [],
    isTabBarShow: true
  },
  getters: {
  },
  // 统一管理，被devtools实时监控
  // 只能和支持同步
  mutations: {
    changeCityName (state, cityName) {
      state.cityName = cityName
      console.log(cityName)
    },
    changeCityId (state, cityId) {
      state.cityId = cityId
      console.log(cityId)
    },
    changeCinemaData (state, cinemas) {
      state.cinemaList = cinemas
    },
    clearCinemaList (state) {
      state.cinemaList = []
    },
    show (state) {
      state.isTabBarShow = true
    },
    hide (state) {
      state.isTabBarShow = false
    }
  },
  // 支持异步和同步
  actions: {
    getCinemaData (store, cityId) {
      return http({
        url: `/gateway?cityId=${cityId}&ticketFlag=1&k=4206975`,
        headers: {
          'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.1","e":"16807719932665538308276225","bc":"110100"}',
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        store.commit('changeCinemaData', res.data.data.cinemas)
      })
    }
  },
  modules: {
  }
})
// vuex默认管理在内存，一刷新就没了
// vuex todo 进行持久化
