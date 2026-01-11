import { createRouter, createWebHistory } from "vue-router";
import { handleHotUpdate, routes } from "vue-router/auto-routes";
import { getSession } from "./pages/auth/data";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

// route guard
router.beforeEach(async (to, form) => {
  const publicPages = ["/auth/signin", "/auth/signup", "/"];
  const isPublic = publicPages.includes(to.path);

  const { data } = await getSession();
  if (!data.session && !isPublic) return { path: "/auth/signin" };
});

// This will update routes at runtime without reloading the page
if (import.meta.hot) {
  handleHotUpdate(router);
}

export default router;
