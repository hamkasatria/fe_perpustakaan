<template>
  <div>
    <div class="katalog">
      <b-row v-if="posts && posts.length">
        <b-col
          v-for="post of posts"
          v-bind:key="post.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <b-card
            
            tag="article"
            style="max-width: 20rem;"
            class="card "
          >
          <b-card-img :src= post.foto alt="Image" top class="card"></b-card-img>
            <b-card-text>
              <p class="font-weight-bold">{{ post.judul }}</p>
              <p>{{ post.author }} - {{ post.tahun }}</p>
            </b-card-text>
            <b-button
              pill
              class="bg-primary"
              id="show-btn"
              @click="showModal(post)"
              >Info</b-button
            >
            <b-button
              pill
              class="bg-primary"
              @click="pinjam(post)"
              variant="primary"
              >Pinjam</b-button
            >
          </b-card>
        </b-col>
      </b-row>

      <ul v-if="errors && errors.length">
        <li v-for="error of errors" v-bind:key="error.id">
          {{ error.message }}
        </li>
      </ul>
    </div>

    <!-- modal bootstrrap -->

    <div>
      <b-modal ref="my-modal" size="lg" hide-footer>
        <b-row>
          <b-col
            ><img
              class="img-responsive"
              style="margin:0 auto;"
              :src= modals.foto
              alt=""
            />
          </b-col>
          <b-col
            ><div class="d-block text-center">
              <h3 class="font-weight-bold">{{ modals.judul }}</h3>
              <p class="my-4">author : {{ modals.author }}</p>
              <p class="my-4">tahun : {{ modals.tahun }}</p>
              <p class="my-4">sinopsis : {{ modals.sinopsis }}</p>
              <p class="my-4">jumlah : {{ modals.jumlah }}</p>
            </div>
            <b-button
              pill
              class="mt-3 bg-primary"
              variant="outline-danger"
              block
              @click="hideModal"
              >Close</b-button
            >
            <b-button
              pill
              class="mt-2 bg-primary"
              variant="outline-warning"
              block
              @click="pinjam(modals.id)"
              >Pinjam</b-button
            ></b-col
          >
        </b-row>
      </b-modal>

      <b-modal id="modal-1" hide-footer hide-backdrop content-class="shadow">
        <template>
          {{ modals.judul }}
        </template>

        <b-button variant="outline-danger" @click="hideModal">Tutup</b-button>
        <b-button variant="outline-warning" @click="pinjam(modal.id)"
          >Pinjam</b-button
        >
      </b-modal>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  name: "CardPage",
  components: {},
  data() {
    return {
      buku: {
        idKatalog: "",
      },
      posts: [],
      errors: [],
      modals: {},
      pickers: {
        datePicker: "",
      },
    };
  },
  methods: {
    pinjam: function(post) {
      if (localStorage.getItem("Bearer") == null) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Anda Perlu login terlebih dahulu!",
        });
      } else {
        const params = { idKatalog: `${post.id}` };
        const config = {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("Bearer"),
          },
        };
        console.log(config);

        axios
          .post(`http://localhost:8081/user/`, params, config)
          .then((res) => {
            console.log(res);
            Swal.fire(`${post.judul}`, "Berhasil Diminjam", "success");
          })
          .catch((err) => console.log("===", err));
      }

      this.$refs["my-modal"].hide();
    },
    showModal: function(post) {
      this.modals = post;
      this.$refs["my-modal"].show();
    },

    hideModal() {
      this.$refs["my-modal"].hide();
    },
  },
  // Fetches posts when the component is created.
  created() {
    axios
      .get(`http://localhost:8081/guess/k`)
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
  /* border-top-right-radius: 15px; */
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
