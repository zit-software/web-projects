<template>
  <main>
    <!-- Header-->
    <header class="">
      <div class="banner py-5 container-fluid d-flex align-items-center justify-content-center">
        <div class="text-center text-white">
          <h1 style="font-size: 72px" class="display-4 fw-bolder text-black">Đồ Chơi Cho Bé</h1>
          <p style="font-size: 50px" class="lead fw-normal mb-0 text-black">
            Niềm Vui Cho Tương Lai Nhỏ!
          </p>
        </div>
      </div>
    </header>
    <!-- Section-->
    <section class="py-5">
      <div class="container-fluid px-2 px-lg-5">
        <div class="row">
          <div class="col-5">
            <div>
              <h3>Bộ lọc</h3>
              <FilterComponent
                class="animate__animated animate__faster animate__fadeInDown filter-component"
                v-model="filter"
                title="Tìm kiếm sản phẩm"
                :items="[
                  { name: 'ten', title: 'Tên' },
                  { name: 'mota', title: 'Mô tả' }
                ]"
              ></FilterComponent>
            </div>

            <div style="display: flex; justify-content: flex-start; align-items: center">
              <ul class="pagination" style="margin-bottom: 0">
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
                  <a style="z-index: 0" class="page-link" href="#">{{ item }}</a>
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
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="15">15</option>
              </select>

              <div class="d-flex align-items-end mb-2">
                <div style="max-width: 500px; margin-left: 32px" class="d-flex align-items-end">
                  <div>
                    <label>Sắp xếp theo</label>
                    <select
                      required
                      placeholder="Chon trường sắp xếp"
                      class="form-select"
                      v-model="sortBy"
                    >
                      <option value="" disabled selected>Chọn trường để sắp xếp</option>
                      <option value="gia">Giá</option>
                      <option value="ten">Tên</option>
                      <option value="createdAt">Ngày tạo</option>
                    </select>
                  </div>
                  <div @click="toggleDirection" style="margin-left: 8px" v-if="direction === 1">
                    <i class="fa-solid fa-sort-up"></i>
                    Tăng dần
                  </div>
                  <div @click="toggleDirection" style="margin-left: 8px" v-if="direction === -1">
                    <i class="fa-solid fa-sort-down"></i>
                    Giảm dần
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="col-7">
            <h3 style="font-weight: bold">Danh Sách Đồ Chơi</h3>

            <div
              v-auto-animate
              id="product-list-container"
              class="row gx-2 gx-lg-2 row-cols-3 row-cols-md-5 row-cols-xl-6"
            >
              <div v-for="product in products" class="col mb-5" :key="product.id">
                <div class="card h-100">
                  <!-- Product image--><img
                    v-if="product.images.length > 0"
                    class="card-img-top"
                    :src="getImage(product.images[0].path)"
                    alt="..."
                    style="aspect-ratio: 1; object-fit: cover"
                  />
                  <!-- Product details-->
                  <div class="card-body p-4">
                    <div class="text-center">
                      <!-- Product name-->
                      <h5 class="fw-bolder">{{ product.ten }}</h5>
                      <!-- Product price-->{{ vndFormat(product.gia) }}
                    </div>
                  </div>

                  <!-- Product actions-->
                  <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                    <div class="text-center">
                      <RouterLink :to="`/products/${product.id}`">
                        <a class="btn btn-outline-dark mt-auto" href="#">Xem chi tiết</a>
                      </RouterLink>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </main>
</template>
<style>
header {
  display: flex;
  justify-content: center;
}
div.banner {
  background-image: url('@/assets/images/banner.webp');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 600px;
}
</style>
<script>
import hanghoaService from '@/services/hanghoa.service'
import fileService from '@/services/file.service'
import vndFormat from '@/utils/vndFormat'
import FilterComponent from '@/components/FilterComponent.vue'
import { ref } from 'vue'

export default {
  name: 'HomeView',
  components: {
    FilterComponent
  },
  data() {
    const products = ref([])
    const pageSize = ref(5)
    const total = ref([])
    const page = ref(1)
    const filter = ref({ searchBy: 'ten', term: '' })
    const isLoading = ref(false)
    const sortBy = ref(null)
    const direction = ref(1)
    const isSearching = ref(false)

    return {
      products,
      pageSize,
      total,
      page,
      isLoading,
      filter,
      sortBy,
      direction,
      isSearching
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
    filter(value) {
      this.updateProductList()
    },
    sortBy() {
      this.updateProductList()
    },
    direction() {
      this.updateProductList()
    }
  },
  methods: {
    async updateProductList() {
      try {
        this.isLoading = true

        const res = await hanghoaService.getAll({
          page: this.page,
          pageSize: this.pageSize,
          ...this.filter,
          sortBy: this.sortBy,
          direction: this.direction
        })

        this.products = res.data
        const totalPages = Math.ceil(res.totalRows / this.pageSize)
        this.total = Array.from({ length: totalPages }, (_, i) => i + 1)
      } catch (error) {
        this.$toast.error(error.message)
      } finally {
        this.isLoading = false
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
    },
    toggleDirection() {
      this.direction = this.direction === 1 ? -1 : 1
    },
    vndFormat,
    getImage(path) {
      return fileService.getFileUrl(path)
    },
    async toggleSearchingPanel() {
      if (this.isSearching) {
        const panel = document.querySelector('.filter-component')
        panel.classList.add('animate__fadeOutUp')
        setTimeout(() => {
          this.isSearching = !this.isSearching
          panel.classList.remove('animate__fadeOutUp')
        }, 800)
        return
      }
      this.isSearching = !this.isSearching
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
