<template>
  <main>
    <!-- Header-->
    <header class="bg-dark py-5">
      <div class="container px-4 px-lg-5 my-5">
        <div class="text-center text-white">
          <h1 class="display-4 fw-bolder">Shop in style</h1>
          <p class="lead fw-normal text-white-50 mb-0">Clothing Store For Your Wardrobe</p>
        </div>
      </div>
    </header>
    <!-- Section-->
    <section class="py-5">
      <div class="container-fluid px-2 px-lg-5 mt-5">
        <div class="row gx-4 gx-lg-5 row-cols-3 row-cols-md-4 row-cols-xl-5 justify-content-center">
          <div v-for="product in products" class="col mb-5">
            <div class="card h-100">
              <!-- Product image--><img
                v-if="product.images.length > 0"
                class="card-img-top"
                :src="getImage(product.images[0].path)"
                alt="..."
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
                  <a class="btn btn-outline-dark mt-auto" href="#">View options</a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div style="display: flex; justify-content: flex-end; align-items: center">
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
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </section>
  </main>
</template>
<style>
.card {
}
</style>
<script>
import hanghoaService from '@/services/hanghoa.service'
import fileService from '@/services/file.service'
import vndFormat from '@/utils/vndFormat'
import { ref } from 'vue'

export default {
  name: 'HomeView',
  data() {
    const products = ref([])
    const pageSize = ref(5)
    const total = ref([])
    const page = ref(1)
    const isLoading = ref(false)

    return {
      products,
      pageSize,
      total,
      page,
      isLoading
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
    }
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
    vndFormat,
    getImage(path) {
      return fileService.getFileUrl(path)
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
