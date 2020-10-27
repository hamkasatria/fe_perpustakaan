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
<<<<<<< HEAD
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
=======
      <b-carousel-slide class="a"
        caption="Rene Descartes"
        text="Membaca semua buku yang bagus layaknya sebuah percakapan dengan
              pemikiran terbaik di abad-abad sebelumnya."
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
        img-src="img/header-2.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
<<<<<<< HEAD
      <b-carousel-slide img-src="img/header.jpg">
        <h1>Hello world!</h1>
=======
      <b-carousel-slide class="a" 
        caption="Owen Meredith"
        text="Kuasailah semua buku, tapi jangan biarkan buku menguasai Anda. 
        Membacalah untuk hidup, bukan hidup untuk membaca.."
        img-src="img/header.jpg">
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
      </b-carousel-slide>


      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
<<<<<<< HEAD
      <b-carousel-slide>
        <template #img>
          <img
            class="d-block img-fluid w-100"
            width="1024"
            height="480"
            src="https://picsum.photos/1024/480/?image=55"
            alt="image slot"
          >
        </template>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse eros felis, tincidunt
          a tincidunt eget, convallis vel est. Ut pellentesque ut lacus vel interdum.
        </p>
      </b-carousel-slide>
=======
      <b-carousel-slide class="a"
      caption=" Joseph Addison"
      text="Jangan membaca sampai koma, tetapi bacalah sampai titik."
      img-src="img/header-2.jpg"
      ></b-carousel-slide>
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
    </b-carousel>
  </div>
<!-- akhir dari gambar -->
<!-- menjelaskan tentng praxis -->
<<<<<<< HEAD
<div class="paragraf">
  </div>
<p>
<b-row>
<b-col> </b-col>
=======

<b-row>
<b-col> 
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
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
<<<<<<< HEAD
</b-row>
</p>
</div>
<!-- <Keterangan/> -->
=======
</b-col>
</b-row>
<tentang/>

</div>
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
</div>
</template>

<script>
// import Keterangan from "../components/Keterangan";
import tentang from "../components/tentang2";
export default {
components: {
// Keterangan
<<<<<<< HEAD
=======
tentang
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
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
<<<<<<< HEAD
}
</style>

=======
}
.a{
  height: 500px;
}
</style>
>>>>>>> d5e44ac11ab2f175c2866525a05080044d5a795a
