import express from "express";
import { register, login, getMyProfile, logout } from "../controllers/users.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", register);

router.post("/login", login);

router.get("/logout", logout);  

router.post("/me", isAuthenticated, getMyProfile);

export default router;
