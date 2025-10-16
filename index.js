import express from "express";
import "dotenv/config";
import wsService from "./services/websocket.services.js";
import router from "./routes/routes.js";
import cors from "cors";
import connectionConfig from "./config/connection.config.js";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
import './libs/cleanUp/index.js';


const port = process.env.PORT || 5000;
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(
  cors({
    origin: [process.env.CLIENT_ORIGIN_1, process.env.CLIENT_ORIGIN_2],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "User-Id"],
  })
);

app.use(express.json());
app.use(cookieParser());



(async ()=>{
 try {
    await connectionConfig.connect();
    const server = app.listen(port,'0.0.0.0',  () => {
      console.log("Server is running on port: " + port);
    });

    app.use("/uploads", express.static(path.join(__dirname, "uploads")));
    app.use("/api", router);

    server.on("upgrade", (req, socket, head) =>
      wsService.handleUpgrade(req, socket, head)
    );

    process.on("SIGINT", async () => {
      console.log("Server shutting down...");
      await connectionConfig.disconnect().then(() => {
        process.exit(0);
      });
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
})()
