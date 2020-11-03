<template>
  <navbar
    position="fixed"
    type="primary"
    :transparent="transparent"
    :color-on-scroll="colorOnScroll"
    menu-classes="ml-auto"
  >
    <template>
      <p class="z">PERPUSTAKAAN PRAXIS</p>

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
      <!-- jika dia bukan admin -->
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons files_paper"></i>
          <p class="b"><router-link to="/">Tentang</router-link></p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons education_agenda-bookmark"></i>
          <p class= "b"><router-link to="/katalog">Katalog</router-link></p>
        </a>
      </li>
      <div v-if="!userstatus">
        <li class="nav-item">
          <a class="nav-link" target="_blank">
            <i class="now-ui-icons files_single-copy-04"></i>
            <p class="b"><router-link to="/riwayat">Riwayat</router-link></p>
          </a>
        </li>
      </div>

      <drop-down
        tag="li"
        title="User"
        icon="now-ui-icons users_circle-08"
        class="nav-item"
      >
        <div v-if="userstatus">
          <nav-link to="/login">
            <i class="now-ui-icons users_circle-08"></i> Login
          </nav-link>
          <nav-link to="/register">
            <i class="now-ui-icons users_single-02"></i> SignUp
          </nav-link>
        </div>
        <div v-else>
          <nav-link to="/profile">
            <i class="now-ui-icons users_circle-08"></i> Profile
          </nav-link>
          <nav-link>
            <div @click="logout">
              <i class="now-ui-icons users_single-02"></i> Logout
            </div>
          </nav-link>
        </div>
      </drop-down>
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
  methods: {
    logout() {
      localStorage.removeItem("Bearer");
      alert("anda berhasil logout");

      this.$router.go();
      // this.$router.push({ name: "Login" });
    },
  },

  computed: {
    userstatus: function() {
      if (localStorage.getItem("Bearer") === null) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<style>
.z{
  color:white;
}
</style>