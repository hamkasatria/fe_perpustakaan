<template>
  <div>
    <navbar position="fixed" type="primary" menu-classes="ml-auto">
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
            <nav-link>
              <div @click="sidebar_profil()">
                <i class="now-ui-icons users_circle-08"></i> Profile
              </div>
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
    <!-- side bar -->
    <b-sidebar v-model="openSidebarProfil" backdrop shadow right>
      <center>
        <h3>Profil Anda</h3>
        <b-img
          v-bind="mainProps"
          rounded="circle"
          class="m1"
          alt="Circle image"
          :src= profilData.foto
        ></b-img>
      </center>
      <br />
      <div class="container">
        <div class="form-group">
          <center>
            Username :
          </center>
          <input
            type="text"
            readonly
            class="form-control"
            placeholder="Username"
            v-model="profilData.username"
          />
        </div>

        <div class="form-group">
          <center>
            Email :
          </center>
          <input
            type="text"
            readonly
            class="form-control"
            aria-describedby="emailHelp"
            placeholder="Email"
            v-model="profilData.email"
          />
        </div>
        <div class="form-group">
          <center>
            nomor Hp :
          </center>
          <input
            type="text"
            class="form-control"
            placeholder="Nomor HP"
            v-model="profilData.noHp"
          />
        </div>

        <button
          @click="updateProfil()"
          class="btn btn-primary btn-round btn-lg btn-block"
        >
          Update
        </button>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { DropDown, Navbar, NavLink } from "@/components";
import { Popover } from "element-ui";
import axios from "axios";
import Swal from "sweetalert2";

export default {
  name: "main-navbar",
  data() {
    return {
      openSidebarProfil: false,
      profilData: {},
      mainProps: { width: 75, height: 75, class: "m1" },
    };
  },
  props: {},
  components: {
    DropDown,
    Navbar,
    NavLink,
    [Popover.name]: Popover,
  },
  methods: {
    logout() {
      localStorage.removeItem("Bearer");
      Swal.fire("Mantabss!", "Anda berhasil Logout!", "success");
      //this.$router.go();

      setTimeout(this.$router.push({ name: "Home" }),2000);
    },
    updateProfil() {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      console.log(config);
      axios
        .put("http://localhost:8081/user/", this.profilData, config)
        .then((respon) => {
          this.profilData = respon.data;
          console.log(this.profilData);
          this.openSidebarProfil = true;
          Swal.fire("Mantabss!", "Anda berhasil Update Profil!", "success");
          this.openSidebarProfil = false;
        });
    },
    sidebar_profil() {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      console.log(config);
      axios.get("http://localhost:8081/user/", config).then((respon) => {
        this.profilData = respon.data;

        this.openSidebarProfil = true;
      });
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
.z {
  color: white;
}
</style>
