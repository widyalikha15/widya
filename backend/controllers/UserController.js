import { where } from "sequelize";
import User from "../models/UserModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const getUsers = async(req, res) => {
    try {
        const response = await User.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const CreateUser = async(req, res) => {
    try {
        await User.create(req.body);
        res.status(201).json({msg: "User Created"});
    } catch (error) {
        console.log(error.message);
    }
}

export const UpdateUser = async (req, res) => {
  try {
    await User.update(
      {
        ...req.body,
        last_profile_update: new Date(),
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    res.status(201).json({ msg: "User Updated" });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id: req.params.id
            }
        });
        res.status(201).json({msg: "User Deleted"});
    } catch (error) {
        console.log(error.message);
    }
}
 
export const Register = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.json({msg: "Register Berhasil"});
    } catch (error) {
        console.log(error);
    }
}
 
export const Login = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!user) {
      return res.status(404).json({ msg: "Email tidak ditemukan" });
    }

    const match = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!match) {
      return res.status(400).json({ msg: "Wrong Password" });
    }

    const userId = user.id;
    const name = user.name;
    const email = user.email;

    const accessToken = jwt.sign(
      { userId, name, email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "20s" }
    );

    const refreshToken = jwt.sign(
      { userId, name, email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    await User.update(
      {
        refresh_token: refreshToken,
        last_login: new Date(),
        login_device:
          req.headers["user-agent"] || "Unknown Device",
      },
      {
        where: { id: userId },
      }
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.json({ accessToken });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

export const Logout = async(req, res) => {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken) return res.sendStatus(204);
    const user = await User.findAll({
        where:{
            refresh_token: refreshToken
        }
    });
    if(!user[0]) return res.sendStatus(204);
    const userId = user[0].id;
    await User.update({refresh_token: null},{
        where:{
            id: userId
        }
    });
    res.clearCookie('refreshToken');
    return res.sendStatus(200);
}