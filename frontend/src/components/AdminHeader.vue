<template>
  <nav class="d-flex justify-content-end bg-info">
    <button class="btn text-white">ADMIN CP</button>
    <RouterLink to="/" class="btn btn-primary text-white">
      <i class="fa fa-globe"></i>
      Xem trang web
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
  border-bottom: 1px solid #fff;
  background: #fdfdfd;
}
</style>
