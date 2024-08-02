import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import "dotenv/config";
import db from "./config/db.js";

import todoRoutes from "./routes/todo.router.js";
import authRoutes from "./routes/auth.router.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/todos", todoRoutes);
app.use("/api/auth", authRoutes);


app.use(helmet());
app.use(morgan("dev"));

const corsConfig = {
  origin: "*",
  credential: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
};

try {
  await db.authenticate();
  console.log("Database connected...");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}


app.options("*", cors(corsConfig));

app.use(cors(corsConfig));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";
  res.status(err.statusCode).json({
    message: err.message,
  });
});

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(process.env.PORT, () => {
  console.log("Server is running");
});
