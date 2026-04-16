import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import {
  fetchCustomerProducts,
  removeCustomerProduct,
} from "../../Services/customerProductService";

const CustomerProductList = () => {
  const [data, setData] = useState([]);

  const loadData = useCallback(async () => {
    try {
      const res = await fetchCustomerProducts();
      setData(res.data || []);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDelete = async (id) => {
    try {
      await removeCustomerProduct(id);
      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Navbar />

      <div>
        <h2>Customer Product List</h2>

        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Product</th>
              <th>Image</th>
              <th>Qty</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id}>
                  <td>{item.customer?.name}</td>
                  <td>{item.product?.name}</td>
                  <td>
                    <img
                      src={item.product?.url}
                      alt={item.product?.name}
                      width="80"
                    />
                  </td>
                  <td>{item.qty}</td>
                  <td>
                    <Link to={`/customer-products/edit/${item.id}`}>
                      Edit
                    </Link>
                    {" | "}
                    <button onClick={() => handleDelete(item.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">Belum ada data</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default CustomerProductList;