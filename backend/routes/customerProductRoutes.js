import express from "express";
import {
  getAllCustomerProducts,
  getCustomerProductById,
  createCustomerProduct,
  updateCustomerProduct,
  deleteCustomerProduct,
} from "../controllers/customerProductController.js";

const router = express.Router();

router.get("/customer-products", getAllCustomerProducts);
router.get("/customer-products/:id", getCustomerProductById);
router.post("/customer-products", createCustomerProduct);
router.put("/customer-products/:id", updateCustomerProduct);
router.delete("/customer-products/:id", deleteCustomerProduct);

export default router;