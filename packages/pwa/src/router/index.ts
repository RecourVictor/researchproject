import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { title: 'Home' },
    },
    {
      path: '/:slug([0-9a-fA-F]{24})',
      name: 'simulatie',
      component: () => import('../views/SimulationView.vue'),
      meta: { title: 'Simulation' },
    },
    {
      path: '/settings',
      component: () => import('../components/wrappers/PageWrapper.vue'),
      children: [
        {
          path: '',
          name: 'settings',
          component: () => import('../views/settings/SettingsView.vue'),
          meta: { title: 'Instellingen' },
        },
      ],
    },
    {
      path: '/athletes',
      component: () => import('../components/wrappers/PageWrapper.vue'),
      children: [
        {
          path: '',
          name: 'athletes',
          component: () => import('../views/athletes/IndexView.vue'),
          meta: { title: 'Atleten' },
        },
        {
          path: ':slug([0-9a-fA-F]{24})',
          name: 'athlete',
          component: () => import('../views/athletes/_id.vue'),
          meta: { title: 'Atleet bewerken' },
        },
        {
          path: 'create',
          name: 'create-athlete',
          component: () => import('../views/athletes/NewView.vue'),
          meta: { title: 'Atleet toevoegen' },
        },
      ],
    },
    {
      path: '/simulations',
      component: () => import('../components/wrappers/PageWrapper.vue'),
      children: [
        {
          path: '',
          name: 'simulations',
          component: () => import('../views/simulations/IndexView.vue'),
          meta: { title: 'Simulaties' },
        },
        {
          path: ':slug([0-9a-fA-F]{24})',
          name: 'simulation',
          component: () => import('../views/simulations/_id.vue'),
          meta: { title: 'Simulatie bewerken' },
        },
        {
          path: 'create',
          name: 'create-simulation',
          component: () => import('../views/simulations/NewView.vue'),
          meta: { title: 'Simulatie toevoegen' },
        },
      ],
    },
    // 404 and other errors
    {
      path: '/:pathMatch(.*)*',
      component: () => import('@/views/NotFound.vue'),
      meta: { title: 'Not found' },
    },
  ],
})

router.beforeEach(async to => {
  const { title } = to.meta

  document.title = (title as string) + ' | ' + "'Simurace"
})

export default router
