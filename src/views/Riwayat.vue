<template>
  <div>
    <!-- paralax  -->
    <div class="page-header clear-filter" filter-color="orange">
      <parallax
        class="page-header-image"
        style="background-image:url('img/header.jpg')"
      >
      </parallax>

      <div class="container">
        <div class="content-center brand">
          <img class="n-logo mm" src="../assets/logo.png" alt="" />
          <h1 class="h1-seo">RIWAYAT PEMINJAMAN</h1>
          <br />
          <h3>I read a book one day and my whole life was changed</h3>
          <h5>(Orhan Pamuk)</h5>
        </div>
      </div>
    </div>
    <!-- akhir dari paralax -->
    <riwayat />
  </div>
</template>

<script>
import riwayat from "@/components/Riwayat";
export default {
  components: {
    riwayat,
  },
};
</script>

<style scoped>
.mm {
  margin-top: 50%;
}
</style>
