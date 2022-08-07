import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
    },
    {
        path: '/profile/',
        name: 'profile',
        component: () => import('../views/DisplayNFTPage.vue'),
    },
    {
        path: '/cover/:id/',
        name: 'cover',
        component: () => import('../views/CoverView.vue'),
    },
    {
        path: '/author/cover/',
        name: 'author_cover',
        component: () => import('../views/DisplayProfileBook.vue'),
    },
    {
        path: '/author/create/',
        name: 'cover_create',
        component: () => import('../views/CreateCoverPage.vue'),
    },
    {
        path: '/author/cover/:id/chapter',
        name: 'chapter_create',
        component: () => import('../views/CreateChapter.vue'),
    },
    {
        path: '/author/cover/:id/settings',
        name: 'cover_settings',
        component: () => import('../views/CoverSettingPage.vue'),
    },

];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
