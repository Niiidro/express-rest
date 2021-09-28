import routes from './routes';
import { createRouter, createWebHistory } from 'vue-router';

const Router = createRouter({
    routes,
    history: createWebHistory(),
});

Router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        // this route requires auth, check if logged in
        // if not, redirect to login page.
        if (!localStorage.getItem('access_token')) {
            next({ path: 'login' });
        } else {
            next(); // go to wherever I'm going
        }
    } else {
        next(); // does not require auth, make sure to always call next()!
    }
});

export default Router;
