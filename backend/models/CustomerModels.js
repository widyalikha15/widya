import {Sequelize} from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Customer = db.define('customers',{
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.STRING
},{
    freezeTableName: true
});

export default Customer;

(async()=>{
    await db.sync();
})();