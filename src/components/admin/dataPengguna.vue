<template>
  <div>
    <b-container fluid>

      <center>
        <h1 style="padding-top:80px;">DATA PENGGUNA</h1>
      </center>
      <b-row class="col-gab">
        <b-col class="col-md-4">
          <b-form-group
            label="Per-page"
            label-cols-sm="6"
            label-align-sm="left"
            label-size="sm"
            label-for="perPageSelect"
            class="mb-0 perpage-input"
          >
            <b-form-select
              class=""
              v-model="perPage"
              id="perPageSelect"
              size="sm"
              :options="pageOptions"
            ></b-form-select>
          </b-form-group>
        </b-col>
        <b-col class="col-md-7">
          <b-form-group
            label=""
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
      <b-row>
        <b-col class="col-md-12">
          <b-button-toolbar position="absolute" style="justify-content: center">
            <b-button
              title="Tambah Pengguna"
              size="lg"
              @click="modal_create"
              class="mb-0 bg-primary"
            >
              <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
            </b-button>
          </b-button-toolbar>
        </b-col>
      </b-row>
      <!-- Main table element -->
      <br>
      <div>
        <b-table
          show-empty
          small
          stacked="md"
          striped
          bordered
          hover
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
            <b-button-toolbar class="">
              <b-button
                title="Detail Data"
                size="sm"
                @click="row.toggleDetails"
                class="mr-1 bg-primary"
              >
                <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                title="Update"
                size="sm"
                @click="modal_update(row.item)"
                class="mr-1 bg-primary"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                title="Hapus Data"
                size="sm"
                class="mr-1 bg-primary"
                @click="hapus(row.item.id)"
              >
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-button-toolbar>
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
        title="Update Data"
        ref="modal_update"
        size="xl"
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
        <form class="bg-primary">
          <b-row>
            <b-col>
              <b-form-group label="Username :">
                <b-form-input
                  id="username"
                  v-model="modalData.username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nomor HP :">
                <b-form-input
                  id="noHp"
                  v-model="modalData.noHp"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email :">
                <b-form-input
                  id="email"
                  v-model="modalData.email"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <b-button
          class="bg-primary"
          variant="outline-danger"
          @click="hideModal('modal_update')"
          >Cancle</b-button
        >
        <b-button class="bg-primary" variant="outline-warning" @click="update()"
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
        <form>
          <b-row>
            <b-col>
              <b-form-group label="Username :">
                <b-form-input
                  id="username"
                  v-model="newModalData.username"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Nomor HP :">
                <b-form-input
                  id="noHp"
                  v-model="newModalData.noHp"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Email :">
                <b-form-input
                  id="email"
                  v-model="newModalData.email"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Password :">
                <b-form-input
                  id="password"
                  v-model="modalData.password"
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
        { key: "username", label: "Username", sortable: true },
        { key: "email", label: "Email", sortable: true },
        { key: "noHp", label: "noHp", sort: true },
        { key: "actions", label: "Actions" },
      ],

      items: [],
      modalData: {
        username: "",
        email: "",
        noHp: "",
        password: "",
      },
      newModalData: {
        username: "",
        email: "",
        noHp: "",
        password: "",
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
      console.log("hapus id " + id);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .delete(`http://localhost:8081/admin/${id}`, config)
        .then((res) => console.log(res))
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
      Object.assign(this.modalData, item); //ngga bisa mengirim ke sini dongg
      console.log(item.id);

      setTimeout(console.log(this.modalData), 2000);
      this.$refs["modal_update"].show();
    },
    modal_create() {
      // this.modalData="";
      this.$refs["modal_create"].show();
    },
    hideModal(modal) {
      this.$refs[modal].hide();
    },
    update() {
      //memasukkan database
      console.log("ini adalah objek" + this.modalData.username);
      const params = this.modalData;
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      console.log("ini adalah config = " + config);
      console.log("ini adalah params = " + params);
      axios
        .put(`http://localhost:8081/admin/${this.modalData.id}`, params, config)
        .then((res) =>
          alert("anda berhasil meminjam buku ").then(console.log(res))
        )
        .catch((err) => console.log("===", err));
      // end database
      alert("data telah di update");
      this.$refs["modal_update"].hide();
    },
    create_user() {
      axios
        .post("http://localhost:8081/guess/signup", this.newModalData)
        .then((res) => console.log(res))
        .then(alert("akun bisa dibuat"))
        .catch((err) => console.log(err));
      this.$refs["modal_create"].hide();
    },
    resetInfoModal() {
      // this.modalData = "";
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

.perpage-input {
  width: 90%;
}
.col-gab {
  column-count: 3;
  column-gap: 50px;
}
</style>
