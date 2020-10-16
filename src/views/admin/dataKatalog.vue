<template>
  <mdb-container>
    <mdb-datatable-2 v-model="data" striped bordered arrows :display="3" />
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
        { field: "judul", label: "Judul", sort: true },
        { field: "author", label: "Author", sort: true },
        { field: "tahun", label: "tahun", sort: true },
        { field: "sinopsis", label: "Sinopsis", sort: true },
        // { label: "Action", sort:false}
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
    fetch("http://localhost:8081/katalog/")
      .then((res) => res.json())
      .then((json) => {
        let keys = ["id"];
        let entries = this.filterData(json, keys);
        //rows
        entries.map((entry) => this.rows.push(entry));
      })
      .catch((err) => console.log(err));
  },
};
</script>
