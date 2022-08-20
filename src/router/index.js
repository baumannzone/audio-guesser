import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import { useUserStore } from "../stores";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/game",
      name: "game",
      component: () => import("../views/GameView.vue"),
      meta: { requiresAuth: true },
    },
    {
      path: "/score",
      name: "score",
      component: () => import("../views/ScoreView.vue"),
    },
  ],
});

router.beforeEach((to) => {
  const user = useUserStore();

  if (to.meta.requiresAuth && !user.isLoggedIn) {
    return { name: "home" };
  }
});

export default router;
