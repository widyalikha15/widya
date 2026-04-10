import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Event = db.define('events',{
    title: DataTypes.STRING,
    note: DataTypes.STRING,
    start_time: DataTypes.DATEONLY,
    end_time: DataTypes.DATEONLY,
    color: DataTypes.STRING
},{
    freezeTableName:true
});

(async()=>{
    await db.sync();
})();

export default Event;



