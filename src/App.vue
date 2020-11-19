<template>
  <div id="app">
    <!-- <Navbar /> -->
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
    <b-row>
      <b-col>
      <!-- <Footer /> -->

      </b-col>
    </b-row>
    
  </div>
</template>

<script>
//  import Navbar from "@/components/Navbar.vue";
// import Footer from "@/components/Footer.vue";
export default {
   components: {
    // Navbar,
    // Footer,
   },
};
</script>
<style scoped>
.page-header{
  max-height: auto !important;
}
</style>
