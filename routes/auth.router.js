import express from "express";

import {
    register,
    loginUser,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/reg", register);
router.post("/log", loginUser);



export default router;
