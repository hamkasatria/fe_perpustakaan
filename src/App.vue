<template>
  <div id="app">
    <!-- <Navbar /> -->
    <router-view name="header" />
    <div class="wrapper">
      <router-view />
    </div>
    <router-view name="footer" />
      <Footer />
    
  </div>
</template>

<script>
//  import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
   components: {
    // Navbar,
    Footer,
   },
};
</script>
