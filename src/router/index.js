import Vue from 'vue'
import VueRouter from 'vue-router'
import MainNavbar from '../layout/MainNavbar.vue';
import AdminNavbar from '../layout/AdminNavbar.vue';
import MainFooter from '../layout/MainFooter.vue';
//import Index from '../pages/Index.vue';
import Katalog from '../views/Katalog.vue';
import Login from '../views/Login.vue';
import Register from '../views/register.vue';
import Tentang from '../views/Tentang.vue';
import Admin from '../views/Admin.vue';
import dataKatalog from '../views/admin/Katalog.vue';
import dataPengguna from '../views/admin/Pengguna.vue';
import dataPeminjaman from '../views/admin/Peminjaman.vue';





Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    // component: Home
    components: { default: Tentang, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/katalog',
    name: 'Katalog',
    components: { default: Katalog, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/login',
    name: 'Login',
    components: { default: Login, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/register',
    name: 'register',
    components: { default: Register, header: MainNavbar, footer: MainFooter },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/admin',
    name: 'admin',
    // component: Home
    components: { default: Admin },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/dataKatalog',
    name: 'dataKatalog',
    // component: Home
    components: { default: dataKatalog, header: AdminNavbar },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/dataPengguna',
    name: 'dataPengguna',
    // component: Home
    components: { default: dataPengguna, header: AdminNavbar },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },
  {
    path: '/dataPeminjaman',
    name: 'dataPeminjaman',
    // component: Home
    components: { default: dataPeminjaman, header: AdminNavbar },
    props: {
      header: { colorOnScroll: 400 },
      footer: { backgroundColor: 'black' }
    }
  },


]

const router = new VueRouter({
  routes
})

export default router
