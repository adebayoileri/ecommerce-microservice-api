import Joi from "joi";
import jwt from "jsonwebtoken";

// checking if header is not undefined, if request is undefined return (403) bad request
const checkToken = (req, res, next) => {
  try {
    const header = req.headers["authorization"];
    if (typeof header !== "undefined") {
      const bearer = header.split(" ");
      const token = bearer[1] || req.token;
      const decodedToken = jwt.verify(token, process.env.AUTHKEY);
      req.user = decodedToken;
      req.token = token;

      next();
    } else {
      throw new Error("unauthorized access");
    }
  } catch (error) {
    return res.status(403).json({
      status: "failed",
      message: error.message,
    });
  }
};

const validateUserSignup = (user) => {
  const JoiSchema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(30).required(),
  }).options({
    abortEarly: false,
  });

  return JoiSchema.validate(user);
};

const validateLogin = (user) => {
  const JoiSchema = Joi.object({
    email: Joi.string().email().min(5).max(50).required(),
    password: Joi.string().min(5).max(30).required(),
  }).options({
    abortEarly: false,
  });

  return JoiSchema.validate(user);
};

export { checkToken, validateUserSignup, validateLogin };
