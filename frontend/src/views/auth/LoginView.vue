<template>
  <div class="container py-4">
    <VeeForm
      class="card p-4 shadow shadow-sm"
      @submit="login"
      :validation-schema="validationScheme"
      v-slot="{ errors }"
    >
      <h2>Đăng nhập</h2>
      <div class="mb-3">
        <label for="staticEmail" class="form-label">Tên đăng nhập</label>
        <Field
          name="username"
          type="username"
          class="form-control"
          :class="{ 'is-invalid': errors.username }"
        />
        <ErrorMessage name="username" class="invalid-feedback" />
      </div>

      <div class="mb-3">
        <label for="inputPassword" class="col-form-label">Password</label>
        <Field
          name="password"
          type="password"
          class="form-control"
          :class="{ 'is-invalid': errors.password }"
          id="inputPassword"
        />
        <ErrorMessage name="password" class="invalid-feedback" />
      </div>

      <button class="btn btn-primary" type="submit">Đăng nhập</button>

      <p class="text text-dark py-2">
        Bạn chưa có tài khoản?
        <RouterLink to="/auth/register">Đăng ký ngay</RouterLink>
      </p>
    </VeeForm>
  </div>
</template>

<style scoped>
form {
  width: 480px;
  max-width: 100%;
  margin: 0 auto;
}
</style>

<script>
import { Form as VeeForm, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'
import { RouterLink } from 'vue-router'

const validationScheme = yup.object().shape({
  username: yup
    .string()
    .required('Vui lòng nhập tên đăng nhập')
    .min(3, 'Tên đăng nhập phải có ít nhất 3 ký tự')
    .max(10, 'Tên đăng nhập không được dài quá 10 ký tự'),
  password: yup
    .string()
    .required('Vui lòng nhập mật khẩu')
    .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
    .max(20, 'Mật khẩu không được dài quá 10 ký tự')
})

export default {
  name: 'LoginView',
  components: {
    VeeForm,
    Field,
    ErrorMessage,
    RouterLink
  },
  data() {
    return {
      validationScheme
    }
  },
  methods: {
    login(value) {
      console.log(value)
    }
  }
}
</script>
