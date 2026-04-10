import { Employee, Position } from "../models/EmployeePositionModels.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Position,
        as: "position",
        attributes: ["id", "name"]
      }
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* GET employee by position */
export const getEmployeesByPosition = async (req, res) => {
  try {
    const { position_id } = req.query;

    const employees = await Employee.findAll({
      where: { position_id },
      include: {
        model: Position,
        attributes: ["name"]
      }
    });

    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* CREATE employee */
export const createEmployee = async (req, res) => {
  try {
    await Employee.create(req.body);
    res.json({ message: "Employee berhasil ditambahkan" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id, {
      include: {
        model: Position,
        as: "position",
        attributes: ["id", "name"]
      }
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }

    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* UPDATE employee */
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }

    await employee.update(req.body);

    res.json({ message: "Employee berhasil diupdate" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* DELETE employee */
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);

    if (!employee) {
      return res.status(404).json({ message: "Employee tidak ditemukan" });
    }

    await employee.destroy();

    res.json({ message: "Employee berhasil dihapus" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getEmployeesHierarchy = async (req, res) => {
  try {
    const employees = await Employee.findAll({
      include: {
        model: Position,
        as: "position",
        attributes: ["id", "name", "parent_id"]
      }
    });

    res.json(employees);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};