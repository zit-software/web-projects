<template>
  <div class="container container-fluid">
    <div class="card my-4">
      <h2 class="card-header">Hàng hóa</h2>

      <div class="card-body">
        <div class="card-title">
          <RouterLink to="/admin/products/create" class="btn btn-primary">
            <i class="fa fa-add"></i> Thêm
          </RouterLink>
        </div>

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

          <select v-model="pageSize" class="form-select" style="width: 150px">
            <option value="10">10</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <span class="spinner-border" v-if="isLoading"></span>
        <div v-else class="table-container">
          <table class="table table-responsive">
            <thead class="table-light" style="position: sticky; top: 0; z-index: 100">
              <tr>
                <th>Id</th>
                <th></th>
                <th>Tên mặt hàng</th>
                <th>Mô tả</th>
                <th>Giá</th>
                <th>Còn lại</th>
                <th>Ngày tạo</th>
                <th>Cập nhật</th>
                <th></th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>
                  <img
                    v-if="product.images[0]"
                    :src="fileService.getFileUrl(product.images[0].path)"
                    :alt="product.ten"
                    width="100"
                    height="100"
                    class="rounded"
                    style="object-fit: cover"
                    loading="lazy"
                  />
                  <div
                    v-else
                    class="border rounded d-flex"
                    style="
                      width: 100px;
                      height: 100px;
                      justify-content: center;
                      align-items: center;
                    "
                  >
                    <i class="fa fa-image fa-5x text-secondary"></i>
                  </div>
                </td>
                <td>{{ product.ten }}</td>
                <td>{{ product.mota }}</td>
                <td>{{ vndFormat(product.gia) }}</td>
                <td>
                  <span class="btn btn-success btn-sm">
                    {{ product.soluong }}
                  </span>
                </td>
                <td>{{ dateFormat(product.createdAt) }}</td>
                <td>{{ dateFormat(product.updatedAt) }}</td>
                <td>
                  <RouterLink
                    :to="`/admin/products/${product.id}/edit`"
                    class="btn btn-secondary btn-sm"
                  >
                    <i class="fa fa-pencil"></i>
                    Sửa
                  </RouterLink>
                </td>
                <td>
                  <button
                    type="button"
                    class="btn btn-danger btn-sm"
                    @click="deleteProductPayload = product"
                  >
                    <i class="fa fa-trash"></i>
                    Xóa
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import fileService from '@/services/file.service'
import hanghoaService from '@/services/hanghoa.service'
import vndFormat from '@/utils/vndFormat'
import dayjs from 'dayjs'
import { ref } from 'vue'

export default {
  name: 'AdminProducts',
  data() {
    const products = ref([])
    const isLoading = ref(false)
    const pageSize = ref(50)
    const total = ref([])
    const page = ref(1)
    const deleteProductPayload = ref(null)

    return { products, isLoading, fileService, pageSize, total, page, deleteProductPayload }
  },
  methods: {
    async updateProductList() {
      try {
        this.isLoading = true

        const res = await hanghoaService.getAll({ page: this.page, pageSize: this.pageSize })

        this.products = res.data
        const totalPages = Math.ceil(res.totalRows / this.pageSize)
        this.total = Array.from({ length: totalPages }, (_, i) => i + 1)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
      }
    },
    async deleteProduct() {
      try {
        await hanghoaService.deleteById(this.deleteProductPayload.id)
        this.$toast.info(`Đã xóa hàng hóa ${this.deleteProductPayload.ten}`)
        this.products = this.products.filter(
          (product) => product.id !== this.deleteProductPayload.id
        )
        this.deleteProductPayload = null
      } catch (error) {
        this.$toast.error(error.message)
      }
    },
    vndFormat,
    dateFormat(date) {
      return dayjs(date).format('HH:mm, DD/MM/YYYY')
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
  beforeMount() {
    this.updateProductList()
  },
  watch: {
    pageSize() {
      this.updateProductList()
    },
    page() {
      this.updateProductList()
    },
    deleteProductPayload() {
      if (!this.deleteProductPayload) return

      const cf = window.confirm(`Bạn muốn xóa sản phẩm ${this.deleteProductPayload.ten}?`)
      if (cf) {
        this.deleteProduct()
      }
    }
  }
}
</script>

<style scoped>
.table-container {
  max-height: 70vh;
  overflow: auto;
}
</style>
