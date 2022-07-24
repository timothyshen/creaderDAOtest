import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    // {
    //     path: '/cover/:id',
    //     name: 'cover',
    //     component: () => import('../views/Cover.vue'),
    // },
    {
        path: '/cover/:id/chapter',
        name: 'chapter',
        component: () => import('../views/CreateChapter.vue'),
    }

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
