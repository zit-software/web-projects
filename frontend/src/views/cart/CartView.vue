<template>
  <div class="container mx-auto">
    <div class="row p-2 justify-content-between align-items-center mt-5">
      <div class="col col-4 info-container">
        <h1 class="text-center">Thông tin giao hàng</h1>
        <table class="table">
          <thead>
            <tr>
              <th class="text-center">Họ Tên</th>
              <th class="text-center">Số Điện Thoại</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="text-center">Trần Gia Huy</td>
              <td class="text-center">0939067106</td>
            </tr>
          </tbody>
        </table>
        <i class="fa-solid fa-location-crosshairs"></i>
        <span class="fw-bold"> Giao đến: </span>
        <span> B3-10 Đường số 3, KDC Long Thịnh</span>
      </div>
      <div class="col col-7 list-container">
        <h1 class="text-center">Giỏ hàng</h1>
        <div class="items-container">
          <table class="table">
            <thead>
              <tr>
                <th class="text-center" scope="col">Ảnh</th>
                <th class="text-center" scope="col">Hàng</th>
                <th class="text-center" scope="col">Giá</th>
                <th class="text-center" scope="col">Số Lượng</th>
              </tr>
            </thead>
            <tbody>
              <tr class="item">
                <th scope="row">
                  <div class="d-flex justify-content-center">
                    <div class="item-image">
                      <img
                        src="https://th.bing.com/th/id/OIP.z-KDsrVOyUkricPfhlBbGAHaI4?rs=1&pid=ImgDetMain"
                      />
                    </div>
                  </div>
                </th>
                <td>Áo Thun</td>
                <td>100.000 VND</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <div class="item-quantity">
                      <input type="number" class="form-control" id="item-quantity" value="1" />
                    </div>
                    <button class="btn btn-danger ms-2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
              <tr class="item">
                <th scope="row">
                  <div class="d-flex justify-content-center">
                    <div class="item-image">
                      <img
                        src="https://th.bing.com/th/id/OIP.z-KDsrVOyUkricPfhlBbGAHaI4?rs=1&pid=ImgDetMain"
                      />
                    </div>
                  </div>
                </th>
                <td>Áo Thun</td>
                <td>100.000 VND</td>
                <td>
                  <div class="d-flex justify-content-center">
                    <div class="item-quantity">
                      <input type="number" class="form-control" id="item-quantity" value="1" />
                    </div>
                    <button class="btn btn-danger ms-2">
                      <i class="fa-solid fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row justify-content-end flex-row">
      <div class="button-container">
        <button type="button" class="btn btn-dark">
          <i class="fa-solid fa-house"></i>
          Trở lại
        </button>
      </div>
      <div class="button-container">
        <button type="button" class="btn btn-primary">
          <i class="fa-solid fa-cart-shopping"></i>
          Đặt Hàng
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped>
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
import { useCartStore } from '@/stores/cart'
const cartStore = useCartStore()
export default {
  name: 'cart',
  methods: {
    getCart() {
      cartStore.cart
    }
  }
}
</script>
