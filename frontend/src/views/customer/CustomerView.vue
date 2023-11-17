<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col col-6 image-container mt-5">
          <img class="image" :src="customerImage" />
        </div>
        <div class="col col-6 form-container mt-5 fst-italic">
          <h1>Thông tin cá nhân</h1>
        </div>
      </div>
    </div>
  </main>
</template>
<style>
main {
  background-color: rgb(224, 223, 223);
  height: 90vh;
  overflow: hidden;
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
</style>
<script>
import customerImage from '@/assets/images/customer.jpeg'

export default {
  data() {
    return {
      customerImage
    }
  },
  methods: {}
}
</script>
