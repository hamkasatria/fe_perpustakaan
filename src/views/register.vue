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
          <h1 class="h1-seo">PENDAFTARAN PERPUSTAKAAN PRAXIS</h1>
          <h3>5 langkah lebih maju dari pada 4 langkah</h3>
        </div>
      </div>
    </div>
    <!-- akhir dari paralax -->
      <formRegister/>
  </div>
</template>

<script>
import formRegister from "@/components/form_register.vue"
export default {
    name:'Register',
    components: {
        formRegister
    }
}
</script>

<style scoped>
.mm{
  margin-top: 50%;
}
</style>