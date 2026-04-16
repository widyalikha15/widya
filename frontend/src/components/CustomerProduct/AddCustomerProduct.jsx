import React, { useEffect, useState } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import { createCustomerProduct } from "../../Services/customerProductService";
import { fetchCustomers } from "../../Services/customerService";
import { fetchProducts } from "../../Services/productService";

const AddCustomerProduct = () => {
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    qty: 1,
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const customerRes = await fetchCustomers();
      const productRes = await fetchProducts();

      setCustomers(customerRes.data.result || []);
      setProducts(productRes.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const saveData = async (e) => {
    e.preventDefault();

    try {
      await createCustomerProduct(form);
      navigate("/customer-products");
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ option customer
  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  // ✅ option product
  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <>
      <Navbar />

      <div>
        <h2>Add Customer Product</h2>

        <form onSubmit={saveData}>
          {/* ✅ Search Customer */}
          <div style={{ marginBottom: "15px" }}>
            <label>Customer</label>
            <Select
              options={customerOptions}
              placeholder="Cari customer..."
              onChange={(selected) =>
                setForm({
                  ...form,
                  customer_id: selected.value,
                })
              }
            />
          </div>

          {/* ✅ Search Product */}
          <div style={{ marginBottom: "15px" }}>
            <label>Product</label>
            <Select
              options={productOptions}
              placeholder="Cari product..."
              onChange={(selected) =>
                setForm({
                  ...form,
                  product_id: selected.value,
                })
              }
            />
          </div>

          <div>
            <label>Qty</label>
            <input
              type="number"
              value={form.qty}
              onChange={(e) =>
                setForm({
                  ...form,
                  qty: e.target.value,
                })
              }
            />
          </div>

          <button type="submit">Save</button>
        </form>
      </div>
    </>
  );
};

export default AddCustomerProduct;