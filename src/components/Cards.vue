<template>
  <div>
    <div class="katalog">
      <ul v-if="posts && posts.length">
        <li v-for="(post) of posts" v-bind:key="post.id">
       
          <mdb-card class="card">
            <mdb-card-image
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%286%29.jpg"
              alt="Card image cap"
            ></mdb-card-image>
            <mdb-card-body>
              <mdb-card-title>{{ post.judul }}</mdb-card-title>
              <p>{{ post.author }} - {{ post.tahun }}</p>
              <!-- <mdb-card-text>{{ post.sinopsis }}</mdb-card-text> -->
              <!-- <mdb-btn
                class="btn btn-info"
                @click.native="modals.classic = true"
                >Info</mdb-btn
              > -->
              <mdb-btn
                class="btn btn-info"
                @click="modal()"
              >
              </mdb-btn>
              <mdb-btn @click="pinjam(post.id)" color="primary">Pinjam</mdb-btn>
            </mdb-card-body>
          </mdb-card>
        </li>
      </ul>

      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error.id">
          {{ error.message }}
        </li>
      </ul>
    </div>
    <!-- mengeluarkan modal -->

    <modal :show.sync="modal"  headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Modal title</h4>
      <div>
        <!-- {{id}} -->
      </div>
      <p></p>
      <template slot="footer">
        <n-button>Nice Button</n-button>
        <n-button type="danger" @click.native="modals.classic = false"
          >Close</n-button
        >
      </template>
    </modal>
  </div>
</template>
<script>
import axios from "axios";

import { Button, Modal, FormGroupInput } from "@/components";
import { Popover, Tooltip, DatePicker } from "element-ui";
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  mdbBtn,
} from "mdbvue";
export default {
  name: "CardPage",
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    mdbBtn,

    Modal,
    [Button.name]: Button,
    [Popover.name]: Popover,
    [Tooltip.name]: Tooltip,
    [DatePicker.name]: DatePicker,
    [FormGroupInput.name]: FormGroupInput,
  },
  data() {
    return {
      buku: {
        idKatalog: "",
      },
      posts: [],
      errors: [],
      modals: {
        classic: false,
        mini: false,
      },
      pickers: {
        datePicker: "",
      },
    };
  },
  methods: {
    pinjam: function(id) {
      if (localStorage.getItem("Bearer") == null) {
        alert("silahkan login dahulu");
      } else {
        alert(id + "----------" + localStorage.getItem("Bearer"));
        // localStorage.getItem('Bearer').then(res => console.log(res))
        const params = { idKatalog: `${id}` };

      
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Bearer"),
          },
        };
        console.log(config);

        axios
          .post(`http://localhost:8081/user/`, params, config)
          .then((res) => console.log(res))
          .catch((err) => console.log("===", err));
      }
    },
    modal: function() {
      return true
    },
  },
  // Fetches posts when the component is created.
  created() {
    axios
      .get(`http://localhost:8081/guess/k/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.posts = response.data;
        this.$store.commit("setkatalog", this.posts);
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },
};
</script>

<style scoped>
.card {
  max-width: 275px;
  border-radius: 15px;
}
.container {
  display: grid;
  grid-template-columns: 66% auto;
  padding: 4em 1em;
}
ul {
  display: grid;
  list-style-type: none;
  margin: 0;
  padding: 0;
  grid-template-columns: repeat(4, auto);
  grid-template-rows: repeat(2, auto);
}
.katalog {
  margin: 20px;
  justify-content: center;
}
</style>
