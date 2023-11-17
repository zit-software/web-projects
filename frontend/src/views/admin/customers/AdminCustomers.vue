<template>
  <div class="container container-fluid py-2">
    <h2>Danh sách khách hàng</h2>

    <table class="table table-responsive">
      <thead class="table-light">
        <tr>
          <th>ID</th>
          <th>Họ tên</th>
          <th>Số điện thoại</th>
          <th>Địa chỉ</th>
          <th>Ngày tạo</th>
          <th>Cập nhật</th>
          <th></th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.id }}</td>
          <td>{{ customer.ten }}</td>
          <td>{{ customer.sdt }}</td>
          <td>{{ customer.diachi }}</td>
          <td>{{ formatDate(customer.createdAt) }}</td>
          <td>{{ formatDate(customer.updatedAt) }}</td>
          <td>
            <RouterLink
              :to="{
                path: `/admin/customers/${customer.id}/edit`,
                params: customer
              }"
              class="btn btn-secondary btn-sm"
            >
              <i class="fa fa-pencil"></i>
              Sửa
            </RouterLink>
          </td>
          <td>
            <RouterLink
              :to="`/admin/customers/${customer.id}/delete`"
              class="btn btn-danger btn-sm"
            >
              <i class="fa fa-trash"></i>
              Xóa
            </RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref } from 'vue'
import khachHangService from '@/services/khachhang.service'
import dayjs from 'dayjs'

export default {
  name: 'AdminCustomers',
  data() {
    const customers = ref([])

    return {
      customers
    }
  },
  async beforeMount() {
    const res = await khachHangService.getAll()

    this.customers = res.data
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('HH:mm, DD/MM/YYYY')
    }
  }
}
</script>
