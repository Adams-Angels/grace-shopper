const usersRouter = require("express").Router();
const { authRequired } = require("./utils");
const { getAllUsers, getUserById } = require("../db/adapters/users");

usersRouter.get("/me", authRequired, async (req, res, next) => {
  res.send({ success: true, message: "you are authorized", user: req.user });
});

usersRouter.get("/", async (req, res, next) => {
  try {
    const users = await getAllUsers();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

usersRouter.get(`/:id`, async (req, res, next) => {
  try {
    const id = req.params.id;
    const userById = await getUserById(id);
    res.send({
      userById,
    });
  } catch (error) {
    next(error);
  }
});
module.exports = usersRouter;
