import Employee from "./EmployeeModels.js";
import Position from "./PositionModels.js";

/* RELATION */
Employee.belongsTo(Position, {
  foreignKey: "position_id",
  as: "position"
});

Position.hasMany(Employee, {
  foreignKey: "position_id",
  as: "employees"
});

export { Employee, Position };