import { createRouter, createWebHistory } from 'vue-router';

const AppHome = () => import('~/pages/home/AppHome.vue');
const ShowDetails = () => import('~/pages/details/ShowDetails.vue');
const ShowSearch = () => import('~/pages/search/ShowSearch.vue');

export const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: AppHome },
    { path: '/details/:id', component: ShowDetails },
    { path: '/search/:query', component: ShowSearch },
    { path: '/search', component: ShowSearch },
  ],
});
