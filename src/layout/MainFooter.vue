<template>
  <footer
    class="footer"
    :class="{ [`footer-${type}`]: type }"
    :data-background-color="backgroundColor"
  >
    <div class="container">
      <nav>
        <div class="d-flex">
          <a
            class="nav-link"
            style="color:white;"
            rel="tooltip"
            title="Ikuti kami di Github"
            data-placement="bottom"
            href="https://github.com/praxis-academy"
            target="_blank"
          >
            <i class="fab fa-github"></i>
            <p class="d-lg-none d-xl-none">Github</p>
          </a>
          <a
            class="nav-link"
            style="color: white"
            rel="tooltip"
            title="Ikuti kami di Facebook"
            data-placement="bottom"
            href="https://www.facebook.com/praxisacademy.id/"
            target="_blank"
          >
            <i class="fab fa-facebook-square"></i>
            <p class="d-lg-none d-xl-none">Facebook</p>
          </a>
          <a
            class="nav-link"
            style="color: white"
            rel="tooltip"
            title="Ikuti kami di Instagram"
            data-placement="bottom"
            href="https://www.instagram.com/praxisacademy/"
            target="_blank"
          >
            <i class="fab fa-instagram"></i>
            <p class="d-lg-none d-xl-none">Instagram</p>
          </a>
          <a
            class="nav-link"
            style="color: white"
            rel="tooltip"
            title="Ikuti kami di Twitter"
            data-placement="bottom"
            href="https://twitter.com/PraxisAcademyId"
            target="_blank"
          >
            <i class="fab fa-twitter"></i>
            <p class="d-lg-none d-xl-none">Twitter</p>
          </a>
        </div>
      </nav>
      <div style="padding-top: 10px;" class="copyright">
        
        &copy; {{ year }}, Designed and Coded by
        <a href="https://github.com/hamkasatria" target="_blank" rel="noopener"
          >Hamka Satria</a
        > and
        <a href="https://github.com/inaii" target="_blank" rel="noopener"
          >Ina</a
        >
  
      </div>
    </div>
  </footer>
</template>
<script>
export default {
  props: {
    backgroundColor: String,
    type: String,
  },
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>
<style></style>
