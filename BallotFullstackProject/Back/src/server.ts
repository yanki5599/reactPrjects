import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/envConfig";
import { errorMiddleware } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import candidatesRouter from "./routes/candidatesRouter";
import usersRouter from "./routes/usersRouter";
import adminMiddleware from "./middleware/adminMiddleware";
import authMiddleware from "./middleware/authMiddleware";

connectDB(); // connect to mongoDB
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true, // Required for cookies
  })
);

// Routes
app.use("/api", authRouter);
app.use(authMiddleware);
app.use(adminMiddleware);
app.use("/api/candidates", candidatesRouter);
app.use("/api/users", usersRouter);

// Basic error handling
app.use(errorMiddleware);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
