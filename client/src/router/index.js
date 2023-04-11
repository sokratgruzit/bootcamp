import Vue from "vue";
import VueRouter from "vue-router";
import { Trans } from "@/plugins/Translation";

function load(component) {
  return () => import(`@/views/${component}.vue`);
}

Vue.use(VueRouter);

const routes = [
  //start translatable
  /*{
    path: "/",
    redirect: `/${Trans.defaultLocale}`,
  },
  {
    path: "/:locale",
    component: {
      template: "<router-view />",
    },
    beforeEnter: Trans.routeMiddleware,
    children: [
      {
        path: "",
        name: "Home",
        component: load("Home"),
      },
      {
        path: "history",
        name: "History",
        component: load("History"),
      },
    ],
  },*/
  //end not translatable
  //start not translatable
  {
    path: "/",
    name: "Home",
    component: load("Home"),
  },
  {
    path: "/history",
    name: "History",
    component: load("History"),
  },
  {
    path: "/quizz",
    name: "Quizz",
    component: load("Tests"),
  },
  {
    path: "/team",
    name: "Team",
    component: load("Team"),
  },
  {
    path: "/portfolio",
    name: "Work",
    component: load("Work"),
  },
  {
    path: "/portfolio/:id",
    name: "Project",
    component: load("Project"),
  },
  {
    path: "/services",
    name: "Services",
    component: load("Services"),
  },
  // {
  //   path: "/project",
  //   name: "Project",
  //   component: load("Project"),
  // },
  //end not translatable
  {
    path: "*",
    name: "Error",
    component: load("404"),
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
