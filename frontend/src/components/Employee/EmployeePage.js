import { useEffect, useState } from "react";
import EmployeeForm from "./EmployeeForm.js";
import EmployeeTable from "./EmployeeTable.js"
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../../Services/employeeService.js";

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
    <div style={{ display: "flex", gap: 30 }}>
      <div style={{ width: "35%" }}>
        <EmployeeForm
          onSubmit={handleSubmit}
          selected={selected}
        />
      </div>

      <div style={{ width: "65%" }}>
        <EmployeeTable
          employees={employees}
          onEdit={setSelected}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
