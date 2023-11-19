<template>
  <main>
    <div v-if="data" class="container">
      <div class="mt-5">
        <h1>
          Đơn hàng #<span style="font-weight: bold">{{ data.id }}</span>
        </h1>
      </div>
      <div class="row">
        <div class="col-5">
          <h4>Thông tin đơn hàng</h4>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Ngày đặt hàng</th>
                <th>Ngày giao hàng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ formatTime(data.ngayDH) }}</td>
                <td>{{ data.ngayGH ? formatTime(data.ngayGH) : 'Chưa có' }}</td>
                <td>{{ vndFormat(tongtien) }}</td>
                <td>{{ formatStatus }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row gap-2 my-5 justify-content-between">
        <div class="col col-5">
          <h4>Thông tin khách hàng</h4>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{{ data.kh.ten }}</td>
                <td>{{ data.kh.sdt }}</td>
                <td>{{ data.kh.diachi }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col col-5">
          <h4>Thông tin nhân viên</h4>
          <table class="table table-responsive">
            <thead>
              <tr>
                <th>Tên</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Cập nhật cuối</th>
              </tr>
            </thead>
            <tbody v-if="data.nv">
              <tr>
                <td>{{ data.nv.ten }}</td>
                <td>{{ data.nv.sdt }}</td>
                <td>{{ data.nv.diachi }}</td>
                <td>{{ formatTime(data.updatedAt) }}</td>
              </tr>
            </tbody>
            <tr v-if="!data.nv">
              <td class="text-center" colspan="4">
                <i class="fa-solid fa-clipboard-user"></i>
                Đơn hàng chưa được xử lý!
              </td>
            </tr>
          </table>
        </div>
      </div>
      <div class="row mt-5">
        <h2>Chi Tiết Đơn Hàng</h2>
        <div class="col col-12 list-container">
          <div class="items-container">
            <table class="table">
              <thead>
                <tr>
                  <th class="text-center" scope="col">Ảnh</th>
                  <th class="text-center" scope="col">Hàng</th>
                  <th class="text-center" scope="col">Giá</th>
                  <th class="text-center" scope="col">Số Lượng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="chitiet of data.chitiets" class="item">
                  <th scope="row">
                    <div class="d-flex justify-content-center">
                      <div class="item-image">
                        <img
                          class="detail-image"
                          v-if="chitiet.hanghoa.images && chitiet.hanghoa.images.length > 0"
                          :src="getImage(chitiet.hanghoa.images[0].path)"
                        />
                      </div>
                    </div>
                  </th>
                  <td>{{ chitiet.hanghoa.ten }}</td>
                  <td>{{ vndFormat(chitiet.hanghoa.gia) }}</td>
                  <td>
                    <div class="d-flex justify-content-center">
                      <div class="item-quantity">
                        {{ chitiet.soluong }}
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
      </div>
    </div>
  </main>
</template>
<style>
.detail-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border-radius: 12px;
}
.items-container td {
  text-align: center;
  vertical-align: middle;
}
</style>
<script>
import dathangService from '@/services/dathang.service'
import fileService from '@/services/file.service'
import dayjs from 'dayjs'
import vndFormat from '@/utils/vndFormat'
import { ref } from 'vue'

export default {
  methods: {
    async getDetail() {
      const id = this.$route.params.id
      const { data, tongtien } = await dathangService.getDetail(id)
      this.data = data
      this.tongtien = tongtien
    },
    formatTime(date) {
      return dayjs(date).format('DD/MM/YYYY-HH:mm')
    },
    getImage(path) {
      return fileService.getFileUrl(path)
    },
    vndFormat
  },
  data() {
    const data = ref(null)
    const tongtien = ref(0)
    return { data, tongtien }
  },
  mounted() {
    this.getDetail()
  },
  computed: {
    formatStatus() {
      if (!this.data) return ''
      if (this.data.trangThaiDH == 'received') {
        return 'Chưa xử lý'
      } else if (this.data.trangThaiDH == 'delivering') {
        return 'Đang xử lý'
      } else if (this.data.trangThaiDH == 'completed') {
        return 'Đã hoàn thành'
      }
      return 'Đã hủy'
    }
  }
}
</script>
