<template>
  <div class="container">
    <form>
      <p class="h4 text-center py-4">Login</p>
      <div class="grey-text">
        <mdb-input
          v-model="data.usernameOrEmail"
          placeholder="Name or Email"
          icon="user envolpe"
          group
          type="text"
          validate
          error="wrong"
          success="right"
        />
        <mdb-input
          v-model="data.password"
          placeholder="Your password"
          icon="lock"
          group
          type="password"
          validate
        />
      </div>

      <div class="text-center py-4 mt-3">
        <mdb-btn color="cyan" type="submit" @click="submit">Register</mdb-btn>
      </div>
    </form>
  </div>
</template>

<script>
//import axios from "axios";
import { mdbInput, mdbBtn } from "mdbvue";
export default {
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
  },
  // data: () => {
  //   return {
  //     form: {
  //       usernameOrEmail: "",
  //       password: "",
  //     },
  //     nameVal: [(v) => !!v || "required"],
  //     passwordVal: [(v) => !!v || "required"],
  //   };
  // },
  // methods: {
  //   login: function() {
  //     if (this.$refs.form.validate()) {
  //       axios
  //         .post("http://localhost:8081/guess/signin", this.form)
  //         .then((res) => {
  //           console.log(res);
  //           localStorage.setItem(res.data.tokenType, res.data.accessToken);
  //           this.$store.state.token = res.data.accessToken;
  //           this.$swal("data masukk");
  //           this.$router.push({ name: "Dashboard" });
  //         })
  //         .catch((err) => {
  //           console.log(err);
  //           alert("err");
  //         });
  //     } else {
  //       this.$swal("salahhhh");
  //     }
  //   },
  // },
  // beforeMount() {
  //   if (!localStorage.getItem("Bearer")) {
  //     scrollTo(0, 0);
  //   } else {
  //     this.$router.push({ name: "Dashboard" });
  //   }
  // },
};
</script>

<style scoped>
.container {
  /* border: 1px solid #000; */
  width: 50%;
}
.margin {
  margin: 10px 10px 10px 10px;
  border: 1px solid #000;
}
</style>
