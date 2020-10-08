<template>
  <div class="container">
    <!-- Material form login -->
    <form>
      <p class="h4 text-center mb-4">Sign in</p>
      <div class="grey-text">
        <mdb-input label="Your email" icon="envelope" type="email" />
        <mdb-input label="Your password" icon="lock" type="password" />
      </div>
      <div class="text-center">
        <mdb-btn>Login</mdb-btn>
      </div>
    </form>
    <!-- Material form login -->
  </div>
</template>

<script>
import { mdbInput, mdbBtn } from "mdbvue";
export default {
  name: "Basic",
  components: {
    mdbInput,
    mdbBtn,
  },
};
</script>

<style scoped>
.container {
  border: 1px solid #000;
  width: 50%;
}
.margin {
  margin: 10px 10px 10px 10px;
  border: 1px solid #000;
}
</style>
