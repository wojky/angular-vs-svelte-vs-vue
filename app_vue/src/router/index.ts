import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/characters",
      name: "characters",
      component: () => import("../characters/views/Characters.vue"),
    },
    {
      path: "/characters/:id",
      name: "character",
      component: () => import("../characters/views/CharactersDetails.vue"),
    },
    {
      path: "/episodes",
      name: "episodes",
      component: () => import("../episodes/views/Episodes.vue"),
    },
    {
      path: "/episodes/watchlist",
      name: "watchlist",
      component: () => import("../episodes/views/Watchlist.vue"),
    },
    {
      path: "/locations",
      name: "locations",
      component: () => import("../locations/views/Locations.vue"),
    },
    {
      path: "/settings",
      name: "settings",
      component: () => import("../settings/Settings.vue"),
    },
    {
      path: "/auth/login",
      name: "login",
      component: () => import("../auth/views/Login.vue"),
    },
    {
      path: "/auth/register",
      name: "register",
      component: () => import("../auth/views/Register.vue"),
    },
    {
      path: "/auth/reset",
      name: "reset",
      component: () => import("../auth/views/ResetPassword.vue"),
    },
    {
      path: "/",
      redirect: () => {
        return { path: "/characters" };
      },
    },
  ],
});

export default router;
