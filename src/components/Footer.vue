<template>
  <div>
    <!-- Footer -->
    <mdb-footer
      color="stylish-color-dark"
      class="page-footer font-small pt-4 fot background_color"
    >
      <mdb-container class="text-left">
        <mdb-row>
          <mdb-col md="6">
            <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">
              Praxis Academy
            </h5>
            <p>
              Bima Hackers' Village<br>
              Jl. Pakem - Kalasan, Area Sawah, Bimomartani, Kec. Ngemplak, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55584
            </p>
          </mdb-col>
          <hr class="clearfix w-100 d-md-none" />
          <mdb-col md="2">

          </mdb-col>
          <hr class="clearfix w-100 d-md-none" />

          <hr class="clearfix w-100 d-md-none" />
          <mdb-col md="2">
            <h5 class="text-uppercase mb-4 mt-3 font-weight-bold">
              Hubungi Kami
            </h5>
            <ul class="list-unstyled text-center">
              <li>Telephone</li>
              <li>Fax</li>
              <li>Email</li>
            </ul>
          </mdb-col>
        </mdb-row>
      </mdb-container>
      <hr />
      <div class="text-center" style="white">
        <div class="">
          <div class="oo">
            <div class="d-flex">
              <a
                class="nav-link"
                style="color:black;"
                rel="tooltip"
                title="Ikuti kami di Github"
                data-placement="bottom"
                href="https://github.com/praxis-academy"
                target="_blank"
              >
                <i class="fab fa-github"></i>
                <p class="d-lg-none d-xl-none">Github</p>
              </a>
              <a
                class="nav-link"
                style="color: black"
                rel="tooltip"
                title="Ikuti kami di Facebook"
                data-placement="bottom"
                href="https://www.facebook.com/praxisacademy.id/"
                target="_blank"
              >
                <i class="fab fa-facebook-square"></i>
                <p class="d-lg-none d-xl-none">Facebook</p>
              </a>
              <a
                class="nav-link"
                style="color: black"
                rel="tooltip"
                title="Ikuti kami di Instagram"
                data-placement="bottom"
                href="https://www.instagram.com/praxisacademy/"
                target="_blank"
              >
                <i class="fab fa-instagram"></i>
                <p class="d-lg-none d-xl-none">Instagram</p>
              </a>
              <a
                class="nav-link"
                style="color: black"
                rel="tooltip"
                title="Ikuti kami di Twitter"
                data-placement="bottom"
                href="https://twitter.com/PraxisAcademyId"
                target="_blank"
              >
                <i class="fab fa-twitter"></i>
                <p class="d-lg-none d-xl-none">Twitter</p>
              </a>
            </div>
          </div>
        </div>
        <div class="footer-copyright text-center py-3">
          <mdb-container fluid>
            &copy; 2020 Copyright: Perpus Praxis.
          </mdb-container>
        </div>
      </div>
    </mdb-footer>
    <!-- Footer -->
  </div>
</template>

<script>
import { mdbFooter, mdbContainer, mdbRow, mdbCol } from "mdbvue";
export default {
  name: "FooterPage",
  components: {
    mdbFooter,
    mdbContainer,
    mdbRow,
    mdbCol,
  },
};
</script>

<style scoped>
.covv {
  border: 1px solid #000;
  /* background-color: #6699ff; */
}
.background_color {
  background-color: #f96332;
}
.margin {
  margin: 10px 10px 10px 10px;
  border: 1px solid #000;
}
.oo {
  margin: auto 0;
  display: flex;
  justify-content: center;
}
.fot{
  margin-top: 90px;
}
</style>
