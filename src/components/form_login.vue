<template>
  <div class="page-header clear-filter" filter-color="orange">
    <div
      class="page-header-image"
      style="background-image: url('img/header-3.jpeg')"
    ></div>
    <div class="content">
      <div class="container">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div slot="header" class="logo-container">
              <img v-lazy="'img/now-logo.png'" alt="" />
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
// import { mapGetters } from "vuex";

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
    submit: function() {
console.log("ini adalah console");
      axios
        .post("http://localhost:8081/guess/signin", this.data)
        .then((res) => {
          console.log("ini adalah respon = "+res.data.accessToken);
          alert(localStorage.getItem("Anda berhasil masuk"));
          localStorage.setItem(res.data.tokenType, res.data.accessToken);
          this.$store.state.token = res.data.accessToken;
          this.$swal("anda berhasil masuk");
          this.$router.push({ name: "Dashboard" });
        })
        .catch((err) => {
          this.$swal({
            icon: "error",
            title: err,
          });
        });
    },
  },

  beforeMount() {
    if (!localStorage.getItem("Bearer")) {
      scrollTo(0, 0);
    } else {
      this.$router.push({ name: "Dashboard" });
    }
  },
};
</script>

<style></style>
