<template>
  <div>
    <!-- memanggil navbar yang ada -->
    <navbarAdmin/>
  </div>
</template>

<script>
import navbarAdmin from "@/components/Admin_Navbar"
//  import Keterangan from "../components/Keterangan";
export default {
  
  components:{
    // Keterangan
    navbarAdmin
  }
}
</script>

<style scoped>
.mm{
  margin-top: 50%;
}
.mgambar{
  margin-top: 2%;
}

.paragraf{
  margin-right: 20px;
  margin-left: 20px ;
  justify-content: center;
}
</style>
