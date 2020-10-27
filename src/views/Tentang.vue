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
      <b-carousel-slide
        caption="First slide"
        text="Nulla vitae elit libero, a pharetra augue mollis interdum."
        img-src="img/header-2.jpg"
      ></b-carousel-slide>

      <!-- Slides with custom text -->
      <b-carousel-slide img-src="img/header.jpg">
        <h1>Hello world!</h1>
      </b-carousel-slide>


      <!-- Slides with img slot -->
      <!-- Note the classes .d-block and .img-fluid to prevent browser default image alignment -->
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
    </b-carousel>
  </div>
<!-- akhir dari gambar -->
<!-- menjelaskan tentng praxis -->
<div class="paragraf">
  </div>
<p>
<b-row>
<b-col> </b-col>
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
</b-row>
</p>
</div>
<!-- <Keterangan/> -->
</div>
</template>

<script>
// import Keterangan from "../components/Keterangan";
export default {
components: {
// Keterangan
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
</style>

