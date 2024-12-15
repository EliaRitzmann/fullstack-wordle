import express from "express";
import gameController from "./controllers/gameController";
import leaderboardController from "./controllers/leaderboardController";
import { connectToDatabase } from "./config/database";
import { errorMiddleware } from "./middlewares/exceptionHandling";
import envConfig from "./config/env";

const app = express();

app.use(express.json());

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
  });
})();
