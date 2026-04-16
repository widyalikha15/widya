import axiosBaseURL from "../httpCommon";

export const fetchProducts = () => axiosBaseURL.get("/products");