<template>
  <!-- Card -->
  <div>
  <mdb-card>
    <mdb-card-body>
      <form>
        <p class="h4 text-center py-4">Sign up</p>
        <div class="grey-text">
          <mdb-input label="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
          <mdb-input label="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
          <mdb-input label="No Handphone" icon="exclamation-triangle" group type="text" validate error="wrong" success="right"/>
          <mdb-input label="Your password" icon="lock" group type="password" validate/>
        </div>
        <div class="text-center py-4 mt-3">
          <mdb-btn color="cyan" type="submit">Register</mdb-btn>
        </div>
      </form>
    </mdb-card-body>
  </mdb-card>
  <!-- Card -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mdbInput, mdbBtn, } from 'mdbvue';
// import axios from "axios";
export default {
  name: 'Basic',
    components: {
      mdbInput,
      mdbBtn
    },
  data: () => {
    return {
      // data
      data: {
        username: "",
        email: "",
        noHp: "",
        password: "",
      },
      // validate
      usernameVal: [(v) => v.length >= 3 || "name length is 3 character"],
      emailVal: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      nomorhpVal: [(v) => !!v || "required"],
    };
  },
  methods: {
    submit: async function() {
      console.log(this.data);
      if (this.$refs.form.validate()) {
        const axios = await import("axios");
        axios
          .post("localhost:8082/guess/signup", this.data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
      } else {
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
  },
  computed: {
    ...mapGetters(["gettersApiPeserta"]),
  },
};


</script>
