import express, { Request, Response } from "express";
import { getGame, makeGuess, startGame } from "../services/gameService";

const router = express.Router();

router.post("/start", async (req: Request, res: Response) => {
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

router.get("/:gameId", async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;

    // Validate required parameters
    if (!gameId) {
      return res.status(400).json({
        error: "Missing parameters. Please provide a gameId.",
      });
    }

    const gameIdNumber = parseInt(gameId, 10);

    if (isNaN(gameIdNumber) || gameIdNumber <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid gameId. Must be a positive integer." });
    }

    const gameResponse = await getGame(gameIdNumber);

    res.status(200).json(gameResponse);
  } catch (error) {
    console.error("Error getting game:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

router.post("/guess", async (req: Request, res: Response) => {
  try {
    const { gameId, wordGuess } = req.query;

    // Validate required parameters
    if (!gameId || !wordGuess) {
      return res.status(400).json({
        error: "Missing parameters. Please provide a gameId and guess a word.",
      });
    }

    const gameIdNumber = parseInt(gameId as string, 10);

    if (isNaN(gameIdNumber) || gameIdNumber <= 0) {
      return res
        .status(400)
        .json({ error: "Invalid gameId. Must be a positive integer." });
    }

    if (typeof wordGuess !== "string" || wordGuess.trim() === "") {
      return res
        .status(400)
        .json({ error: "Invalid guess. Must be a non-empty string." });
    }

    const guessResponse = await makeGuess(gameIdNumber, wordGuess);

    res.status(200).json(guessResponse);
  } catch (error) {
    console.error("Error making guess:", error);
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

export default router;
