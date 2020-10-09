<template>
<div>

  <!-- Footer -->
  <mdb-footer color="stylish-color-dark" class="page-footer font-small pt-4 mt-4 background_color">
    <mdb-container class="text-left">
      <mdb-row>
        <mdb-col md="6">
          <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Praxis Academy</h5>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente, adipisci perspiciatis error, consequuntur rem exercitationem qui quae nulla quisquam, corrupti ex laudantium dolor est beatae veritatis? Maiores tempore iste nihil? 
          </p>
        </mdb-col>
        <hr class="clearfix w-100 d-md-none" />
        <mdb-col md="2">
          <h5 class=" mb-4 mt-3 font-weight-bold">Links1</h5>
          <ul class="" >
            <li><a href="#!">Link 1</a></li>
            <li><a href="#!">Link 2</a></li>
            <li><a href="#!">Link 3</a></li>
            <li><a href="#!">Link 4</a></li>
          </ul>
        </mdb-col>
        <hr class="clearfix w-100 d-md-none" />

        <hr class="clearfix w-100 d-md-none" />
        <mdb-col md="2">
          <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">Hubungi Kami</h5>
          <ul class="list-unstyled">
            <li>Email</li>
            <li>Link</li>
            <li>Pesan</li>
          </ul>
        </mdb-col>
      </mdb-row>
    </mdb-container>
    <hr />
    <div class="text-center">
      <ul class="list-unstyled list-inline">
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-fb mx-1"><i class="fab fa-facebook"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-tw mx-1"><i class="fab fa-twitter"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-gplus mx-1"><i class="fab fa-google-plus"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-li mx-1"><i class="fab fa-linkedin-in"> </i></a></li>
        <li class="list-inline-item"><a class="btn-floating btn-sm btn-dribbble mx-1"><i class="fab fa-dribbble"> </i></a></li>
      </ul>
    </div>
    <div class="footer-copyright text-center py-3">
      <mdb-container fluid>
        &copy; 2020 Copyright:  praxis_aja
      </mdb-container>
    </div>
  </mdb-footer>
  <!-- Footer -->
</div>
</template>

<script>
  import { mdbFooter, mdbContainer, mdbRow, mdbCol } from 'mdbvue';
  export default {
      name: 'FooterPage',
    components: {
      mdbFooter,
      mdbContainer,
      mdbRow,
      mdbCol
    }
  }
</script>

<style scoped>
.covv {
    border: 1px solid #000;
  /* background-color: #6699ff; */
}
.background_color{
    background-color: #F96332;
}
.margin {
  margin: 10px 10px 10px 10px;
  border: 1px solid #000;
}
</style>