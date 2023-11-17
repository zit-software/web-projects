<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col col-12 col-lg-4 image-container mt-5 animate__animated animate__fadeIn">
          <img class="image" :src="customerImage" />
        </div>
        <div
          class="col col-12 col-lg-8 form-container mt-5 fst-italic animate__animated animate__lightSpeedInRight"
        >
          <div class="d-flex align-items-center">
            <h1>Thông tin cá nhân</h1>
            <button class="btn btn-dark ms-2">
              <i class="fa-solid fa-lock"></i>
              Đổi mật khẩu
            </button>
          </div>
          <VeeForm
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
              <error-message
                name="sdt"
                class="invalid-feedback animate__animated animate__headShake"
              />
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
              <error-message
                name="sdt"
                class="invalid-feedback animate__animated animate__headShake"
              />
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
            <div class="mt-3 d-flex justify-content-end">
              <button type="submit" class="btn btn-primary">
                <i class="fa-solid fa-floppy-disk"></i>
                Lưu
              </button>
            </div>
          </VeeForm>
        </div>
      </div>
    </div>
  </main>
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
</style>
<script>
import customerImage from '@/assets/images/customer.jpeg'
import * as yup from 'yup'
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'

const validationSchema = yup.object().shape({
  ten: yup.string().required('Vui lòng nhập tên'),
  sdt: yup.string().required('Vui lòng nhập số điện thoại'),
  diachi: yup.string().required('Vui lòng nhập địa chỉ')
})

export default {
  components: {
    VeeForm,
    Field,
    ErrorMessage
  },
  data() {
    return {
      customerImage,
      validationSchema
    }
  },
  methods: {
    submit(value) {
      console.log(value)
    }
  }
}
</script>
