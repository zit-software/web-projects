<template>
  <main>
    <div class="container">
      <h2 class="my-4">Thông tin cá nhân</h2>

      <VeeForm
        :initial-values="user"
        class="w-100"
        @submit="submit"
        :validation-schema="validationSchema"
        v-slot="{ errors }"
      >
        <div class="mt-3">
          <label for="ten" class="form-label">Họ và tên</label>
          <field
            name="ten"
            id="ten"
            class="form-control"
            :class="{ 'is-invalid': errors.ten }"
            placeholder="VD: Trần Gia..."
          />
          <error-message name="sdt" class="invalid-feedback animate__animated animate__headShake" />
        </div>
        <div class="mt-3">
          <label for="sdt" class="form-label">Số điện thoại</label>
          <field
            name="sdt"
            id="sdt"
            class="form-control"
            :class="{ 'is-invalid': errors.sdt }"
            placeholder="VD: 0931xxx..."
          />
          <error-message name="sdt" class="invalid-feedback animate__animated animate__headShake" />
        </div>
        <div class="mt-3">
          <label for="diachi" class="form-label">Địa chỉ</label>
          <field
            name="diachi"
            id="diachi"
            class="form-control"
            :class="{ 'is-invalid': errors.diachi }"
            placeholder="VD: B3-10, Đường số 3 ...."
          />
          <error-message
            name="diachi"
            class="invalid-feedback animate__animated animate__headShake"
          />
        </div>
        <button href="#" type="submit" class="btn btn-primary d-block my-3">
          <i class="fa-solid fa-floppy-disk"></i>
          Lưu
        </button>
        <a
          href="#"
          type="button"
          class="btn btn-success"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          <i class="fa-solid fa-key"></i>
          Đổi mật khẩu
        </a>
      </VeeForm>
    </div>
  </main>
  <ChangePassword></ChangePassword>
</template>
<style>
main {
  min-height: 90vh;
}
.image-container {
  display: flex;
  justify-content: center;
  align-items: center;
}
.image {
  height: 550px;
  border-radius: 12px;
}
form {
  width: 480px;
}
.action-container {
  margin-bottom: 120px;
}
</style>
<script>
import customerImage from '@/assets/images/customer.jpeg'
import * as yup from 'yup'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import { useUserStore } from '@/stores/user'
import khachHangService from '@/services/khachhang.service'
import ChangePassword from './ChangePassword.vue'

const userStore = useUserStore()

const validationSchema = yup.object().shape({
  ten: yup.string().required('Vui lòng nhập tên'),
  sdt: yup.string().required('Vui lòng nhập số điện thoại'),
  diachi: yup.string().required('Vui lòng nhập địa chỉ')
})

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage,
    ChangePassword
  },
  data() {
    return {
      customerImage,
      validationSchema,
      user: userStore.user,
      open: false
    }
  },
  methods: {
    openModal() {
      this.open = true
    },
    async submit(value) {
      try {
        await khachHangService.selfUpdate(value)
        userStore.setUser({
          ...userStore.user,
          ...value
        })
        this.$toast.success('Cập nhật thông tin thành công', {
          duration: 3000
        })
      } catch (err) {
        this.$toast.error('Cập nhật thông tin thất bại', {
          duration: 3000
        })
      }
    }
  }
}
</script>
