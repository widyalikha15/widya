import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Customer from "./CustomerModels.js";
import Product from "./ProductModels.js";

const { DataTypes } = Sequelize;

const CustomerProduct = db.define(
  "customer_products",
  {
    customer_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    qty: DataTypes.INTEGER,
  },
  {
    freezeTableName: true,
  }
);

// ✅ RELATION
CustomerProduct.belongsTo(Customer, {
  foreignKey: "customer_id",
  as: "customer",
});

CustomerProduct.belongsTo(Product, {
  foreignKey: "product_id",
  as: "product",
});

export default CustomerProduct;

(async () => {
  await db.sync();
})();