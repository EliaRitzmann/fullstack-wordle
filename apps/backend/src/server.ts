import express from "express";
import gameController from "./controllers/gameController";
import leaderboardController from "./controllers/leaderboardController";

const app = express();

app.use(express.json());

// Routen/Controller
app.use("/games", gameController);
app.use("/leaderboard", leaderboardController);

//Start server
const PORT = 3000;
app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
