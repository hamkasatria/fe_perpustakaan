<template>
  <div>
    <div class="katalog">
      <ul v-if="posts && posts.length">
        <li v-for="post of posts" v-bind:key="post.id">
          <mdb-card class="card">
            <mdb-card-image
              src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%286%29.jpg"
              alt="Card image cap"
            ></mdb-card-image>
            <mdb-card-body>
              <mdb-card-title>{{ post.judul }}</mdb-card-title>
              <p>{{ post.author }} - {{ post.tahun }}</p>
              <!-- <mdb-card-text>{{ post.sinopsis }}</mdb-card-text> -->
              <!-- @click.native="modals.classic = true" -->

              <b-button
                v-b-modal.modal-1
                class="btn btn-info"
                @click="modal(post)"
                >info</b-button
              >
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
    <!-- modal bootstrrap -->
    >
    <div>
      <b-modal id="modal-1" hide-footer>
        <template>
          {{ modals.judul }}
        </template>
        <p class="my-4">author : {{ modals.author }}</p>
        <p class="my-4">tahun : {{ modals.tahun }}</p>
        <p class="my-4">sinopsis : {{ modals.sinopsis }}</p>
        <p class="my-4">jumlah : {{ modals.jumlah }}</p>
        <b-button variant="outline-danger" @click="hideModal"
          >Tutup</b-button
        >
        <b-button variant="outline-warning" @click="toggleModal"
          >Pinjam</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";

import { Button, FormGroupInput } from "@/components";
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
        id: [],
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
    modal: function(post) {
      this.modals = post;
      console.log("ini adalah modal" + post);
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
