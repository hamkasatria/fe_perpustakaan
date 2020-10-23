<template>
  <div>
    <div class="katalog">
      <ul v-if="posts && posts.length">
        <li v-for="post of posts" v-bind:key="post.id">
          <b-card
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-tops
            tag="article"
            style="max-width: 20rem;"
            class="mb-2 card"
          >
            <b-card-text>
              <p class="font-weight-bold">{{ post.judul }}</p>
              <p></p>
              <p>{{ post.author }} - {{ post.tahun }}</p>
            </b-card-text>
            <b-button id="show-btn" @click="showModal(post)">Info</b-button>
            <b-button @click="pinjam(post.id)" variant="primary"
              >Pinjam</b-button
            >
          </b-card>
        </li>
      </ul>

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
              src="https://picsum.photos/600/300/?image=25"
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
              class="mt-3"
              variant="outline-danger"
              block
              @click="hideModal"
              >Close</b-button
            >
            <b-button
              class="mt-2"
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
      modals: {
      
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
          .then((res) =>
            alert("anda berhasil meminjam buku ").then(console.log(res))
          )
          .catch((err) => console.log("===", err));
      }

      this.$refs["my-modal"].hide();
    },
    showModal: function(post) {
      this.modals = post;
      console.log("ini adalah modal" + post);
      this.$refs["my-modal"].show();
    },

    hideModal() {
      this.$refs["my-modal"].hide();
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
  border-top-right-radius: 15px;
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
