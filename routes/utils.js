const jwt = require("jsonwebtoken");

const authRequired = (req, res, next) => {
  try {
    const token = req.signedCookies.token;
    req.user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    res.status(401).send({
      name: "Unauthorized",
      message: "You must be logged in to do that",
      data: null,
    });
    return;
  }
  next();
};

const checkAdmin = (req, res, next) => {
  try {
    const { user } = req;
    if (user.is_admin) {
      next();
    }
  } catch (error) {
    res.status(403).json({
      error: "Unauthorized",
    });
  }
};

module.exports = { authRequired, checkAdmin };
