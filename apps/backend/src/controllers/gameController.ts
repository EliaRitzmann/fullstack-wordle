import express, { Request, Response } from "express";
import { startGame } from "../services/gameService";

const router = express.Router();

router.get("/start", async (req: Request, res: Response) => {
  try {
    const { username, maxNumberOfGuesses = 6, wordLength = 5 } = req.query;

    // Validate required parameters
    if (!username || !maxNumberOfGuesses || !wordLength) {
      return res.status(400).json({
        error:
          "Missing parameters. Please provide a username and optionally maxNumberOfGuesses and wordLength.",
      });
    }

    if (typeof username !== "string" || username.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid username. Must be a non-empty string." });
    }

    if (username.length < 4 || username.length > 20) {
      return res.status(400).json({
        error: "Invalid username. Must be between 4 and 20 characters.",
      });
    }

    const maxNumberOfGuessesNumber = parseInt(maxNumberOfGuesses as string, 10);
    const wordLengthNumber = parseInt(wordLength as string, 10);

    if (
      isNaN(maxNumberOfGuessesNumber) ||
      maxNumberOfGuessesNumber < 1 ||
      maxNumberOfGuessesNumber > 10
    ) {
      return res.status(400).json({
        error:
          "Invalid maxNumberOfGuesses. Must be an integer between 1 and 10.",
      });
    }

    if (isNaN(wordLengthNumber) || wordLengthNumber <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid wordLength. Must be a positive integer." });
    }

    const gameResponse = await startGame(
      username as string,
      maxNumberOfGuessesNumber,
      wordLengthNumber
    );

    res.status(200).json(gameResponse);
  } catch (error) {
    console.error("Error starting game:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

export default router;
