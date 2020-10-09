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
        <div class="content-center brand" >
          <img class="n-logo mm" src="@/assets/logo.png" alt="" />
          <h1 class="h1-seo">LOGIN USER</h1>
          <h3>5 langkah lebih maju dari pada 4 langkah</h3>
        </div>
      </div>
    </div>
    <!-- akhir dari paralax -->
    <formLogin />
  </div>
</template>

<script>
import formLogin from "@/components/form_login.vue";
import { Parallax } from "@/components";
export default {
  components: {
    formLogin,
    Parallax
  },
};
</script>
<style scoped>
.mm{
  margin-top: 50%;
}
</style>