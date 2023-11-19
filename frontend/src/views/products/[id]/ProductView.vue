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
          <button @click="addToCart" class="btn btn-secondary">
            <i class="fa fa-cart-plus"> </i>
          </button>
          <RouterLink to="/cart">
            <button class="btn btn-primary">
              <a>Mua</a>
            </button>
          </RouterLink>
        </div>
        <div v-if="cartItem">
          Đã có <span style="font-weight: bold">{{ cartItem.soluong }}</span> sản phẩm này trong giỏ
          hàng
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileService from '@/services/file.service'
import hanghoaService from '@/services/hanghoa.service'
import { useCartStore } from '@/stores/cart'
import vndFormat from '@/utils/vndFormat'
import { ref } from 'vue'

const cartStore = useCartStore()

export default {
  name: 'ProductView',
  data() {
    const product = ref(null)
    const imgIndex = ref(0)
    const quantity = ref(1)
    const cartItem = ref(null)
    return { product, fileService, imgIndex, quantity, cartItem }
  },
  watch: {
    product(value) {
      if (!value) return
      this.cartItem = cartStore.getItemById(value.id)
    },
    cartStore() {
      if (!this.product) return
      this.cartItem = cartStore.getItemById(this.product.id)
    }
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
    addToCart() {
      cartStore.addToCart({
        id: this.product.id,
        soluong: this.quantity
      })
      this.cartItem = cartStore.getItemById(this.product.id)
      this.$toast.success('Thêm vào giỏ hàng thành công!', { position: 'top-right' })
    },
    vndFormat
  },
  beforeMount() {
    this.getProductData()
  }
}
</script>
