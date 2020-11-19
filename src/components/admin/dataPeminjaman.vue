<template>
  <div>
    <!-- main table daa pengguna -->
    <b-container fluid>
      <center>
        <h1 style="padding-top:80px;">DATA PEMINJAMAN</h1>
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
              pill
              title="Tambah Katalog"
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
      <br />
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
            <b-button-toolbar>
              <b-button
                pill
                title="Detail Data"
                size="sm"
                @click="row.toggleDetails"
                class="mr-1 bg-primary"
              >
                <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                pill
                size="sm"
                class="mr-1 bg-primary"
                @click="buku_kembali(row.item.id)"
              >
                <b-icon icon="arrow-left-circle" aria-hidden="true"
                  >kembali</b-icon
                >
              </b-button>
              <b-button
                pill
                title="Update"
                size="sm"
                @click="modal_update(row.item)"
                class="mr-1 bg-primary"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
              </b-button>
              <div v-if="!row.item.status">
                <b-button
                  pill
                  title="Hapus"
                  size="sm"
                  class="mr-1 bg-primary"
                  @click="hapus(row.item.id)"
                >
                  <b-icon icon="trash" aria-hidden="true"></b-icon>
                </b-button>
              </div>
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
      <!-- modal update -->
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
        <form>
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
        <b-button pill
          class="bg-primary"
          variant="outline-danger"
          @click="hideModal('modal_update')"
          >Cancle</b-button
        >
        <b-button pill
          class="bg-primary"
          variant="outline-warning"
          @click="updatePeminjaman()"
          >Update</b-button
        >
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
        <form ref="form">
          <b-row>
            <b-col>
              <b-form-group
                label="Peminjam :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="katalog-input"
                  v-model="newModalData.idUser"
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
                  v-model="newModalData.idKatalog"
                  required
                ></b-form-input>
                <!-- form select -->
                <!-- <b-form-select
                  v-model="newModalData.idUser"
                  :options="optionsUser"
                ></b-form-select> -->
                <!-- form select -->
              </b-form-group>
            </b-col>
            <b-col> </b-col>
          </b-row>
        </form>
        <b-button pill
          variant="outline-danger"
          class="bg-primary"
          @click="hideModal('modal_create')"
          >Cancle</b-button
        >
        <b-button pill
          variant="outline-warning"
          class="bg-primary"
          @click="createPeminjaman()"
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
        { key: "id", label: "Id", sortable: true, sortDirection: "asc" },
        { key: "idUser", label: "Id User", sortable: true },
        { key: "user.username", label: "Usernames", sortable: true },
        { key: "idKatalog", label: "Id Buku", sortable: true },
        { key: "katalog.judul", label: "Buku", sortable: true },
        { key: "tglPinjam", label: "Tanggal Peminjaman", sortable: true },
        { key: "tglKembali", label: "Tanggal Kembali", sortable: true },
        { key: "status", label: "Status", sortable: true },
        { key: "tagihan", label: "Tagihan", sortable: true },
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
      newModalData: {
        idUser: "",
        idBuku: "",
      },
      optionsUser: [],
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
      console.log(this.$store.getKatalog);
      this.optionsUser =
        //mengambil data dari vuex
        [
          { value: null, text: "Please select an option" },
          { value: "a", text: "This is First option" },
          { value: "b", text: "Selected Option" },
          { value: { C: "3PO" }, text: "This is an option with object value" },
          { value: "d", text: "This one is disabled", disabled: true },
        ];
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
    buku_kembali(id) {
      console.log("buku di kembalikan" + id);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .put(`http://localhost:8081/peminjaman/pengembalian/${id}`, config)
        .then((res) => console.log(res))
        .then(alert("buku dikembalikan"))
        .catch((err) => console.log(err));
    },
    updatePeminjaman() {
      // belum bisa update
      const params = this.modalData;
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .put(
          `http://localhost:8081/peminjaman/${this.modalData.id}`,
          params,
          config
        )
        .then((res) => console.log(res))
        .catch((err) => console.log("===", err));
      // end database
      alert("data telah di update");
      this.$refs["modal_update"].hide();
    },
    createPeminjaman() {
      console.log(this.modalData);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .post("http://localhost:8081/peminjaman/", this.newModalData, config)
        .then((res) => console.log(res))
        .then(alert("akun bisa dibuat"))
        .catch((err) => console.log(err));
      this.$refs["modal_create"].hide();
    },

    hapus(id) {
      console.log("hapus id " + id);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .delete(`http://localhost:8081/peminjaman/${id}`, config)
        .then((res) =>
          // alert("data telah dihapus ")
          console.log(res)
        )
        .catch((err) => console.log("===", err));
    },
  },

  async created() {
    const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
    await axios
      .get(`http://localhost:8081/peminjaman/`,config)
      .then((response) => {
        // JSON responses are automatically parsed.
        let keys = [
          "id",
          "tglPinjam",
          "tglKembali",
          "status",
          "idUser",
          "idKatalog",
          "user",
          "katalog",
          "tagihan",
        ];
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
