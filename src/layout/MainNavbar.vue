<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      PERPUSTAKAAN PRAXIS

      <el-popover
        ref="popover1"
        popper-class="popover"
        placement="bottom"
        width="200"
        trigger="hover"
      >
        <div class="popover-body">
          Designed by Invision. Coded by Creative Tim
        </div>
      </el-popover>
    </template>
    <template slot="navbar-menu">
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons files_paper"></i>
          <p><router-link to="/">Tentang</router-link></p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons files_single-copy-04"></i>
          <p><router-link to="/katalog">Katalog</router-link></p>
        </a>
      </li>

      <drop-down
        tag="li"
        title="User"
        icon="now-ui-icons users_circle-08"
        class="nav-item"
      >
        <nav-link to="/login">
          <i class="now-ui-icons users_circle-08"></i> Login
        </nav-link>
        <nav-link to="/register">
          <i class="now-ui-icons users_single-02"></i> SignUp
        </nav-link>
      </drop-down>

      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Ikuti kami di Github"
          data-placement="bottom"
          href="https://github.com/praxis-academy"
          target="_blank"
        >
          <i class="fab fa-github"></i>
          <p class="d-lg-none d-xl-none">Github</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Ikuti kami di Facebook"
          data-placement="bottom"
          href="https://www.facebook.com/praxisacademy.id/"
          target="_blank"
        >
          <i class="fab fa-facebook-square"></i>
          <p class="d-lg-none d-xl-none">Facebook</p>
        </a>
      </li>
      <li class="nav-item">
        <a
          class="nav-link"
          rel="tooltip"
          title="Ikuti kami di Instagram"
          data-placement="bottom"
          href="https://www.instagram.com/praxisacademy/"
          target="_blank"
        >
          <i class="fab fa-instagram"></i>
          <p class="d-lg-none d-xl-none">Instagram</p>
        </a>
      </li>
    </template>
  </navbar>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",
  props: {
    transparent: Boolean,
    colorOnScroll: Number,
  },
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
};
</script>

<style scoped></style>
