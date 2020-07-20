import apisauce from "apisauce";

import Constants from "../constants";

export default function createAPI(baseURL = Constants.DEV_URL) {
  const api = apisauce.create({
    baseURL,
    headers: {
      accept: "application/json",
    },
    timeout: 10000,
  });

  const getCompanies = () => api.get("/Company");
  const getCompany = (id) => api.get(`/Company/${id}`);
  const createCompany = (company) =>
    api.post("/Company", {}, { data: { ...company } });
  const updateCompany = (company) =>
    api.put("/Company", {}, { data: { ...company } });
  const deleteCompany = (id) => api.delete("/Company", { id });

  const getInvoices = () => api.get("/Invoice");
  const getInvoice = (id) => api.get(`/Invoice/${id}`);
  const createInvoice = (invoice) =>
    api.post("/Invoice", {}, { data: { ...invoice } });
  const updateInvoice = (invoice) =>
    api.put("/Invoice", {}, { data: { ...invoice } });
  const deleteInvoice = (id) => api.delete("/Invoice", { id });

  return {
    getCompanies,
    getCompany,
    createCompany,
    updateCompany,
    deleteCompany,

    getInvoices,
    getInvoice,
    createInvoice,
    updateInvoice,
    deleteInvoice,
  };
}
