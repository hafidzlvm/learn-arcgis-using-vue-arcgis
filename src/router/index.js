import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/:catchAll(.*)',
    name: 'home',
    component: () => import('@/views/Home.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  document.title = `${to.meta.title || 'ArcGIS App'} - Learn ArcGIS`
  const link = document.head.appendChild(document.createElement('link'))
  link.rel = 'icon'
  link.href = 'https://img.icons8.com/?size=100&id=e0mjCwMhBtmD&format=png&color=000000'
  next()
})

export default router