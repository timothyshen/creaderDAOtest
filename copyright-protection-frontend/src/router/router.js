import { createRouter, createWebHistory } from 'vue-router';
import {onBeforeMount} from "vue";
import {useStore} from "vuex";
import store from "../store/store.js";
import {ElMessage} from "element-plus";

const routes = [
    {
        path: '/',
        name: 'home',
        component: () => import('../views/Home.vue'),
        meta: {
            title: 'Home',
            needLogin: false,
        }
    },
    {
        path: '/cover',
        name: 'all_cover',
        component: () => import('../views/ViewAllBooks.vue'),
        meta: {
            title: 'All Books',
            needLogin: false,
        }
    },
    {
        path: '/profile/',
        name: 'profile',
        component: () => import('../views/DisplayNFTPage.vue'),
        meta: {
            title: 'User Profile',
            needLogin: true,
        }
    },
    {
        path: '/cover/:id/',
        name: 'cover',
        component: () => import('../views/CoverView.vue'),
        meta: {
            title: 'Book Cover',
            needLogin: false,
        }
    },
    {
        path: '/cover/:id/:chapterId/',
        name: 'chapter',
        component: () => import('../views/ChapterView.vue'),
        meta: {
            title: 'Book Chapter',
            needLogin: false,
        }
    },
    {
        path: '/author/cover/',
        name: 'author_cover',
        component: () => import('../views/DisplayProfileBook.vue'),
        meta: {
            title: 'Author Book',
            needLogin: true,
        }
    },
    {
        path: '/author/create/',
        name: 'cover_create',
        component: () => import('../views/CreateCoverPage.vue'),
        meta: {
            title: 'Author Creation',
            needLogin: true,
        }
    },
    {
        path: '/author/cover/:id/list/',
        name: 'cover_list',
        component: () => import('../views/DisplayProfileChapter.vue'),
        meta: {
            title: 'Author Book List',
            needLogin: true,
        }
    },
    {
        path: '/author/cover/:id/chapter',
        name: 'chapter_create',
        component: () => import('../views/CreateChapter.vue'),
        meta: {
            title: 'Author Chapter Creation',
            needLogin: true,
        }
    },
    {
        path: '/author/cover/:id/settings',
        name: 'cover_settings',
        component: () => import('../views/CoverSettingPage.vue'),
        meta: {
            title: 'Author Book Settings',
            needLogin: true,
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: '404 Page',
        component: ()=> import('../views/404.vue'),
        meta: {
            title: '404',
            needLogin: false,
        }
    }
];


const router = createRouter({
    history: createWebHistory(),
    routes,
    scrollBehavior(to, from, savedPosition) {
        return savedPosition || new Promise((resolve) => {
            setTimeout(() => {
                resolve({ top: 0, behavior: 'smooth' });
            }, 300);
        });
    }
});


router.beforeEach((to, from, next) => {
    if (to.meta.needLogin && !store.getters["wallet/getIsConnected"]) {
        next("/");
        ElMessage({
            type: 'error',
            message: 'Please connect your wallet first!',
            duration: 2000
        });
    } else {
        next();
    }
})

export default router;
