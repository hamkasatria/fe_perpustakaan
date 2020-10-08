<template>
  <div>
  <Cards/>
  <div class="katalog">
    <Cards/>
    <h1>This is an KATALOG page</h1>

     <ul v-if="posts && posts.length">
    <li v-for="post of posts" v-bind:key="post.id">
      <p><strong>{{post.judul}}</strong></p>
      <p>{{post.author}} - {{post.tahun}}</p>
      <p>{{post.sinopsis}}</p>
    </li>
  </ul>

  <ul v-if="errors && errors.length">
    <li v-for="error of errors" v-bind:key="error.id">
      {{error.message}}
    </li>
  </ul>
  <mdb-card>
    <mdb-card-image src="https://mdbootstrap.com/img/Photos/Horizontal/Nature/4-col/img%20%286%29.jpg" alt="Card image cap"></mdb-card-image>
    <mdb-card-body>
      <mdb-card-title>Basic card</mdb-card-title>
      <mdb-card-text>Some quick example text to build on the card title and make up the bulk of the card's content.</mdb-card-text>
      <mdb-btn color="primary">Button</mdb-btn>
    </mdb-card-body>
  </mdb-card>
  </div>
  </div>
</template>

<script>
import axios from 'axios';
import Cards from '../components/Cards'
export default {
  components:{
    Cards
  },
  data() {
    return {
      posts: [],
      errors: []
    }
  },

  // Fetches posts when the component is created.
  created() {
    axios.get(`http://localhost:8081/guess/k/`)
    .then(response => {
      // JSON responses are automatically parsed.
      this.posts = response.data
    })
    .catch(e => {
      this.errors.push(e)
    })
  }
}
</script>
