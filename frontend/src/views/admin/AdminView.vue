<template>
  <div class="container container-fluid py-4">
    <table class="table">
      <thead>
        <tr>
          <th></th>
          <th>Mục quản lý</th>
          <th>Mô tả</th>
          <th></th>
        </tr>
      </thead>

      <tbody>
        <tr>
          <td>
            <i class="fa fa-users"></i>
          </td>
          <td>Khách hàng</td>
          <td>Quản lý thông tin khách hàng</td>
          <td>
            <RouterLink to="/admin/customers" class="btn btn-outline-primary">Xem</RouterLink>
          </td>
        </tr>

        <tr>
          <td>
            <i class="fa fa-box"></i>
          </td>
          <td>Hàng hóa</td>
          <td>Quản lý thông tin hàng hóa</td>
          <td>
            <RouterLink to="/admin/products" class="btn btn-outline-primary">Xem</RouterLink>
          </td>
        </tr>

        <tr>
          <td>
            <i class="fa fa-file"></i>
          </td>
          <td>Đơn hàng</td>
          <td>Quản lý đơn hàng</td>
          <td>
            <RouterLink to="/admin/invoices" class="btn btn-outline-primary">Xem</RouterLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'AdminView'
}
</script>
