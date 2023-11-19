<template>
  <nav class="bg-dark">
    <RouterLink to="/" class="btn text-white">
      <i class="fa fa-home"></i>
      Trang chủ
    </RouterLink>
  </nav>
</template>

<script>
export default {
  name: 'AdminHeader'
}
</script>

<style scoped>
nav {
  padding: 5px 20px;
}
</style>
