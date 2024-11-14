import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { config } from "./config/envConfig";
import { errorMiddleware } from "./middleware/errorHandler";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRouter";
import authMiddleware from "./middleware/authMiddleware";
import { createServer } from "http";
import { initializeSocketServer } from "./socketServer";
import organizationRouter from "./routes/organizationRouter";
import attackerRouter from "./routes/attackerRouter";
import defenderRouter from "./routes/defenderRouter";

connectDB(); // connect to mongoDB
const app = express();

const httpServer = createServer(app);

// Middleware
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173", // Vite default port
    credentials: true, // Required for cookies
  })
);

// Initialize Socket.IO
export const io = initializeSocketServer(httpServer);

// // Routes
app.use("/api", authRouter);
app.use("/api/organization", organizationRouter);
app.use(authMiddleware);

app.use("/api/attacker", attackerRouter);
app.use("/api/defender", defenderRouter);
// Basic error handling
app.use(errorMiddleware);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

httpServer.listen(config.PORT, () => {
  console.log(`Server running on port ${config.PORT}`);
});
