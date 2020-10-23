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
            <b-button
              size="sm"
              @click="info(row.item, row.index, $event.target)"
              class="mr-1"
            >
              update
            </b-button>

            <b-button size="sm" class="mr-1">hapus</b-button>
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
        :id="infoModal.id"
        :title="infoModal.title"
        update-only
        @hide="resetInfoModal"
      >
        <form ref="form" @submit.stop.prevent="handleSubmit">
          <b-row>
            <b-col>
              <b-form-group
                :state="nameState"
                label="Username :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="name-input"
                  v-model="name"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group
                :state="nameState"
                label="Nomor HP :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="name-input"
                  v-model="name"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group
                :state="nameState"
                label="Email :"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-input
                  id="name-input"
                  v-model="name"
                  :state="nameState"
                  required
                ></b-form-input>
              </b-form-group>
            </b-col>
          </b-row>
        </form>
        <!-- <pre>{{ infoModal.content }}</pre> -->
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
        { key: "status", label: "Status", sort: true },
        { key: "idUser", label: "Id User", sort: true },
        { key: "idKatalog", label: "Id Katalog", sort: true },
        { key: "actions", label: "Actions" },
      ],
      items: [],
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
    makan() {
      alert("mencoba on click raw");
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
    info(item, index, button) {
      this.infoModal.title = `Row index: ${index}`;
      this.infoModal.content = JSON.stringify(item, null, 2);
      this.$root.$emit("bv::show::modal", this.infoModal.id, button);
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
  },

  async created() {
    await axios
      .get(`http://localhost:8081/peminjaman/`)
      .then((response) => {
        // JSON responses are automatically parsed.
        let keys = ["id", "status", "idUser", "idKatalog"];
        let entries = this.filterData(response.data, keys);
        entries.map((entry) => this.items.push(entry));
        // this.items = response.data;
        this.$store.commit("setpengguna", this.posts);
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
