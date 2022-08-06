import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/cover/',
        name: 'cover',
        component: () => import('../views/DisplayProfileBook.vue'),
    },
    {
        path: '/cover/:id/chapter',
        name: 'chapter',
        component: () => import('../views/CreateChapter.vue'),
    },
    {
        path: '/cover/:id/settings',
        name: 'cover_settings',
        component: () => import('../views/CoverSettingPage.vue'),
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
