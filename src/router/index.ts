import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';

import HeadlinesView from '@/views/HeadlinesView.vue';
import ArticleDetailsView from '@/views/ArticleDetailsView.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: () => ({ path: '/articles' }),
  },
  {
    path: '/articles',
    name: 'articles',
    component: HeadlinesView,
  },
  {
    path: '/articles/:id',
    name: 'article',
    component: ArticleDetailsView,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
