<template>
  <div>
    <b-container fluid>
      <div>
        <center>
          <h1 style="padding-top:80px;">DATA PEMINJAMAN</h1>
        </center>
        <b-row>
          <b-col class="col-md-3">
            <b-card class="">
              <center>
                Total Tagihan
              </center>
              <div class="form-group" style="padding-top:20px;">
                <input
                  readonly
                  type="text"
                  class="form-control"
                  placeholder="Tagihan"
                  v-model="totalTagihan"
                />

                <small id="emailHelp" class="form-text text-muted"
                  >* pengembalian lebih dari 7 hari akan dikenakan denda
                  5000</small
                >
              </div>
            </b-card>
          </b-col>

          <b-col class="col-md-9">
            <b-card>
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
                <b-col class="col-md-12"> </b-col>
              </b-row>
              <!-- main table -->

              <!-- buku yang masih di pinjam -->
              <br />

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
                      class="mr-1 bg-primary"
                    >
                      <b-icon icon="chevron-down" aria-hidden="true"></b-icon>
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
            </b-card>
          </b-col>
        </b-row>
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "Id", sortable: true, sortDirection: "asc" },
        // { key: "idUser", label: "Id User", sortable: true },
        // { key: "user.username", label: "Usernames", sortable: true },
        // { key: "idKatalog", label: "Id Buku", sortable: true },
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
      totalTagihan: "",
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

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
  },

  async created() {
    // eslint-disable-next-line no-constant-condition
    if (localStorage.getItem("Bearer") === null) {
      this.$router.push({ path: "/" });
    } else {
      const config = {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("Bearer"),
        },
      };
      axios.get("http://localhost:8081/user/", config).then((respon) => {
        this.$store.commit("setPersonalUser", respon.data);
        console.log(
          "username nya " + this.$store.getters.getPersonalUser.username
        );
        if (respon.data.roles[0].name == "ROLE_USER") {
          axios
            .get("http://localhost:8081/user/peminjaman/", config)
            .then((respon) => {
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
              let entries = this.filterData(respon.data, keys);
              entries.map((entry) => this.items.push(entry));
              this.totalRows = this.items.length;
              this.totalTagihan = this.items.reduce((a, c) => a + c.tagihan, 0);
              console.log(this.totalTagihan);
            })
            .catch((e) => {
              this.errors.push(e);
            });

          // eslint-disable-next-line no-constant-condition
        } else if (respon.data.roles[0].name == "ROLE_ADMIN") {
          //bisa menggunakan clear
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            
          });
          this.$router.push({ path: "/dataPengguna" });
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Something went wrong!",
            
          });
          localStorage.removeItem("Bearer");
          this.$router.push({ path: "/tentang" });
        }
      });
    }
  },
};
</script>

<style scoped>
b-card {
  border-radius: 35px;
}
</style>
