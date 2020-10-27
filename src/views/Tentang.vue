<template>
<div>
<!-- paralax -->
<div class="page-header clear-filter" filter-color="orange">
<parallax
class="page-header-image"
>
</parallax>

<div>
    <b-carousel
      id="carousel-1"
      v-model="slide"
      :interval="4000"
      controls
      indicators
      background="#ababab"
      img-width="1024"
      img-height="480"
      style="text-shadow: 1px 1px 2px #333;"
      @sliding-start="onSlideStart"
      @sliding-end="onSlideEnd"
    >
      <!-- Text slides with image -->
      <b-carousel-slide class="a"
        caption="Rene Descartes"
        text="Membaca semua buku yang bagus layaknya sebuah percakapan dengan
              pemikiran terbaik di abad-abad sebelumnya."
        img-src="img/header-2.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide class="a" 
        caption="Owen Meredith"
        text="Kuasailah semua buku, tapi jangan biarkan buku menguasai Anda. 
        Membacalah untuk hidup, bukan hidup untuk membaca.."
        img-src="img/header.jpg">
      </b-carousel-slide>


      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
      <b-carousel-slide class="a"
      caption=" Joseph Addison"
      text="Jangan membaca sampai koma, tetapi bacalah sampai titik."
      img-src="img/header-2.jpg"
      ></b-carousel-slide>
    </b-carousel>
  </div>
<!-- akhir dari gambar -->
<!-- menjelaskan tentng praxis -->

<b-row>
<b-col> 
Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum,
accusantium nihil vero reiciendis, praesentium eius nemo deserunt,
atque provident asperiores non! Ipsum ut neque amet fugiat. Sint hic
impedit numquam. Lorem ipsum dolor sit amet consectetur adipisicing
elit. Ea explicabo mollitia labore veritatis magnam molestias dolor
in qui quis reprehenderit ab repellendus, dolores sint quia dolorem
rem, sunt modi quae! Lorem ipsum dolor sit amet, consectetur
adipisicing elit. Ducimus cumque laborum quisquam totam unde!
Mollitia eveniet quae non vitae id, iure dolorem obcaecati ex
molestiae. Eveniet placeat exercitationem officiis corrupti. Lorem
ipsum dolor sit amet consectetur, adipisicing elit. In ullam
architecto nihil nobis, atque ratione, quam quisquam corrupti
aspernatur deleniti praesentium nemo incidunt ipsam, debitis
pariatur totam animi fuga hic. Lorem ipsum dolor sit amet
consectetur adipisicing elit. Accusantium ad doloremque sed
perferendis dolore fugit error ea? Provident, praesentium? In at
quaerat rem nesciunt possimus ipsum, provident dicta iste incidunt.
Lorem ipsum dolor, sit amet consectetur adipisicing elit. Fugiat aut
dicta neque quia iure recusandae beatae nihil pariatur voluptatem,
magnam nesciunt maxime exercitationem nostrum voluptatum vero amet
iusto illo. Facere! Lorem ipsum dolor sit amet consectetur
adipisicing elit. Voluptas adipisci autem aliquid molestiae! Error
repudiandae deleniti, doloremque fugiat architecto eaque sit
recusandae quae dignissimos quibusdam placeat animi amet, laborum
ipsum! Lorem, ipsum dolor sit amet consectetur adipisicing elit.
Aliquam magni porro ea iusto animi ducimus, nesciunt nam doloribus
dolorum perferendis et culpa minus quisquam reprehenderit?
Laudantium aliquam laborum nihil saepe.
</b-col>
</b-row>
<tentang/>

</div>
</div>
</template>

<script>
// import Keterangan from "../components/Keterangan";
import tentang from "../components/tentang2";
export default {
components: {
// Keterangan
tentang
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
margin-right: 20px;
margin-left: 20px;
justify-content: center;
}
.a{
  height: 500px;
}
</style>
