import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Position = db.define('position',{
  name: DataTypes.STRING,
  level: DataTypes.INTEGER,
  parent_id: DataTypes.INTEGER,
  description: DataTypes.TEXT
}, {
  tableName: "positions",
  timestamps: false,
  freezeTableName: true
});


export default Position;

(async()=>{
    await db.sync();
})();