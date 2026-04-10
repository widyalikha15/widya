import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Employee = db.define('employees',{
    name: DataTypes.STRING,
    position_id: DataTypes.INTEGER,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    status: DataTypes.STRING
},{
    freezeTableName:true,
    timestamps: false
});

(async()=>{
    await db.sync();
})();

export default Employee;





