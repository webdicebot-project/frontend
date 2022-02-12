import { createStore } from 'vuex'
import axios from 'axios'

export default createStore({
  state: {
    sidebarVisible: '',
    sidebarUnfoldable: false,
    priceTrx: {
      usd: 0,
      change24h: 0,
    },
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
  },
  actions: {
    async getPriceTrx(context) {
      try {
        // console.log(context)
        const { data } = await axios.get('/price')
        // console.log(data)
        context.commit('updatePrice', data)
      } catch (error) {
        console.error(error)
      }
    },
  },
  modules: {},
})
