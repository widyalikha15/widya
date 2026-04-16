import express from "express";
import cors from "cors";
import UserRoute from "./routes/UserRoute.js";
import ProductRoute from "./routes/ProductRoute.js";
import CustomerRoute from "./routes/CustomerRoute.js";
import EventRoute from "./routes/EventRoute.js";
import PositionRoute from "./routes/PositionRoute.js";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import FileUpload from "express-fileupload";
import customerProductRoutes from "./routes/customerProductRoutes.js";

dotenv.config();

const app = express();
app.use(cors({ 
    credentials:true, 
    origin:'http://localhost:3000'
    //origin:'http://192.168.137.1:3000'
    //,withCredentials : true
    // AccessControlAllowOrigin: '*',  
    // origin: '*',  
    // methods: 'GET,HEAD,PUT,PATCH,POST,DELETE' 
 }));

app.use(express.json());
app.use(FileUpload());
app.use(cookieParser());
app.use(express.static("public"));
app.use(UserRoute);
app.use(ProductRoute);
app.use(CustomerRoute);
app.use(EventRoute);
app.use(PositionRoute);
app.use(EmployeeRoute);
app.use(customerProductRoutes);

app.listen(5000, ()=> console.log('server up and running...'));

