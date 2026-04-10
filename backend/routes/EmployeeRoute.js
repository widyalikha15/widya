import express from "express";
import {
  getEmployees,
  getEmployeeById,
  getEmployeesByPosition,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeesHierarchy
} from "../controllers/EmployeeController.js";

const router = express.Router();

router.get("/employees", getEmployees);
router.get("/employees/:id", getEmployeeById);
router.get("/employees/by-position", getEmployeesByPosition);
router.post("/employees", createEmployee);
router.put("/employees/:id", updateEmployee);
router.delete("/employees/:id", deleteEmployee);
router.get("/employees-hierarchy", getEmployeesHierarchy);

export default router;