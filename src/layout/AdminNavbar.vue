<template>
  <navbar position="fixed" type="primary"  menu-classes="ml-auto">
    
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
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons files_paper"></i>
          <p><router-link to="/dataPengguna">Data Pengguna</router-link></p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons education_agenda-bookmark"></i>
          <p><router-link to="/dataKatalog">Data Katalog</router-link></p>
        </a>
      </li>
      <li class="nav-item">
        <a class="nav-link" target="_blank">
          <i class="now-ui-icons education_agenda-bookmark"></i>
          <p>
            <router-link to="/dataPeminjaman">Data Peminajaman</router-link>
          </p>
        </a>
      </li>

      <drop-down
        tag="li"
        title="Admin"
        icon="now-ui-icons users_circle-08"
        class="nav-item"
      >
        <div>
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
import { DropDown, Navbar , NavLink} from "@/components";
import { Popover } from "element-ui";
export default {
  name: "main-navbar",

  props: {
  
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

      //this.$router.go();
      this.$router.push({ name: "Home" });
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
