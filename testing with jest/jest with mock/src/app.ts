import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
dotenv.config({
  path: process.env.NODE_ENVIORMENT === "production" ? ".env" : ".env.test",
});
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(cookieParser());

// Routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;
