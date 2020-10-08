<template>
  <!-- Card -->
  <div class="container">
  
      <form  >
        <p class="h4 text-center py-4">Sign up</p>
        <div class="grey-text">
          <mdb-input v-model="data.username" placeholder="Your name" icon="user" group type="text" validate error="wrong" success="right"/>
          <mdb-input v-model="data.email" placeholder="Your email" icon="envelope" group type="email" validate error="wrong" success="right"/>
          <i class="far fa-address-card"></i>
          <mdb-input v-model="data.noHp" placeholder="No Handphone" group type="text" validate error="wrong" success="right"/>
          <mdb-input v-model="data.password" placeholder="Your password" icon="lock" group type="password" validate/>
        </div>
        
        <div class="text-center py-4 mt-3">
          <mdb-btn color="cyan" type="submit" @click="submit">Register</mdb-btn>
        </div>
      </form>

  <!-- Card -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mdbInput, mdbBtn, } from 'mdbvue';
//import axios from "axios";
export default {
  name: 'Basic',
    components: {
      mdbInput,
      mdbBtn
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
      console.log(this.data);

        const axios = await import("axios");
        console.log(this.data)
        axios
          .post("http://localhost:8081/guess/signup", this.data)
          .then((res) => console.log(res))
          .catch((err) => console.log(err));
       
    },
  },
  computed: {
    ...mapGetters(["gettersApiPeserta"]),
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
