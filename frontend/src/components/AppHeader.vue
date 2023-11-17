<template>
  <nav class="navbar navbar-expand-lg border-bottom">
    <div class="container px-4 px-lg-5">
      <a class="navbar-brand" href="#!">Shopping</a
      ><button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="#!">Home</a>
          </li>
          <li class="nav-item"><a class="nav-link" href="#!">About</a></li>
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle"
              id="navbarDropdown"
              href="#"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              >Shop</a
            >
            <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
              <li><a class="dropdown-item" href="#!">All Products</a></li>
              <li>
                <hr class="dropdown-divider" />
              </li>
              <li><a class="dropdown-item" href="#!">Popular Items</a></li>
              <li><a class="dropdown-item" href="#!">New Arrivals</a></li>
            </ul>
          </li>
        </ul>
        <div class="d-flex gap-1">
          <button class="btn btn-outline-dark" type="submit">
            <i class="fa fa-cart-shopping"></i>Cart<span
              class="badge bg-dark text-white ms-1 rounded-pill"
              >0</span
            >
          </button>

          <div class="dropdown" :class="{ show: showModal }" v-if="logged" @click="toggleModal">
            <button class="btn btn-secondary dropdown-toggle" type="button">
              {{ user?.ten }}
            </button>
            <ul class="dropdown-menu" :class="{ show: showModal }">
              <li>
                <RouterLink class="dropdown-item" to="/customer">
                  <i class="fa fa-user"></i>
                  Thông tin tài khoản
                </RouterLink>
              </li>
              <li>
                <RouterLink class="dropdown-item" to="/settings">
                  <i class="fa fa-cog"></i>
                  Cài đặt
                </RouterLink>
              </li>
              <li>
                <a class="dropdown-item" href="#" @click="logout">
                  <i class="fa-solid fa-arrow-right-from-bracket"></i>
                  Đăng xuất</a
                >
              </li>
            </ul>
          </div>

          <RouterLink to="/auth/login" v-else-if="$route.path !== '/auth/login'">
            <button class="btn btn-primary">Đăng nhập</button>
          </RouterLink>

          <RouterLink to="/auth/register" v-else>
            <button class="btn btn-primary">Đăng ký</button>
          </RouterLink>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { ref } from 'vue'
import { RouterLink } from 'vue-router'

export default {
  components: {
    RouterLink
  },
  data() {
    const userStore = useUserStore()
    const showModal = ref(false)

    return {
      userStore,
      showModal
    }
  },
  methods: {
    toggleModal(event) {
      event.stopPropagation()

      this.showModal = !this.showModal
    },
    onWindowClick() {
      this.showModal = false
    },
    logout() {
      this.userStore.logout().then(() => {
        this.$router.push('/')
      })
    }
  },
  computed: {
    logged() {
      return this.userStore.isLogged()
    },
    user() {
      return this.userStore.user
    }
  },
  mounted() {
    window.addEventListener('click', this.onWindowClick)
  },
  unmounted() {
    window.removeEventListener('click', this.onWindowClick)
  }
}
</script>
