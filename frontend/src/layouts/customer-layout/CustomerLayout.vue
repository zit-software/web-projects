<template>
  <div>
    <AppHeader />

    <div class="bg-light">
      <RouterView />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import { RouterView } from 'vue-router'

export default {
  name: 'CustomerLayout',
  components: {
    AppHeader,
    RouterView
  }
}
</script>
