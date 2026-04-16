import Customer from "../models/CustomerModels.js";
import { Op } from "sequelize";

// ✅ GET ALL + PAGINATION + SEARCH
export const getCustomers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search_query || "";
    const offset = limit * page;

    const totalRows = await Customer.count({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
    });

    const totalPage = Math.ceil(totalRows / limit);

    const result = await Customer.findAll({
      where: {
        [Op.or]: [
          {
            name: {
              [Op.like]: "%" + search + "%",
            },
          },
          {
            email: {
              [Op.like]: "%" + search + "%",
            },
          },
        ],
      },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    res.json({
      result,
      page,
      limit,
      totalRows,
      totalPage,
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ✅ GET BY ID
export const getCustomerById = async (req, res) => {
  try {
    const response = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    res.json(response);
  } catch (error) {
    console.log(error.message);
  }
};

// ✅ CREATE
export const saveCustomer = async (req, res) => {
  try {
    await Customer.create(req.body);

    res.status(201).json({
      msg: "Customer berhasil ditambahkan",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ✅ UPDATE
export const updateCustomer = async (req, res) => {
  try {
    await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      msg: "Customer berhasil diupdate",
    });
  } catch (error) {
    console.log(error.message);
  }
};

// ✅ DELETE
export const deleteCustomer = async (req, res) => {
  try {
    await Customer.destroy({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      msg: "Customer berhasil dihapus",
    });
  } catch (error) {
    console.log(error.message);
  }
};