<template>
  <div class="container container-fluid py-2">
    <h2 class="py-2">Danh sách khách hàng</h2>

    <div style="display: flex; justify-content: space-between; align-items: center">
      <ul class="pagination">
        <li
          class="page-item"
          :class="{
            disabled: isFirstPage
          }"
          @click="prevPage"
        >
          <a class="page-link" href="#" aria-label="Previous">
            <i class="fa fa-angle-left"></i>
          </a>
        </li>
        <li
          class="page-item"
          v-for="item in total"
          :class="{ active: page === item }"
          :key="item"
          @click="page = item"
        >
          <a class="page-link" href="#">{{ item }}</a>
        </li>
        <li
          class="page-item"
          :class="{
            disabled: isLastPage
          }"
          @click="nextPage"
        >
          <a class="page-link" href="#" aria-label="Next">
            <i class="fa fa-angle-right"></i>
          </a>
        </li>
      </ul>

      <select v-model="pageSize" class="form-select" style="width: 100px">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
      </select>
    </div>

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
              :to="`/admin/customers/${customer.id}/edit`"
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
    const pageSize = ref(50)
    const total = ref([])
    const page = ref(1)

    return {
      customers,
      pageSize,
      total,
      page
    }
  },
  beforeMount() {
    this.updateCustomerList()

    this.$watch('pageSize', this.updateCustomerList)
    this.$watch('page', this.updateCustomerList)
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format('HH:mm, DD/MM/YYYY')
    },
    async updateCustomerList() {
      try {
        const res = await khachHangService.getAll({ pageSize: this.pageSize, page: this.page })

        this.customers = res.data
        const totalPages = Math.floor(res.totalRows / this.pageSize + 0.9)
        this.total = Array.from({ length: totalPages }, (_, i) => i + 1)
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    nextPage() {
      if (this.page < this.total.length) {
        this.page++
      }
    },
    prevPage() {
      if (this.page > 1) {
        this.page--
      }
    }
  },
  computed: {
    isFirstPage() {
      return this.page === 1
    },
    isLastPage() {
      return this.page === this.total.length
    }
  }
}
</script>
