<template>
  <div>
    <div class="page-header clear-filter" filter-color="orange">
      <div
        class="page-header-image"
        style="background-image: url('img/header-3.jpeg')"
      ></div>
      <div class="content">
        <div class="col-md-5 ml-auto mr-auto">
          <card type="login" plain>
            <div class="container content-center brand">
              <h1 class="h1-seo">Profile</h1>
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
                @click="update()"
                class="btn btn-primary btn-round btn-lg btn-block"
              >
                Update
              </button>
            </form>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Card, Button } from "@/components";

import { mapGetters } from "vuex";

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
    update() {
      alert("update");
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
