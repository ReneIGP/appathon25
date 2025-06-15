import { createRouter, createWebHistory } from 'vue-router'
import Startpage from '@/components/Startpage.vue'
import Map from '@/components/Map.vue'

const routes = [
  { path: '/', name: 'Startpage', component: Startpage },
  { path: '/map', name: 'Map', component: Map }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router