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

        <span class="spinner-border" v-if="isLoading"></span>
        <div v-else class="table-container">
          <table class="table table-responsive">
            <thead style="position: sticky; top: 0; z-index: 100">
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
                    width="200"
                    height="200"
                    class="rounded"
                    style="object-fit: cover"
                    loading="lazy"
                  />
                  <div
                    v-else
                    class="border rounded d-flex"
                    style="
                      width: 200px;
                      height: 200px;
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
                  <RouterLink
                    :to="`/admin/products/${product.id}/delete`"
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

    return { products, isLoading, fileService }
  },
  methods: {
    async updateProductList() {
      try {
        this.isLoading = true

        const res = await hanghoaService.getAll()

        this.products = res.data
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
      }
    },
    vndFormat,
    dateFormat(date) {
      return dayjs(date).format('HH:mm, DD/MM/YYYY')
    }
  },
  beforeMount() {
    this.updateProductList()
  }
}
</script>

<style scoped>
.table-container {
  max-height: 70vh;
  overflow: auto;
}
</style>
