export default function EmployeeTable({ employees, onEdit, onDelete }) {
  return (
    <div>
    <table border="1" width="100%" cellPadding="8">
      <thead>
        <tr>
          <th>Nama</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Jabatan</th>
          <th>Status</th>
          <th>Aksi</th>
        </tr>
      </thead>
      <tbody>
        {employees.map(emp => (
          <tr key={emp.id}>
            <td>{emp.name}</td>
            <td>{emp.email}</td>
            <td>{emp.phone}</td>
             {/* ✅ ALIAS BENAR */}
            <td>{emp.position?.name || "-"}</td>
            <td>{emp.status}</td>
            <td>
              <button onClick={() => onEdit(emp)}>Edit</button>
              <button
                onClick={() => onDelete(emp.id)}
                style={{ marginLeft: 5 }}
              >
                Hapus
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
}