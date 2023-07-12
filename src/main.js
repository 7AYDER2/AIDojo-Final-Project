import '../public/assets/main.css';


import { createApp } from 'vue';
import App from '@/App.vue';
import axios from 'axios';

import { createRouter, createWebHistory } from "vue-router";
import routes from '@/routes';

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
    if (to.matched.some((route) => route.meta.requiresAdmin)) {
        // Check if the route requires admin access
        const token = localStorage.getItem('token');

        if (token) {
            axios.get('http://localhost:8000/user', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
                .then(res => {
                    const role = res.data.Profile.role;
                    if (role !== 'admin') {
                        next('/');
                    }
                    else {
                        next();
                    }
                })
                .catch(error => {
                    console.log(error);
                    next('/');
                });
        } else {
            next('/');
        }
    } else {
        next();
    }
});

createApp(App).use(router).mount('#app')


