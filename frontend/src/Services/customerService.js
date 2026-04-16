import axiosBaseURL from "../httpCommon";

export const fetchCustomers = () => axiosBaseURL.get("/customers");