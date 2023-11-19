<template>
  <main>
    <div class="container mx-auto py-5">
      <div class="col col-12 mb-4">
        <h3>Thông tin giao hàng</h3>
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">Họ Tên</th>
              <th class="text-center">Số Điện Thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">{{ user.ten }}</td>
              <td class="text-center">{{ user.sdt }}</td>
            </tr>
          </tbody>
        </table>
        <i class="fa-solid fa-location-crosshairs"></i>
        <span class="fw-bold"> Giao đến: </span>
        <span> {{ user.diachi }}</span>
      </div>

      <hr class="divider" />

      <div class="col col-12">
        <h3>Sản phẩm</h3>
        <div class="items-container">
          <table class="table table-border">
            <thead>
              <tr>
                <th class="text-center" scope="col"></th>
                <th class="text-center" scope="col">Tên sản phẩm</th>
                <th class="text-center" scope="col">Giá</th>
                <th class="text-center" scope="col">Số Lượng</th>
                <th></th>
              </tr>
            </thead>
            <tbody v-if="hhMap && cart">
              <tr v-if="!cart || cart.length == 0">
                <td colspan="5" class="text-center">Bạn chưa thêm gì vào giỏ!</td>
              </tr>
              <tr v-for="(cartItem, index) in cart" :key="index" class="item">
                <th scope="row">
                  <div class="d-flex justify-content-center">
                    <div class="item-image">
                      <img
                        v-if="
                          hhMap.get(cartItem.id)?.images &&
                          hhMap.get(cartItem.id)?.images.length > 0
                        "
                        :src="getImage(hhMap.get(cartItem.id)?.images[0].path)"
                      />
                    </div>
                  </div>
                </th>
                <td>{{ hhMap.get(cartItem.id)?.ten }}</td>
                <td>{{ vndFormat(hhMap.get(cartItem.id)?.gia) }}</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <div class="item-quantity">
                      {{ cartItem.soluong }}
                    </div>
                  </div>
                </td>
                <td>
                  <button @click="() => removeFromCart(cartItem.id)" class="btn btn-danger ms-2">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row justify-content-end flex-row mb-5">
        <div class="button-container">
          <button @click="back" type="button" class="btn">
            <i class="fa-solid fa-angle-left"></i>
            Trở lại
          </button>
        </div>

        <div class="button-container">
          <button
            type="button"
            class="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#confirmOrder"
          >
            <i class="fa-solid fa-cart-shopping"></i>
            Đặt Hàng
          </button>
        </div>
      </div>
    </div>
  </main>

  <ConFirmModal :chitietsProp="cart" :hhMap="hhMap"></ConFirmModal>
</template>
<style>
footer#footer {
  position: fixed !important;
}
.list-container {
  border-left: 1px dashed grey;
  padding-left: 42px;
}
.item td {
  vertical-align: middle !important;
  text-align: center;
}
.item-image {
  width: 100px;
  height: 100px;
}
.item-image img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.button-container {
  width: fit-content;
}
</style>
<script>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import hanghoaService from '@/services/hanghoa.service'
import fileService from '@/services/file.service'
import vndFormat from '@/utils/vndFormat'
import { useUserStore } from '@/stores/user'
import ConFirmModal from './ConFirmModal.vue'
const cartStore = useCartStore()

export default {
  name: 'CardView',
  components: { ConFirmModal },
  methods: {
    getCart() {
      return cartStore.cart
    },
    async getProducts() {
      if (!this.cart || this.cart.length == 0) return
      const hanghoas = await hanghoaService.getMultipleProducts(this.cart.map((e) => e.id))

      for (const hanghoa of hanghoas) {
        this.hhMap.set(hanghoa.id, hanghoa)
      }
    },
    getImage(path) {
      if (!path) return
      return fileService.getFileUrl(path)
    },
    vndFormat,
    removeFromCart(id) {
      cartStore.removeFromCart(id)

      this.cart = this.cart.filter((item) => {
        return item.id !== id
      })
      this.$toast.info('Giỏ hàng còn lại: ' + cartStore.cart.length || 0, {
        position: 'top-right'
      })
    },
    back() {
      window.history.back()
    }
  },

  mounted() {
    this.getProducts()
  },
  watch: {
    cartStore() {
      console.log('Updated')
      this.getProducts()
    },
    cart() {
      console.log('Updated')
      this.getProducts()
    }
  },
  data: () => {
    const userStore = useUserStore()
    const cart = ref(cartStore.cart)
    const user = ref(userStore.user)
    const hhMap = ref(new Map())
    return {
      cart,
      user,
      hhMap
    }
  }
}
</script>
