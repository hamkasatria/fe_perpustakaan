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
              <mdb-btn @click="modal" class="btn btn-info" @click.native="modals.classic = true" >Info</mdb-btn>
              <mdb-btn color="primary">Pinjam</mdb-btn>
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

    <modal :show.sync="modals.classic" headerClasses="justify-content-center">
      <h4 slot="header" class="title title-up">Modal title</h4>
      <p>
        Far far away, behind the word mountains, far from the countries Vokalia
        and Consonantia, there live the blind texts. Separated they live in
        Bookmarksgrove right at the coast of the Semantics, a large language
        ocean. A small river named Duden flows by their place and supplies it
        with the necessary regelialia. It is a paradisematic country, in which
        roasted parts of sentences fly into your mouth.
      </p>
      <template slot="footer">
        <n-button>Nice Button</n-button>
        <n-button type="danger" @click.native="modals.classic = false"
          >Close</n-button
        >
      </template>
    </modal>

    <n-button type="primary" @click.native="modals.classic = true">
      Launch Modal trial
    </n-button>
  </div>
</template>
<script>
import axios from "axios";

import { Button, Modal, FormGroupInput } from '@/components';
import { Popover, Tooltip, DatePicker } from 'element-ui';
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
    [FormGroupInput.name]: FormGroupInput
  },
  data() {
    return {
      posts: [],
      errors: [],
      modals: {
        classic: false,
        mini: false
      },
      pickers: {
        datePicker: ''
      }
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
  modal() {
    //mengeluarkan card
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
