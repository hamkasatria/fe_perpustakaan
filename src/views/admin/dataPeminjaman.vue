<template>
  <mdb-container>
    <mdb-datatable-2 v-model="data"  striped bordered arrows :display="3" />
    <mdb-input class="mt-0" v-model="search" label="Search by username" />
  </mdb-container>
</template>

<script>
import { mdbDatatable2, mdbContainer } from "mdbvue";

export default {
  components: {
    mdbDatatable2,
    mdbContainer,
  },
  data() {
    return {
      columns: [
        { field: "id", label: "ID", sort: true },
        { field: "status", label: "Status", sort: true },
        { field: "idUser", label: "ID User", sort: true },
      //   { field: "noHp", label: "noHp", sort: true },
      //   { field: "updatedAt", label: "Tanggal Update", sort: true },
      //   { label: "Action", sort:false}
      ],
      rows: [],
    };
  },
  computed: {
    data() {
      return {
        columns: this.columns,
        rows: this.rows,
      };
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
  },
  mounted() {
    fetch("http://localhost:8081/peminjaman/")
      .then((res) => res.json())
      .then((json) => {
        let keys = ["id", "status"];
        let entries = this.filterData(json, keys);
        //rows
        entries.map((entry) => this.rows.push(entry));
      })
      .catch((err) => console.log(err));
  },
};
</script>
