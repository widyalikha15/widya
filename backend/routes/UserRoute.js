import express from "express";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import {
    getUsers, getUserById,
    UpdateUser, deleteUser, Register, Login, Logout
} from "../controllers/UserController.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.patch('/users/:id', UpdateUser);
router.delete('/users/:id', deleteUser);
router.get('/users/:id', getUserById);

export default router;