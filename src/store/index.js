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
    wallet: {
      address: '',
      balance: 0,
      bandwidth: {
        freeNetLimit: 0,
        freeNetUsed: 0,
      },
    },
    transactions: [],
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
    updateWallet(state, payload) {
      // console.log(payload)
      state.wallet = payload
    },
    updateTransactions(state, payload) {
      // console.log(payload)
      state.transactions = payload
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
    async getWallet(context) {
      try {
        const { data } = await axios.get('/user/wallet')
        // console.log(data)
        context.commit('updateWallet', data)
      } catch (error) {
        // console.error(error)
        this.notify(error.response.data.message)
        if (
          error.response.data.message == 'jwt expired' ||
          error.response.data.message == 'jwt malformed' ||
          error.response.data.message == 'invalid signature'
        ) {
          this.notify('Session expired')
          this.logout()
        }
      }
    },
    async getTransactions(context) {
      try {
        const { data } = await axios.get('/user/wallet/transaction')
        // console.log(data)
        context.commit('updateTransactions', data)
      } catch (error) {
        // console.error(error)
        this.notify(error.response.data.message)
        if (
          error.response.data.message == 'jwt expired' ||
          error.response.data.message == 'jwt malformed' ||
          error.response.data.message == 'invalid signature'
        ) {
          this.notify('Session expired')
          this.logout()
        }
      }
    },
  },
  modules: {},
})
