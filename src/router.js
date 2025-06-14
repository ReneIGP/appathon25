import { createRouter, createWebHistory } from 'vue-router'
import Startpage from './components/Startpage.vue'

const routes = [
  { path: '/', component: Startpage }, // root path shows Startpage
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
