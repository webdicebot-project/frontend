<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>

      <CHeaderNav>
        <CNavItem>
          <CNavLink class="text-dark">
            TRX:
            {{ priceTrx.usd }}
            (<span :class="getColor(priceTrx.change24h)">
              {{ priceTrx.change24h }}% </span
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

export default {
  components: {
    AppBreadcrumb,
  },
  computed: {
    priceTrx() {
      return this.$store.state.priceTrx
    },
  },
  methods: {
    getColor(change24h) {
      if (change24h > 0) return 'text-success'
      return 'text-danger'
    },
  },
}
</script>
