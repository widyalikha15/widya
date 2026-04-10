import { useEffect, useState } from "react";
import Navbar from "../Login/Navbar";
import axios from "axios";

const buildEmployeeTree = (employees, parentPositionId = null) => {
  return employees
    .filter(emp => emp.position?.parent_id === parentPositionId)
    .map(emp => ({
      ...emp,
      children: buildEmployeeTree(employees, emp.position.id)
    }));
};
const EmployeeNode = ({ emp }) => {
  const [open, setOpen] = useState(true);

  return (
    <ul style={{ marginLeft: 20 }}>
      <li>
        {emp.children.length > 0 && (
          <button onClick={() => setOpen(!open)}>
            {open ? "▼" : "▶"}
          </button>
        )}

        <strong>{emp.name}</strong>
        <span style={{ color: "#aaa", marginLeft: 5 }}>
          ({emp.position.name})
        </span>

        {open &&
          emp.children.map(child => (
            <EmployeeNode key={child.id} emp={child} />
          ))}
      </li>
    </ul>
  );
};
export default function EmployeeHierarchy() {
  const [tree, setTree] = useState([]);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/employees-hierarchy");
    setTree(buildEmployeeTree(res.data));
  };

  return (
    <>
      <Navbar />
      <h2>Hierarchy Employee</h2>

      {tree.map(emp => (
        <EmployeeNode key={emp.id} emp={emp} />
      ))}
    </>
  );
}
