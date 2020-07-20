import Home from "../containers/Home";
import Companies from "../containers/Companies";
import Company from "../containers/Company";
import Invoice from "../containers/Invoice";
import Invoices from "../containers/Invoices";

export default [
  {
    path: "/",
    component: Home,
    exact: true,
  },
  {
    path: "/companies",
    component: Companies,
  },
  {
    path: "/invoices",
    component: Invoices,
  },
  {
    path: "/create-company",
    component: Company,
  },
  {
    path: "/create-invoice",
    component: Invoice,
  },
  {
    path: "/edit-company/:id",
    component: Company,
  },
  {
    path: "/edit-invoice/:id",
    component: Invoice,
  },
];
