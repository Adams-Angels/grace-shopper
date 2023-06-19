const authRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SALT_ROUNDS = 10;
const { authRequired } = require("./utils");
const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
const { JWT_SECRET } = process.env;
const token = jwt.sign(user, JWT_SECRET);
