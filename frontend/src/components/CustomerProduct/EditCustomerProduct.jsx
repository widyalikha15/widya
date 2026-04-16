import React, { useEffect, useState, useCallback } from "react";
import Select from "react-select";
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Layout/Navbar";
import {
  fetchCustomerProductById,
  updateCustomerProduct,
} from "../../Services/customerProductService";
import { fetchCustomers } from "../../Services/customerService";
import { fetchProducts } from "../../Services/productService";

const EditCustomerProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);

  const [form, setForm] = useState({
    customer_id: "",
    product_id: "",
    qty: 1,
  });

  const loadData = useCallback(async () => {
    try {
      const detailRes = await fetchCustomerProductById(id);
      const customerRes = await fetchCustomers();
      const productRes = await fetchProducts();

      setForm({
        customer_id: detailRes.data.customer_id,
        product_id: detailRes.data.product_id,
        qty: detailRes.data.qty,
      });

      setCustomers(customerRes.data.result || []);
      setProducts(productRes.data || []);
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const updateData = async (e) => {
    e.preventDefault();

    try {
      await updateCustomerProduct(id, form);
      navigate("/customer-products");
    } catch (error) {
      console.error(error);
    }
  };

  const customerOptions = customers.map((customer) => ({
    value: customer.id,
    label: customer.name,
  }));

  const productOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  return (
    <>
      <Navbar />

      <div>
        <h2>Edit Customer Product</h2>

        <form onSubmit={updateData}>
          {/* ✅ Search Customer */}
          <div style={{ marginBottom: "15px" }}>
            <label>Customer</label>
            <Select
              options={customerOptions}
              value={customerOptions.find(
                (option) => option.value === form.customer_id
              )}
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
              value={productOptions.find(
                (option) => option.value === form.product_id
              )}
              onChange={(selected) =>
                setForm({
                  ...form,
                  product_id: selected.value,
                })
              }
            />
          </div>

          {/* ✅ Qty */}
          <div style={{ marginBottom: "15px" }}>
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

          <button type="submit">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditCustomerProduct;