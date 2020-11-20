<template>
  <div>
    <b-container fluid>
      <center>
        <h1 style="padding-top:80px;">DATA KATALOG</h1>
      </center>
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
          <b-col class="col-md-12">
            <b-button-toolbar
              position="absolute"
              style="justify-content: center"
            >
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
                  title="Update"
                  size="sm"
                  @click="modal_update(row.item)"
                  class="mr-1 bg-primary"
                >
                  <b-icon icon="pencil" aria-hidden="true"></b-icon>
                </b-button>
                <b-button
                  pill
                  title="Hapus"
                  size="sm"
                  class="mr-1 bg-primary"
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
          <b-button
            pill
            class="bg-primary"
            variant="outline-danger"
            @click="hideModal('modal_update')"
            >Cancle</b-button
          >
          <b-button
            pill
            class="bg-primary"
            variant="outline-warning"
            @click="updateKatalog()"
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
          <b-button
            pill
            class="bg-primary"
            variant="outline-danger"
            @click="hideModal('modal_create')"
            >Cancle</b-button
          >
          <b-button
            pill
            class="bg-primary"
            variant="outline-warning"
            @click="createKatalog()"
            >Create</b-button
          >
        </b-modal>
      </b-card>
    </b-container>
    <!-- menambahkan tambah data -->
  </div>
</template>

<script>
import axios from "axios";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      fields: [
        { key: "id", label: "ID", sortable: true, sortDirection: "desc" },
        { key: "judul", label: "Judul", sortable: true },
        { key: "author", label: "Author", sortable: true },
        { key: "tahun", label: "Tahun", sortable: true },
        { key: "jumlah", label: "Jumlah", sortable: true },
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
        .post("http://localhost:8081/katalog/", this.newModalData, config)
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
      // menghapus
      Swal.fire({
        title: "Apakah anda akan menghapus data ini?",
        
        showCancelButton: true,
        confirmButtonText: `Hapus`,
        
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8081/katalog/${id}`, config)
            .then((res) => {
              Swal.fire("Data Dihapus!", "", "success");
              console.log(res);
            })
            .catch((err) => console.log("===", err));
        } else if (result.isDenied) {
          Swal.fire("Data Tidak dihapus", "", "info");
        }
      });
      // menghapus
    },
  },

  async created() {
    //tambahan
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
        if (respon.data.roles[0].name == "ROLE_ADMIN") {
          const config = {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("Bearer"),
            },
          };
          axios
            .get(`http://localhost:8081/katalog/`, config)
            .then((response) => {
              // JSON responses are automatically parsed.
              let keys = [
                "id",
                "judul",
                "author",
                "tahun",
                "sinopsis",
                "jumlah",
              ];
              let entries = this.filterData(response.data, keys);
              entries.map((entry) => this.items.push(entry));
              this.totalRows = this.items.length;
              // console.log(this.items.length);
              // this.items = response.data;
              // this.$store.commit("setpengguna", this.posts);
            })
            .catch((e) => {
              this.errors.push(e);
            });

          // eslint-disable-next-line no-constant-condition
        } else if (respon.data.roles[0].name == "ROLE_USER") {
          //bisa menggunakan clear

          this.$router.push({ path: "/" });
        } else {
          localStorage.removeItem("Bearer");
          this.$router.push({ path: "/tentang" });
        }
      });
    }

    // tambahan
  },
};
</script>

<style scoped>
.container {
  margin: 50px;
}
</style>
