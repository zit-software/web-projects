<template>
  <div class="container container-fluid py-4">
    <div class="row">
      <div class="col-4 row gap-2">
        <div class="">
          <div class="card border-info shadow shadow-sm bg-light">
            <RouterLink to="/admin/customers" class="btn btn-info">
              <div class="card-body">
                <h5 class="card-title">Khách hàng <i class="fa fa-users"></i></h5>

                <p class="card-text">Quản lý thông tin khách hàng</p>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="">
          <div class="card border-info shadow shadow-sm bg-light">
            <RouterLink to="/admin/products" class="btn btn-info">
              <div class="card-body">
                <h5 class="card-title">Hàng hóa <i class="fa fa-box"></i></h5>

                <p class="card-text">Quản lý thông tin hàng hóa</p>
              </div>
            </RouterLink>
          </div>
        </div>

        <div class="">
          <div class="card border-info shadow shadow-sm bg-light">
            <RouterLink to="/admin/invoices" class="btn btn-info text-center">
              <div class="card-body">
                <h5 class="card-title">Đơn hàng <i class="fa fa-file-invoice"></i></h5>

                <p class="card-text">Quản lý đơn hàng</p>
              </div>
            </RouterLink>
          </div>
        </div>
      </div>
      <div class="col col-8 d-flex justify-content-center">
        <img src="@/assets/images/banner.jpeg" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>
