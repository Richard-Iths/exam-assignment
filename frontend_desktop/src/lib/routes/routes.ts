// import { Home, Orders, Invoices } from "@views/index";
import Home from "@views/Home.svelte";
import Orders from "@views/Orders.svelte";
import Invoices from "@views/Invoices.svelte";
import { AppRoutes } from "@src/types";
import Users from "@views/Users.svelte";
const routes = {
  // Exact path
  [AppRoutes.HOME]: Home,
  [AppRoutes.ORDERS]: Orders,
  [AppRoutes.INVOICES]: Invoices,
  [AppRoutes.USERS]: Users,

  // Using named parameters, with last being optional
  // '/author/:first/:last?': Author,

  // Wildcard parameter
  // '/book/*': Book,

  // Catch-all
  // This is optional, but if present it must be the last
  // '*': NotFound,
};

export default routes;
