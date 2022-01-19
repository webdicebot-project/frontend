<template>
  <div class="p-4">Logging out...</div>
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
