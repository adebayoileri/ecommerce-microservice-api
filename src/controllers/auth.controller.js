import User from "../models/user.model";
import { validateUserSignup, validateLogin } from "../middlewares/auth";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * @name AuthController
 * @description performs and handles all authentication actions
 */

class AuthController {
  static async signup(req, res) {
    const { name, email, password } = req.body;
    try {
      const responseValidation = validateUserSignup({
        name,
        email,
        password,
      });
      if (responseValidation.error) {
        throw new Error(responseValidation.error);
      }
      const existingUser = await User.findOne({
        email: email,
      });

      if (existingUser) {
        throw new Error("a user already exists with this email address");
      }

      let salt = await bcrypt.genSalt(10);
      let hashedPassword = await bcrypt.hash(password, salt);
      await new User({
        name,
        email,
        password: hashedPassword,
      }).save();
      const newUser = await User.findOne({ email: email });
      jwt.sign(
        {
          email: newUser.email,
          password: newUser.password,
          userId: newUser._id,
        },
        process.env.AUTHKEY,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            throw new Error(err);
          }
          if (token) {
            return res.status(201).json({
              status: "success",
              message: "user signup successful",
              data: newUser,
              token,
            });
          }
        }
      );
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
  static async login(req, res) {
    const { email, password } = req.body;
    try {
      const responseValidation = validateLogin({ email, password });

      if (responseValidation.error) {
        throw new Error(responseValidation.error);
      }
      const userExists = await User.findOne({
        email: email,
      });

      if (!userExists) {
        throw new Error("user with this email address doesn't exists");
      }

      const match = await bcrypt.compare(password, userExists.password);
      if (!match) {
        throw new Error("invalid password");
      }
      jwt.sign(
        { email, password, userId: userExists._id },
        process.env.AUTHKEY,
        { expiresIn: "72h" },
        (err, token) => {
          if (err) {
            throw new Error(err);
          } else {
            return res.status(200).json({
              status: "success",
              data: userExists,
              token,
            });
          }
        }
      );
    } catch (error) {
      return res.status(400).json({
        status: "failed",
        message: error.message,
      });
    }
  }
}

export default AuthController;
