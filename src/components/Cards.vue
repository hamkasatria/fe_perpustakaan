>
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
              <mdb-btn class="btn btn-info">Info</mdb-btn>
              <mdb-btn color="primary">Button</mdb-btn>
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
    <!-- merupakan yang baru -->
  </div>
</template>
<script>
import axios from "axios";
import {
  mdbCard,
  mdbCardImage,
  mdbCardBody,
  mdbCardTitle,
  // mdbCardText,
  mdbBtn,
} from "mdbvue";
export default {
  name: "CardPage",
  components: {
    mdbCard,
    mdbCardImage,
    mdbCardBody,
    mdbCardTitle,
    // mdbCardText,
    mdbBtn,
  },
  data() {
    return {
      posts: [],
      errors: [],
    };
  },
  // Fetches posts when the component is created.
  created() {
    axios
      .get(`http://localhost:8081/guess/k/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        this.posts = response.data;
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
.katalog{
	margin: 20px;
	justify-content: center;
}
</style>
