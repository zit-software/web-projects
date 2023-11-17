<script>
import { RouterView } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

export default {
  components: {
    RouterView,
    AppHeader
  }
}
</script>

<template>
  <AppHeader />

  <div class="bg-light">
    <RouterView />
  </div>

  <footer class="py-5 bg-dark">
    <div class="container">
      <p class="m-0 text-center text-white">
        Copyright &copy; Your Website {{ new Date().getFullYear() }}
      </p>
    </div>
  </footer>
</template>
