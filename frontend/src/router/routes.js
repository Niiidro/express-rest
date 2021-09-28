const routes = [
    {
        path: '/',
        component: () => import('../layouts/Default.vue'),
        meta: {
            requiresAuth: true,
        },
        children: [
            {
                path: '',
                component: () => import('../views/home/Home.vue'),
            },
            {
                path: '/account',
                component: () => import('../views/account/Account.vue'),
            },
        ],
    },
    {
        path: '/login',
        component: () => import('../views/Login.vue'),
    },
    {
        path: '/register',
        component: () => import('../views/Register.vue'),
    },
];

export default routes;
