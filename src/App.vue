<template>
  <router-view />
</template>

<script>
export default {
  created() {
    this.getPriceTrx()
    setInterval(this.getPriceTrx, 6e4)
    this.getWallet()
    setInterval(this.getWallet, 6e4)
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
