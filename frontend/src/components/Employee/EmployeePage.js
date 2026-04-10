import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm.js";
import EmployeeTable from "./EmployeeTable.js"
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../../Services/employeeService.js";
import Navbar from "../Layout/Navbar.js";

export default function EmployeePage() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadData = async () => {
    const res = await getEmployees();
    setEmployees(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (data) => {
    if (selected) {
      await updateEmployee(selected.id, data);
    } else {
      await createEmployee(data);
    }
    setSelected(null);
    loadData();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Yakin hapus employee?")) {
      await deleteEmployee(id);
      loadData();
    }
  };

  return (
    <>
  <Navbar />
   <div className="hero has-background-grey-light is-fullheight">
  <div style={{ display: "flex", gap: 30, color:"#000000"}}>
    <div style={{ width: "35%",  color:"#000000"}}>
      <EmployeeForm
        onSubmit={handleSubmit}
        selected={selected}
      />
    </div>

    <div style={{ width: "65%", color:"#000000"}}>
      <EmployeeTable
        employees={employees}
        onEdit={setSelected}
        onDelete={handleDelete}
      />
    </div>
  </div>
  </div>
</>
  );
}
