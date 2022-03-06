import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/Items",
      name: "Items",
      component: () => import("./components/ItemsList")
    },
    {
      path: "/Items/:id",
      name: "item-details",
      component: () => import("./components/Item")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddItem")
    },
  ]
});
//This is my frontendrunning on a seperate localhost server.