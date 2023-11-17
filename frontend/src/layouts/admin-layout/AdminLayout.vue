<template>
  <div class="wrapper">
    <AdminHeader />
    <div class="inner">
      <AdminSidebar />
      <div class="content">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script>
import AdminHeader from '@/components/AdminHeader.vue'
import AdminSidebar from '@/components/AdminSidebar.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'AdminLayout',
  components: { RouterView, AdminHeader, AdminSidebar }
}
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  overflow: hidden;
}

.inner {
  display: flex;
  flex: 1;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>
