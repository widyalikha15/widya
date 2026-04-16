import { BrowserRouter, Route, Routes } from "react-router-dom";
import Dashboard from "./components/Layout/Dashboard";
import Login from "./components/Login/Login";
import Register from "./components/Login/Register";
import EditUser from "./components/User/EditUser"
import Userlist from "./components/User/UserList"
import Userprofile from "./components/User/UserProfile.js"
import ProductList from "./components/Product/ProductList";
import AddProduct from "./components/Product/AddProduct";
import EditProduct from "./components/Product/EditProduct";
import CustomerList from "./components/Customer/CustomerList.jsx";
import EventList from "./components/Event/EventList";
import EditEvent from "./components/Event/EditEvent.js";
import PositionTree from "./components/Position/Hierarki.js";
import EmployeePage from "./components/Employee/EmployeePage.js";
import EmployeeHierarchy from "./components/Employee/EmployeeHierarchy.js";
import EditUserProfile from "./components/User/EditUserProfile.js";
import CustomerProductList from "./components/CustomerProduct/CustomerProductList.jsx";
import AddCustomerProduct from "./components/CustomerProduct/AddCustomerProduct.jsx";
import EditCustomerProduct from "./components/CustomerProduct/EditCustomerProduct.jsx";
import AddCustomer from "./components/Customer/AddCustomer.jsx";
import EditCustomer from "./components/Customer/EditCustomer.jsx";
 
function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users/edit/:id" element={<EditUser />} />
        <Route path="/users" element={<Userlist />}/>
        <Route path="/userprofile" element={<Userprofile />}/>
        <Route path="/userprofile/edit/:id" element={<EditUserProfile />} />
        <Route path="/Product" element={<ProductList/>}/>
        <Route path="/Product/add" element={<AddProduct/>}/>
        <Route path="/Product/edit/:id" element={<EditProduct/>}/>
        <Route path="/customer" element={<CustomerList/>}/>
        <Route path="/events" element={<EventList/>}/>
        <Route path="/events/edit/:id" element={<EditEvent/>}/>
        <Route path="/hierarki" element={<PositionTree/>}/>
        <Route path="/employee" element={<EmployeePage/>}/>
        <Route path="/employeeHierarchy" element={<EmployeeHierarchy/>}/>
        <Route path="/customer-products" element={<CustomerProductList />} />
        <Route path="/customer-products/add" element={<AddCustomerProduct />} />
        <Route
          path="/customer-products/edit/:id"
          element={<EditCustomerProduct />}
        />
        <Route path="/customers" element={<CustomerList />} />
        <Route path="/customers/add" element={<AddCustomer />} />
        <Route path="/customers/edit/:id" element={<EditCustomer />} />
      </Routes>
    </BrowserRouter>
  );
}
 
export default App;