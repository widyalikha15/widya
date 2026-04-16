import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const { DataTypes } = Sequelize;

const User = db.define(
  "users",
  {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING,
    password: DataTypes.STRING,
    refresh_token: DataTypes.TEXT,

    login_device: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: "Unknown Device",
    },

    last_login: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    last_profile_update: {
      type: DataTypes.DATE,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM("Active", "Inactive"),
      defaultValue: "Active",
    },
  },
  {
    freezeTableName: true,
    timestamps: true, // createdAt & updatedAt
  }
);

(async () => {
  await db.sync({ alter: true });
})();

export default User;