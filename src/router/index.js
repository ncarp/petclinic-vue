import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/welcome',
      name: 'welcome',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/owners',
      name: 'owners',
      component: () => import('../views/OwnerListView.vue'),
    },
    {
      path: '/owners/find',
      name: 'find owners',
      component: () => import('../views/OwnersFindView.vue'),
    },
    {
      path: '/owners/:ownerId',
      name: 'owner details',
      component: () => import('../views/OwnerDetailView.vue'),
      props: true,
    },
    {
      path: '/owners/:ownerId/edit',
      name: 'edit owner',
      component: () => import('../views/OwnerEditView.vue'),
      props: true,
    },
    {
      path: '/owners/new',
      name: 'add owner',
      component: () => import('../views/OwnerEditView.vue'),
    },
    {
      path: '/owners/:ownerId/pets/:petId/visits/new',
      name: 'add visit',
      component: () => import('../views/VisitAddView.vue'),
      props: true,
    },
    {
      path: '/owners/:ownerId/pets/new',
      name: 'add pet',
      component: () => import('../views/PetAddView.vue'),
      props: true,
    },
    {
      path: '/vets',
      name: 'vets',
      component: () => import('../views/VetListView.vue'),
    },
    {
      path: '/vets/:vetId?/edit',
      name: 'edit vet',
      component: () => import('../views/VetEditView.vue'),
      props: true,
    },
    {
      path: '/vets/new',
      name: 'add vet',
      component: () => import('../views/VetEditView.vue'),
    },
    {
      path: '/pets',
      name: 'pets',
      component: () => import('../views/PetListView.vue'),
    },
    {
      path: '/pets/:petId?/edit',
      name: 'edit pet',
      component: () => import('../views/PetEditView.vue'),
    },
    {
      path: '/pettypes',
      name: 'pettypes',
      component: () => import('../views/PetTypeListView.vue'),
    },
    {
      path: '/pettypes/:petTypeId?/edit',
      name: 'edit pettype',
      component: () => import('../views/PetTypeEditView.vue'),
    },
    {
      path: '/pettypes/new',
      name: 'add pettype',
      component: () => import('../views/PetTypeEditView.vue'),
    },
    {
      path: '/specialties',
      name: 'specialties',
      component: () => import('../views/SpecialtyListView.vue'),
    },
    {
      path: '/specialties/:specialtyId?/edit',
      name: 'edit specialty',
      component: () => import('../views/SpecialtyEditView.vue'),
    },
    {
      path: '/specialties/new',
      name: 'add specialty',
      component: () => import('../views/SpecialtyEditView.vue'),
    },
    {
      path: '/visits/:visitId?/edit',
      name: 'edit visit',
      component: () => import('../views/VisitEditView.vue'),
      props: true,
    },
  ],
})

export default router
