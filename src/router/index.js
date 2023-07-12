import { createRouter, createWebHistory } from 'vue-router';
import DisplayVilla from '../components/DisplayVilla.vue';
import VillaDetail from '../components/VillaDetail.vue';

const routes = [
  {
    path: '/',
    name: 'DisplayVilla',
    component: DisplayVilla,
  },
  {
    path: '/villa/:id',
    name: 'VillaDetail',
    component: VillaDetail,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
