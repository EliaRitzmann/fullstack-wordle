import express from "express";
import gameController from "./controllers/gameController";
import leaderboardController from "./controllers/leaderboardController";
import { connectToDatabase } from "./config/database";

const app = express();

app.use(express.json());

// Routen/Controller
app.use("/game", gameController);
app.use("/leaderboard", leaderboardController);

//Start server
const PORT = 3000;

(async () => {
  await connectToDatabase();

  app.listen(3000, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
})();
