<template>
  <router-view />
</template>

<script>
import { mapActions } from 'vuex'

export default {
  async created() {
    this.getPriceTrx()
    setInterval(this.getPriceTrx, 6e4)
  },
  methods: {
    ...mapActions(['getPriceTrx']),
  },
}
</script>

<style lang="scss">
// Import Main styles for this application
@import 'styles/style';
@import url('https://fonts.googleapis.com/css2?family=Fredoka:wght@300&display=swap');

#app {
  font-family: 'Fredoka', sans-serif;
}

a {
  text-decoration: none;
}

.copy {
  cursor: pointer;
}
</style>
