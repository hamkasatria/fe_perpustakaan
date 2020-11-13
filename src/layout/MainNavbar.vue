<template>
  <div>
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
            <p class="b"><router-link to="/katalog">Katalog</router-link></p>
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
        <b-img v-bind="mainProps" rounded="circle" class="m1" alt="Circle image" src="https://picsum.photos/250/250/?image=54"></b-img>
      </center>
      <br>
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
export default {
  data() {
    return {
      openSidebarProfil: false,
      profilData: {},
      mainProps: { width: 75, height: 75, class: 'm1' }
    };
  },
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
          console.log("ini adallah");
          this.profilData = respon.data;
          console.log(this.profilData);
          this.openSidebarProfil = true;
          alert("data anda telah di update");
          this.openSidebarProfil=false;
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
        console.log("ini adallah");
        this.profilData = respon.data;
        console.log(this.profilData);

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
