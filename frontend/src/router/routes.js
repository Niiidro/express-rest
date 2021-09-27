const routes = [
  {
    path: "/",
    component: () => import("../layouts/Default.vue"),
    meta: {
      requiresAuth: true,
    },
    children: [
      {
        path: "",
        component: () => import("../views/Home/Home.vue"),
      },
    ],
  },
  {
    path: "/login",
    component: () => import("../views/Login.vue"),
  },

];

export default routes;
