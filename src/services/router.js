import Vue from "vue";
import Router from "vue-router";

import Home from "../components/Home";
import HouseholdAppliancesList from "../components/HouseholdAppliancesList";
import HouseholdAppliancesForm from "../components/HouseholdAppliancesForm";

const routes = [
  { path: "/", name: "home", component: Home },
  {
    path: "/eletrodomesticos",
    name: "eletrodomesticos",
    component: HouseholdAppliancesList,
  },
  {
    path: "/eletrodomesticos/edit",
    name: "eletrodomesticos.edit",
    component: HouseholdAppliancesForm,
  },
];

Vue.use(Router);

const router = new Router({
  routes: routes,
  mode: "history",
});

export default router;
