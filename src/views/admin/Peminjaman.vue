<template>
  <div>
    <!-- memanggil navbar yang ada -->
    <navbarAdmin/>
    <peminjaman/>
  </div>
</template>

<script>
import navbarAdmin from "@/components/Admin_Navbar"
import peminjaman from "@/components/admin/dataPeminjaman"

export default {
  
  components:{
    // Keterangan
    navbarAdmin,
    peminjaman
  }
}
</script>