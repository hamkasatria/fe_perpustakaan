<template>
  <div class="container">
    <b-container fluid>
      <h1 style="padding-top:20px;">DATA KATALOG</h1>
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
      <!-- <b-button size="sm" @click="modal_create">Tambah Katalog</b-button> -->
      <b-button-toolbar>
        <b-button
          title="Tambah Pengguna"
          size="sm"
          @click="modal_create"
          class="mr-1"
        >
          <b-icon icon="plus-circle" aria-hidden="true"></b-icon>
        </b-button>
      </b-button-toolbar>
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
                title="Detail Data"
                size="sm"
                @click="row.toggleDetails"
                class="mr-1"
              >
                <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                title="Update"
                size="sm"
                @click="modal_update(row.item)"
                class="mr-1"
              >
                <b-icon icon="pencil" aria-hidden="true"></b-icon>
              </b-button>
              <b-button
                title="Hapus"
                size="sm"
                class="mr-1"
                @click="hapus(row.item.id)"
              >
                <b-icon icon="trash" aria-hidden="true"></b-icon>
              </b-button>
            </b-button-toolbar>
          </template>
          <!-- nmenampilkan detail -->
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
        update-only
        @hide="resetInfoModal"
        hide-footer
      >
        <form>
          <b-row>
            <b-col>
              <b-form-group
                label="Judul :"
                label-for="judul-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="judul-input"
                  v-model="modalData.judul"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Author :"
                label-for="author-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="author-input"
                  v-model="modalData.author"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Tahun :"
                label-for="tahun-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="tahun-input"
                  v-model="modalData.tahun"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Jumlah :"
                label-for="jumlah-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="jumlah-input"
                  v-model="modalData.jumlah"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Sinopsis :"
                label-for="sinopsis-input"
                invalid-feedback="Name is required"
              >
                <b-form-textarea
                  placeholder="Tall textarea"
                  rows="50"
                  id="sinopsis-input"
                  v-model="modalData.sinopsis"
                  required
                ></b-form-textarea>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <b-button variant="outline-danger" @click="hideModal('modal_update')"
          >Cancle</b-button
        >
        <b-button variant="outline-warning" @click="updateKatalog()"
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
        <form>
          <b-row>
            <b-col>
              <b-form-group
                label="Judul :"
                label-for="judul-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="judul-input"
                  v-model="newModalData.judul"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Author :"
                label-for="author-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="author-input"
                  v-model="newModalData.author"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Tahun :"
                label-for="tahun-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="tahun-input"
                  v-model="newModalData.tahun"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Jumlah :"
                label-for="jumlah"
                invalid-feedback="Jumlah is required"
              >
                <b-form-input
                  id="jumlah"
                  v-model="newModalData.jumlah"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                label="Sinopsis :"
                label-for="sinopsis-input"
                invalid-feedback="Name is required"
              >
                <b-form-textarea
                  rows="50"
                  id="sinopsis-input"
                  v-model="newModalData.sinopsis"
                  required
                ></b-form-textarea>
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
    <!-- menambahkan tambah data -->
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "judul", label: "Judul", sort: true },
        { key: "author", label: "Author", sort: true },
        { key: "tahun", label: "Tahun", sort: true },
        { key: "jumlah", label: "Jumlah", sort: true },
        { key: "actions", label: "Actions" },
      ],
      items: [],

      modalData: {
        judul: "",
        author: "",
        tahun: "",
        jumlah: "",
        sinopsis: "",
      },
      newModalData: {
        judul: "",
        author: "",
        tahun: "",
        jumlah: "",
        sinopsis: "",
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
      this.updateKatalog = "";
      this.infoModal.content = "";
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    updateKatalog() {
      // belum bisa update
      const params = this.modalData;
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .put(
          `http://localhost:8081/katalog/${this.modalData.id}`,
          params,
          config
        )
        .then((res) => console.log(res))
        .catch((err) => console.log("===", err));
      // end database
      alert("data telah di update");
      this.$refs["modal_update"].hide();
    },
    createKatalog() {
      console.log(this.modalData);
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios
        .post("http://localhost:8081/katalog/", this.modalData, config)
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
        .delete(`http://localhost:8081/katalog/${id}`, config)
        .then((res) =>
          // alert("data telah dihapus ")
          console.log(res)
        )
        .catch((err) => console.log("===", err));
    },
  },

  async created() {
    await axios
      .get(`http://localhost:8081/katalog/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        let keys = ["id", "judul", "author", "tahun", "sinopsis", "jumlah"];
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
