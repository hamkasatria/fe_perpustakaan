<template>
  <div class="container">
    <!-- main table daa pengguna -->
    <b-container fluid>
      <h1>DATA PEMINJAMAN</h1>
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
      <b-button size="sm" @click="modal_create">Tambah Katalog</b-button>
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
          @row-clicked="makan()"
        >
          <!-- ini adalah button -->
          <template v-slot:cell(actions)="row">
            <b-button size="sm" @click="row.toggleDetails">
              {{ row.detailsShowing ? "Hide" : "Show" }} Details
            </b-button>
            <b-button size="sm" @click="modal_update(row.item)" class="mr-1">
              update
            </b-button>

            <b-button size="sm" class="mr-1" @click="buku_kembali(row.item.id)">kembali</b-button>
            <b-button size="sm" class="mr-1" @click="hapus(row.item.id)">hapus</b-button>
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
      <!-- Info modal -->
      <b-modal
        centered
        size="xl"
        ref="modal_update"
        :id="infoModal.id"
        :title="infoModal.title"
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group
                label="Peminjam :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="katalog-input"
                  v-model="modalData.idUser"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Buku yang di pinjam :"
                label-for="katalog-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="katalog-input"
                  v-model="modalData.idKatalog"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Status :"
                label-for="status-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="status-input"
                  v-model="modalData.status"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <!-- <pre>{{ infoModal.content }}</pre> -->
      </b-modal>

      <!-- modal create -->
      <b-modal
        centered
        size="xl"
        ref="modal_create"
        :id="infoModal.id"
        :title="infoModal.title"
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
         <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group
                label="Peminjam :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="katalog-input"
                  v-model="modalData.idUser"
                 
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Buku yang di pinjam :"
                label-for="katalog-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="katalog-input"
                  v-model="modalData.idKatalog"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Status :"
                label-for="status-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="status-input"
                  v-model="modalData.status"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <b-button variant="outline-danger" @click="hideModal('modal_create')"
          >Cancle</b-button
        >
        <b-button variant="outline-warning" @click="createKatalog()"
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
        { key: "id", label: "Id", sortable: true, sortDirection: "desc" },
        { key: "idUser", label: "Id User", sort: true },
        { key: "user.username", label: "Usernames", sort: true },
        { key: "idKatalog", label: "Id Buku", sort: true },
        { key: "katalog.judul", label: "Buku", sort: true },
        { key: "status", label: "Status", sort: true },
        { key: "actions", label: "Actions" },
      ],
      items: [],
      modalData: {
        // idKatalog:"",
        // idUser:"",
        // user:{},
        // katalog:{}
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
      Object.assign(this.modalData, item);
      console.log(this.modalData);
      this.$refs["modal_update"].show();
    },
    modal_create() {
      this.$refs["modal_create"].show();
    },
    hideModal(modal) {
      this.$refs[modal].hide();
    },
    resetInfoModal() {
      this.infoModal.title = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    buku_kembali(id){
      console.log("buku di kembalikan"+id)
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .put(`localhost:8081/peminjaman/pengembalian/${id}`, config)
        .then((res) => console.log(res))
        .then(alert("buku dikembalikan"))
        .catch((err) => console.log(err));
    },
    hapus(id) {
      console.log("hapus id "+id)
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .delete(`http://localhost:8081/peminjaman/${id}`, config)
        .then((res) =>
          // alert("data telah dihapus ")
          (console.log(res))
        )
        .catch((err) => console.log("===", err));
    },
  },

  async created() {
    await axios
      .get(`http://localhost:8081/peminjaman/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        let keys = ["id", "status", "idUser", "idKatalog", "user", "katalog"];
        let entries = this.filterData(response.data, keys);
        entries.map((entry) => this.items.push(entry));
        // this.items = response.data;
        // this.$store.commit("setpengguna", this.posts);
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
