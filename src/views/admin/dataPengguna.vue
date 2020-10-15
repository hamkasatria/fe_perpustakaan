<template>
  <mdb-container>
    <mdb-datatable-2 v-model="data"  striped bordered arrows :display="3" />
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
        { field: "username", label: "Username", sort: true },
        { field: "email", label: "Email", sort: true },
        { field: "noHp", label: "noHp", sort: true },
        { field: "updatedAt", label: "Tanggal Update", sort: true },
        { label: "Action", sort:false}
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
    fetch("http://localhost:8081/admin/")
      .then((res) => res.json())
      .then((json) => {
        let keys = ["id", "username", "noHp","email","updatedAt"];
        let entries = this.filterData(json, keys);
        //rows
        entries.map((entry) => this.rows.push(entry));
      })
      .catch((err) => console.log(err));
  },
};
</script>
