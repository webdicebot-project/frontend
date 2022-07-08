<template>
  <div class="p-4">
    <h1>Page not found!</h1>
    Redirect to home page in {{ s }}s
  </div>
</template>

<script>
export default {
  data() {
    return {
      s: 5,
    }
  },
  created() {
    setInterval(() => {
      if (this.s == 0) {
        window.location.href = '/'
      } else this.s--
    }, 1e3)
  },
}
</script>

<style></style>
