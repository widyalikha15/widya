import CustomerProduct from "../models/CustomerProductModels.js";
import Customer from "../models/CustomerModels.js";
import Product from "../models/ProductModels.js";

export const getAllCustomerProducts = async (req, res) => {
  try {
    const response = await CustomerProduct.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
          attributes: ["name"],
        },
        {
          model: Product,
          as: "product",
          attributes: ["name", "url"],
        },
      ],
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const getCustomerProductById = async (req, res) => {
  try {
    const response = await CustomerProduct.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

export const createCustomerProduct = async (req, res) => {
  try {
    const { customer_id, product_id, qty } = req.body;

    await CustomerProduct.create({
      customer_id,
      product_id,
      qty,
    });

    res.status(201).json({
      msg: "Customer product berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateCustomerProduct = async (req, res) => {
  try {
    const { customer_id, product_id, qty } = req.body;

    await CustomerProduct.update(
      {
        customer_id,
        product_id,
        qty,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(200).json({
      msg: "Customer product berhasil diupdate",
    });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteCustomerProduct = async (req, res) => {
  try {
    await CustomerProduct.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      msg: "Customer product berhasil dihapus",
    });
  } catch (error) {
    console.log(error.message);
  }
};