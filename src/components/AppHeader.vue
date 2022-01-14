<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>

      <CHeaderNav>
        <CNavItem>
          <CNavLink class="text-dark">
            TRX: {{ Number(trx.usd).toFixed(4) }} (<span
              :class="getColor(trx.change24hr)"
            >
              {{ Number(trx.change24hr).toFixed(2) }}% </span
            >)
          </CNavLink>
        </CNavItem>
      </CHeaderNav>
    </CContainer>

    <CHeaderDivider />

    <CContainer fluid>
      <AppBreadcrumb />
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import axios from 'axios'

export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
  },
  data() {
    return {
      trx: {
        usd: 0,
        change24hr: 0,
      },
    }
  },
  created() {
    this.getPriceTrx()
    setInterval(this.getPriceTrx, 3e4)
  },
  methods: {
    async getPriceTrx() {
      try {
        const { data } = await axios.get('/price')
        // console.log(data)
        this.trx = data.trx
      } catch (error) {
        // console.log(error)
      }
    },
    getColor(change24hr) {
      if (change24hr > 0) return 'text-success'
      return 'text-danger'
    },
  },
}
</script>
