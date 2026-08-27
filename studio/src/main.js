import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import './styles/tokens.css';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', redirect: '/shots' },
    { path: '/shots', name: 'shots', component: () => import('./views/ShotsView.vue') },
    { path: '/cast', name: 'cast', component: () => import('./views/CastView.vue') },
    { path: '/gallery', name: 'gallery', component: () => import('./views/GalleryView.vue') },
    { path: '/queue', name: 'queue', component: () => import('./views/QueueView.vue') },
  ],
});

createApp(App).use(router).mount('#app');
