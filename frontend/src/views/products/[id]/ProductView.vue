<template>
  <div class="container py-4">
    <span class="spinner-border" v-if="!product"></span>
    <div class="row" v-else>
      <div class="col col-12 col-md-6">
        <img
          v-if="product.images[imgIndex]"
          :src="fileService.getFileUrl(product.images[imgIndex].path)"
          :alt="product.images[imgIndex].ten"
          style="width: 100%; aspect-ratio: 1; object-fit: cover"
          class="rounded border"
        />

        <div class="d-flex gap-2 my-2">
          <img
            v-for="(image, index) in product.images"
            :key="image.id"
            :src="fileService.getFileUrl(image.path)"
            :alt="image.ten"
            style="width: 150px; aspect-ratio: 1; cursor: pointer"
            class="border rounded border-2"
            :class="{
              'border-primary': imgIndex === index
            }"
            @click="imgIndex = index"
          />
        </div>
      </div>

      <div class="col col-12 col-md-6">
        <h2>{{ product.ten }}</h2>

        <p>
          {{ product.mota }}
        </p>

        <div class="d-flex gap-1 mb-3">
          <button class="btn btn-success" disabled>
            <i class="fa-solid fa-dollar-sign"></i>
            {{ vndFormat(product.gia) }}
          </button>

          <button class="btn btn-secondary" disabled>Còn lại: {{ product.soluong }}</button>
        </div>

        <label class="form-label">Đặt hàng</label>
        <div class="d-flex gap-1">
          <input
            class="form-control"
            placeholder="Số lượng"
            type="number"
            v-model="quantity"
            min="1"
            :max="product.soluong"
          />
          <button class="btn btn-secondary">
            <i class="fa fa-cart-plus"> </i>
          </button>
          <button class="btn btn-primary">Mua</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileService from '@/services/file.service'
import hanghoaService from '@/services/hanghoa.service'
import vndFormat from '@/utils/vndFormat'
import { ref } from 'vue'

export default {
  name: 'ProductView',
  data() {
    const product = ref(null)
    const imgIndex = ref(0)
    const quantity = ref(1)

    return { product, fileService, imgIndex, quantity }
  },
  methods: {
    async getProductData() {
      try {
        const { id } = this.$route.params
        const res = await hanghoaService.getById(id)

        this.product = res
      } catch (error) {
        console.log(error)
      }
    },
    vndFormat
  },
  beforeMount() {
    this.getProductData()
  }
}
</script>
