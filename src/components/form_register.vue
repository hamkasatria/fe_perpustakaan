<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/header-3.jpeg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <div class="container">
            <div class="content-center brand">
              <h1 class="h1-seo">MEMBUAT AKUN</h1>
            </div>
          </div>
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <!-- <img v-lazy="'img/logo_praxis.png'" alt="" /> -->
            </div>

            <form>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Username"
                  v-model="data.username"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  aria-describedby="emailHelp"
                  placeholder="Email"
                  v-model="data.email"
                />
              </div>
              <div class="form-group">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Nomor HP"
                  v-model="data.noHp"
                />
              </div>
              <div class="form-group">
                <input
                  type="password"
                  class="form-control"
                  placeholder="Password"
                  v-model="data.password"
                />
              </div>
              <small id="emailHelp" class="form-text text-muted"
                >kami berkomitmen menjaga privasi akun anda</small
              >
              <button
                type="submit"
                @click="submit"
                class="btn btn-primary btn-round btn-lg btn-block"
              >
                Buat
              </button>
              <div class="pull-center">
                <h6>
                  <a href="#/login" class="link">sudah punya akun</a>
                </h6>
              </div>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, Button } from "@/components";
import axios from "axios";
import { mapGetters } from "vuex";
import Swal from "sweetalert2";

export default {
  name: "signup-page",
  bodyClass: "login-page",
  components: {
    Card,
    [Button.name]: Button,
    // [FormGroupInput.name]: FormGroupInput,
  },
  data: () => {
    return {
      data: {
        username: "",
        email: "",
        noHp: "",
        password: "",
      },
    };
  },
  methods: {
    submit: async function() {
      axios
        .post("http://localhost:8081/guess/signup", this.data)
        .then((res) => {
          console.log(res);
          Swal.fire("Mantabss!", "Anda berhasil Membuat Akun!, silahkan login", "success");
        })
        .catch((err) => console.log(err));

        //menghapus data
        this.data={};
        this.$router.push({ path: "/login" });
    },
  },
  computed: {
    ...mapGetters(["gettersApiPeserta"]),
  },

  beforeMount() {
    if (!localStorage.getItem("Bearer")) {
      scrollTo(0, 0);
    } else {
      // this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>
