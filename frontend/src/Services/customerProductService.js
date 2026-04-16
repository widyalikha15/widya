import axiosBaseURL from "../httpCommon";

export const fetchCustomerProducts = () =>
  axiosBaseURL.get("/customer-products");

export const fetchCustomerProductById = (id) =>
  axiosBaseURL.get(`/customer-products/${id}`);

export const createCustomerProduct = (data) =>
  axiosBaseURL.post("/customer-products", data);

export const updateCustomerProduct = (id, data) =>
  axiosBaseURL.put(`/customer-products/${id}`, data);

export const removeCustomerProduct = (id) =>
  axiosBaseURL.delete(`/customer-products/${id}`);