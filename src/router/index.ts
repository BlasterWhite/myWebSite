import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Projects from "../views/ProjectsView.vue";
import WritingView from "@/views/WritingView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/projects",
      name: "Projects",
      component: Projects,
    },
    {
      path: "/writing",
      name: "Writing",
      component: WritingView,
    },
  ],
});

export default router;
