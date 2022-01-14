<template>
  <div>Logging out...</div>
</template>

<script>
export default {
  created() {
    localStorage.removeItem('token')
    window.location.href = '/'
  },
}
</script>

<style></style>
