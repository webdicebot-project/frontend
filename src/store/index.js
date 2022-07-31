import { createStore } from 'vuex'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    priceTrx: {
      usd: 0,
      change24h: 0,
    },
    permission: 0,
  },
  mutations: {
    toggleSidebar(state) {
      state.sidebarVisible = !state.sidebarVisible
    },
    toggleUnfoldable(state) {
      state.sidebarUnfoldable = !state.sidebarUnfoldable
    },
    updateSidebarVisible(state, payload) {
      state.sidebarVisible = payload.value
    },
    updatePrice(state, payload) {
      // console.log(payload)
      state.priceTrx = payload
    },
    updatePermission(state, payload) {
      // console.log(payload)
      state.permission = payload
    },
  },
  actions: {
    async getPriceTrx(context) {
      try {
        const { data } = await axios.get('/price')
        // console.log(data)
        context.commit('updatePrice', data)
      } catch (error) {
        // console.error(error)
      }
    },
    async getPermission(context) {
      try {
        let permission = 0
        if (localStorage.getItem('token')) {
          const { data } = await axios.get('/user/profile')
          permission = data.permission
        }
        // console.log(permission)
        context.commit('updatePermission', permission)
      } catch (error) {
        // console.error(error)
      }
    },
  },
  modules: {},
})
