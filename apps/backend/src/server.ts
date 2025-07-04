import express from "express";
import cors from "cors";
import gameController from "./controllers/gameController";
import leaderboardController from "./controllers/leaderboardController";
import { connectToDatabase } from "./config/database";
import { errorMiddleware } from "./middlewares/exceptionHandling";
import envConfig from "./config/env";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./config/swagger.config";

export const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// Swagger
if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/openapi.json", (req, res) => res.json(swaggerSpec));
}

// Routes
app.use("/game", gameController);
app.use("/leaderboard", leaderboardController);

// Error handling
app.use(errorMiddleware);

//Start server
const PORT = 3000;

(async () => {
  await connectToDatabase();

  app.listen(3000, () => {
    console.log(
      `Server running on http://localhost:${PORT} in ${envConfig.nodeEnv} mode`
    );
    console.log(`Swagger docs available at http://localhost:${PORT}/api-docs`);
  });
})();
