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
              <h1 class="h1-seo">MASUK AKUN</h1>
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
                  aria-describedby="emailHelp"
                  placeholder="Email atau Username"
                  v-model="data.usernameOrEmail"
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
                Masuk
              </button>
              <div class="pull-center">
                <h6>
                  <a href="#/register" class="link footer-link"
                    >Create Account</a
                  >
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
import Swal from "sweetalert2";

export default {
  name: "login-page",
  bodyClass: "login-page",
  components: {
    Card,
    [Button.name]: Button,
    // [FormGroupInput.name]: FormGroupInput,
  },
  data: () => {
    return {
      data: {
        usernameOrEmail: "",
        password: "",
      },
    };
  },

  methods: {
    submit() {
      axios
        .post("http://localhost:8081/guess/signin", this.data)
        .then((res) => {
          Swal.fire("Mantabss!", "Anda berhasil Login!", "success");
          localStorage.setItem(res.data.tokenType, res.data.accessToken);
          this.$store.state.token = res.data.accessToken;
          const config = {
            headers: {
              Authorization: "Bearer " + res.data.accessToken,
              // Authorization: "Bearer " + "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI1IiwiaWF0IjoxNjA1ODQyMzIwLCJleHAiOjE2MDY0NDcxMjB9.6HNGL66EntPxs3Z1nwtbGBD5IHfWi5VJsm27X3NQ3vaaOZdEABR3fIOZsme4wRijP9x3okyI9Fa2Y3F7YwfvgQ"
            },
          };
          axios.get("http://localhost:8081/user/", config).then((respon) => {
            // this.$store.state.personalUser = respon.data;
            this.$store.commit("setPersonalUser", respon.data);
            //jika di reload akan hilang
            console.log(
              "username nya " + this.$store.getters.getPersonalUser.username
            );
            //console.log(respon.data.username);
            if (respon.data.roles[0].name == "ROLE_ADMIN") {
              console.log("masuk ke admin");
              this.$router.push({ path: "/datapengguna" });
            } else {
              console.log("masuk ke user");
              //masih error
              this.$router.go({ path: "/" });
              // this.$router.push({ path: "katalog" });
            }
          });
        });
      this.$router.push({ path: "/" });
    },
  },

  beforeCreate() {
    if (!localStorage.getItem("Bearer")) {
      // scrollTo(0, 0);
    } else {
      // this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>

<style></style>
