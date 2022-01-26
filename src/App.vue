<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async created() {
    this.getPriceTrx()
    setInterval(this.getPriceTrx, 6e4)

    if (localStorage.getItem('token')) {
      await this.getWallet()
      await this.getTransactions()
      setInterval(this.getWallet, 6e4)
      setInterval(this.getTransactions, 6e4)
    }
  },
  methods: {
    ...mapActions(['getPriceTrx', 'getWallet', 'getTransactions']),
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';

a {
  text-decoration: none;
}

.copy {
  cursor: pointer;
}
</style>
