import { useEffect, useState } from "react";
import { getPositions } from "../../Services/positionService";

const emptyForm = {
  name: "",
  email: "",
  phone: "",
  status: "active",
  position_id: ""
};

export default function EmployeeForm({ onSubmit, selected }) {
  const [form, setForm] = useState(emptyForm);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    loadPositions();
  }, []);
  useEffect(() => {
    console.log("POSITIONS:", positions);
  }, [positions]);

  useEffect(() => {
  if (selected) {
    setForm({
      name: selected.name || "",
      email: selected.email || "",
      phone: selected.phone || "",
      status: selected.status || "active",
      position_id: Number(
        selected.position?.id || selected.position_id || ""
      )
    });
  }
}, [selected]);
  const loadPositions = async () => {
        const res = await getPositions();
        setPositions(res.data);
    };

  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm({
    ...form,
    [name]: name === "position_id" ? Number(value) : value
  });
};
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
    setForm(emptyForm);
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4>{selected ? "Edit Employee" : "Tambah Employee"}</h4>

      <input
        name="name"
        placeholder="Nama"
        value={form.name}
        onChange={handleChange}
        required
      />

      <br />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <br />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <br />

      {/* 🔥 POSITION SELECT */}
      <select
        name="position_id"
        value={form.position_id}
        onChange={handleChange}
        required
      >
        <option value="">-- Pilih Jabatan --</option>
        {positions.map(pos => (
          <option key={pos.id} value={pos.id}>
            {pos.name}
          </option>
        ))}
      </select>

      <br />

      <select
        name="status"
        value={form.status}
        onChange={handleChange}
      >
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>

      <br /><br />

      <button type="submit">
        {selected ? "Update" : "Simpan"}
      </button>
    </form>
  );
}
