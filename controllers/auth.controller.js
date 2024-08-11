import { User } from "../models/user.model.js";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import "dotenv/config";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const userExist = await User.findOne({ where: { email } });

    if (userExist) {
      return res.status(400).json({
        success: false,
        message: "Такой пользователь уже существует",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message: "Пароль должен содержать не менее 6 символов",
      });
    }

    await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
    });

    return res.status(200).json({
      success: true,
      message: "Регистрация прошла успешно",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Пожалуйста, введите все поля", success: false });
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(400).json({ message: "Пользователь не существует", success: false, });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Пароль должен содержать не менее 6 символов", success: false, });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(400).json({ message: "Неверные пароль или почта" });
    }

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
      algorithm: "HS256",
    });

    res.status(200).json({
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
      message: "Успешная авторизация",
      success: true,
    });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
