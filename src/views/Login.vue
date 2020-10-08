<template>
  <div class="container">
    <form>
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
        <mdb-input placeholder="Your email" icon="envelope" type="email" />
        <mdb-input placeholder="Your password" icon="lock" type="password" />
      </div>
      <div class="text-center">
        <mdb-btn>Login</mdb-btn>
      </div>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import { mdbInput, mdbBtn } from "mdbvue";
export default {
  data() {
    return {
      form: {
        username: "",
        password: "",
      },
    };
  },
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
  },

  methods: {
    submit() {
      axios.post("localhost:8082/guess/signup", this.form).then(
        function() {
          // Handle success
          alert("suskses menambahkan data");
        }.bind(this)
      );
    },
  },
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
