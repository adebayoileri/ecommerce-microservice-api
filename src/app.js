import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoutes from "./routes/authRoutes";
import productRoutes from "./routes/productRoutes";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect(
  process.env.DB_URL,
  { autoIndex: false, useUnifiedTopology: true, useNewUrlParser: true },
  (err, success) => {
    if (err) {
      console.log(err);
    }
    if (success) {
      console.log("Database connected");
    }
  }
);

app.get("/", async (req, res) => {
  return res.status(200).json({
    message: "e-commerce microservice api",
    status: "success",
  });
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);

const PORT = process.env.PORT || 4200;

app.listen(PORT, () => {
  console.log("server up and running");
});
