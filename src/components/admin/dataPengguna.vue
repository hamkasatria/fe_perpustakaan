<template>
  <div class="container">
    <!-- main table daa pengguna -->
    <b-container fluid>
      <h1>DATA PENGGUNA</h1>
      <b-row>
        <b-col sm="5" md="6" class="my-1">
          <b-form-group
            label="Per page"
            label-cols-sm="6"
            label-cols-md="4"
            label-cols-lg="2"
            label-align-sm="center"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0"
          >
            <b-form-select
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col sm="5" md="6">
          <b-form-group
            label="Search"
            label-cols-sm="3"
            label-align-sm="right"
            label-size="sm"
            label-for="filterInput"
            class="mb-0"
          >
            <b-form-input
              v-model="filter"
              type="search"
              id="filterInput"
              placeholder="Type to Search"
            ></b-form-input>
          </b-form-group>
        </b-col>
      </b-row>
      <!-- Main table element -->
      <b-button size="sm" @click="modal_create">Tambah Pengguna</b-button>
      <div>
        <b-table
          show-empty
          small
          stacked="md"
          :items="items"
          :fields="fields"
          :current-page="currentPage"
          :per-page="perPage"
          :filter="filter"
          :filter-included-fields="filterOn"
          :sort-by.sync="sortBy"
          :sort-desc.sync="sortDesc"
          :sort-direction="sortDirection"
          @filtered="onFiltered"
        >
          <!-- ini adalah button -->
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button>
            <b-button size="sm" @click="modal_update(row.item)" class="mr-1">
              update
            </b-button>

            <b-button size="sm" class="mr-1" @click="hapus(row.item.id)"
              >hapus</b-button
            >
          </template>

          <template v-slot:row-details="row">
            <b-card>
              <ul>
                <li v-for="(value, key) in row.item" :key="key">
                  {{ key }}: {{ value }}
                </li>
              </ul>
            </b-card>
          </template>
        </b-table>
      </div>

      <!-- pagnation -->
      <div lg="6" class="my-1">
        <b-pagination
          v-model="currentPage"
          :total-rows="totalRows"
          :per-page="perPage"
          align="fill"
          size="sm"
          class="my-1"
        ></b-pagination>
      </div>
      <!-- modal update-->
      <b-modal
        centered
        ref="modal_update"
        size="xl"
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
        <form @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group label="Username :">
                <b-form-input
                  id="username"
                  v-model="obj.username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nomor HP :">
                <b-form-input
                  id="noHp"
                  v-model.lazy="obj.noHp"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email :">
                <b-form-input
                  id="email"
                  v-model="obj.email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <b-button variant="outline-danger" @click="hideModal('modal_update')"
          >Cancle</b-button
        >
        <b-button variant="outline-warning" @click="update(obj)"
          >Update</b-button
        >
      </b-modal>
      <!-- create user -->
      <b-modal
        centered
        ref="modal_create"
        size="xl"
        :id="infoModal.id"
        :title="'Membuat Pengguna Baru'"
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
        <form @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group label="Username :">
                <b-form-input
                  id="username"
                  v-model="newUser.username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nomor HP :">
                <b-form-input
                  id="noHp"
                  v-model="newUser.noHp"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email :">
                <b-form-input
                  id="email"
                  v-model="newUser.email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password :">
                <b-form-input
                  
                  id="password"
                  v-model="newUser.password"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <b-button variant="outline-danger" @click="hideModal('modal_create')"
          >Cancle</b-button
        >
        <b-button variant="outline-warning" @click="create_user()"
          >Create</b-button
        >
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "username", label: "Username", sort: true },
        { key: "email", label: "Email", sort: true },
        { key: "noHp", label: "noHp", sort: true },
        { key: "actions", label: "Actions" },
      ],
      obj: [],
      items: [],
      newUser:{
        username:"",
        email:"",
        noHp:"",
        password:""
      },
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      pageOptions: [5, 10, 15],
      sortBy: "",
      sortDesc: false,
      sortDirection: "asc",
      filter: null,
      filterOn: [],
      infoModal: {
        id: "info-modal",
        title: "",
        content: "",
      },
    };
  },
  computed: {
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter((f) => f.sortable)
        .map((f) => {
          return { text: f.label, value: f.key };
        });
    },
  },
  methods: {
    hapus(id) {
      console.log("hapus id "+id)
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .delete(`http://localhost:8081/admin/u/${id}`, config)
        .then((res) =>
          alert("data telah dihapus ").then(console.log(res))
        )
        .catch((err) => console.log("===", err));
    },
    filterData(dataArr, keys) {
      let data = dataArr.map((entry) => {
        let filteredEntry = {};
        keys.forEach((key) => {
          if (key in entry) {
            filteredEntry[key] = entry[key];
          }
        });
        return filteredEntry;
      });
      return data;
    },
    modal_update(item) {
      this.infoModal.title = `Row index: ${item.id}`;
      Object.assign(this.obj, item);
      this.$refs["modal_update"].show();
    },
    modal_create() {
      this.$refs["modal_create"].show();
    },
    hideModal(modal) {
      this.$refs[modal].hide();
    },
    update(obj) {

      //memasukkan database
      console.log("ini adalah objek"+obj.username)
      const params = obj;
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      console.log("ini adalah config = "+config);
      console.log("ini adalah params = "+params);
      axios
        .put(`http://localhost:8081/admin/u/${obj.id}`, params, config)
        .then((res) =>
          alert("anda berhasil meminjam buku ").then(console.log(res))
        )
        .catch((err) => console.log("===", err));
      // end database
      alert("data telah di update");
      this.$refs["modal_update"].hide();
    },
    create_user(){
      axios
        .post("http://localhost:8081/guess/signup", this.newUser)
        .then((res) => console.log(res))
        .then(alert("akun bisa dibuat"))
        .catch((err) => console.log(err));
        this.$refs["modal_create"].hide();
    },
    resetInfoModal() {
      this.obj = "";
      this.infoModal.title = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },

  async created() {
    await axios
      .get(`http://localhost:8081/admin/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        let keys = ["id", "username", "noHp", "email", "updatedAt", "roles"];
        let entries = this.filterData(response.data, keys);
        entries.map((entry) => this.items.push(entry));
        // console.log("ini adalah created " + this.items);
        this.$store.commit("setUser", this.items);
      })
      .catch((e) => {
        this.errors.push(e);
      });

    this.totalRows = this.items.length;
  },
};
</script>

<style scoped>
.container {
  margin: 50px;
}
</style>
