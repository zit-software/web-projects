<template>
  <div class="container"></div>
</template>

<script>
import khachhangService from '@/services/khachhang.service'
import { ref } from 'vue'

export default {
  name: 'AdminDeleteCustomer',
  data() {
    const customer = ref(null)

    return { customer }
  },
  async beforeMount() {
    this.customer = await khachhangService.getById(this.$route.params.id)
  }
}
</script>
