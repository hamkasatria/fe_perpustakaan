<template>
  <div>
    <!-- paralax -->
    <div>
      <div>
        <b-carousel
          id="carousel-1"
          
          :interval="4000"
          controls
          indicators
          img-width="1024"
          img-height="480"
          style="text-shadow: 1px 1px 2px #333;"
        >
          <!-- Text slides with image -->

          <b-carousel-slide class="a" img-src="img/header-2.jpg">
            <h3>Rene Descartes</h3>
            <p>
              Membaca semua buku yang bagus layaknya sebuah percakapan dengan
              pemikiran terbaik di abad-abad sebelumnya
            </p>
          </b-carousel-slide>

          <!-- Slides with custom text -->
          <b-carousel-slide class="a" img-src="img/header.jpg">
            <h3>Owen Meredith</h3>
            <p>
              Kuasailah semua buku, tapi jangan biarkan buku menguasai Anda.
              Membacalah untuk hidup, bukan hidup untuk membaca
            </p>
          </b-carousel-slide>

          <!-- Slides with img slot -->
          <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
          <b-carousel-slide class="a" img-src="img/bg6.jpg">
            <h3>Joseph Addison</h3>
            <p>Jangan membaca sampai koma, tetapi bacalah sampai titik</p>
          </b-carousel-slide>
        </b-carousel>
      </div>
      <!-- akhir dari gambar -->
      <!-- menjelaskan tentng praxis -->
    </div>
    <tentang />
  </div>
</template>

<script>
// import Keterangan from "../components/Keterangan";
import tentang from "../components/Tentang2";
export default {
  components: {
    // Keterangan
    tentang,
  },
};
</script>

<style scoped>
.mm {
  margin-top: 50%;
}
.mgambar {
  margin-top: 2%;
}

.paragraf {
  margin-right: auto;
  margin-left: auto;
  justify-content: center;
}
.a {
  height: 700px;
  font-weight: bold;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}
p {
  color: rgb(0, 0, 0);
  text-align: justify;
}
h3 {
  color: rgb(0, 0, 0);
}
.k {
  text-align: center;
  font-weight: bold;
}
.kk {
  margin-top: 20pt;
}
.y {
  padding-inline: inherit;
}
</style>
