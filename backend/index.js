import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import router from "./routes/index.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
global.__filename = fileURLToPath(import.meta.url);
global.__dirname = path.dirname(__filename);

dotenv.config();

const app = express();

try {
  await db.authenticate();
  console.log("Database Connected");
} catch (error) {
  throw error;
  console.error("Connection Error:", error);
}

app.use(express.static("resources/static/assets"));
app.use(cookieParser());
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:4200" }));
app.use("", router);

app.listen(4040, () => console.log("Server Running At Port: 4040"));
