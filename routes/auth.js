const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { createUser, getUserByUsername } = require("../db/adapters/users");

const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const { JWT_SECRET } = process.env;

authRouter.get("/me", authRequired, async (req, res, next) => {
  res.send({ success: true, message: "you are authorized", user: req.user });
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const { username, password, email, is_admin } = req.body;

    const _user = await getUserByUsername(username);
    if (_user) {
      res.status(409);
      next({
        message: "That user already exists!",
        name: "Auth Error",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const user = await createUser({
      username,
      password: hashedPassword,
      email,
      is_admin,
    });
    delete user.password;

    const token = jwt.sign(user, JWT_SECRET);

    res.cookie("token", token, {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });

    res.send({
      success: true,
      message: "Registration Successful!",
      data: user,
    });
  } catch (error) {
    next(error);
  }
});

authRouter.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const _user = await getUserByUsername(username);
    if (username.length === 0) {
      next({
        message: "You must enter a username!",
        name: "Username Error",
      });
      return;
    }
    if (_user.username !== username) {
      next({
        message: "Incorrect Username!",
        name: "Username Error",
      });
      return;
    }
    const match = await bcrypt.compare(password, _user.password);
    const token = jwt.sign(_user, JWT_SECRET);
    if (match === true) {
      res.cookie("token", token, {
        sameSite: "strict",
        httpOnly: true,
        signed: true,
      });
      res.send({
        success: true,
        message: "Login Successful",
        data: _user,
      });
    }
  } catch (error) {
    next(error);
  }
});

authRouter.get("/logout", authRequired, async (req, res, next) => {
  try {
    res.clearCookie("token", {
      sameSite: "strict",
      httpOnly: true,
      signed: true,
    });
    res.send({
      success: true,
      message: "Logged Out!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = authRouter;
