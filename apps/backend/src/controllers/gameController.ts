import express, { Request, Response } from "express";
import { getGame, makeGuess, startGame } from "../services/gameService";
import { validateRequest } from "../middlewares/validateRequest";
import {
  getGameByIdSchema,
  postMakeGuessSchema,
  postStartGameSchema,
} from "../schemas/gameSchemas";

const router = express.Router();

router.post(
  "/start",
  validateRequest(postStartGameSchema),
  async (req: Request, res: Response) => {
    const {
      username,
      maxNumberOfGuesses = 6,
      wordLength = 5,
    } = req.query as Record<string, string>;

    const gameResponse = await startGame(
      username,
      Number(maxNumberOfGuesses),
      Number(wordLength)
    );
    res.status(200).json(gameResponse);
  }
);

router.get(
  "/:gameId",
  validateRequest(getGameByIdSchema),
  async (req: Request, res: Response) => {
    const { gameId } = req.params as Record<string, string>;

    const gameResponse = await getGame(gameId);

    res.status(200).json(gameResponse);
  }
);

router.post(
  "/guess",
  validateRequest(postMakeGuessSchema),
  async (req: Request, res: Response) => {
    const { gameId, wordGuess } = req.query as Record<string, string>;

    const guessResponse = await makeGuess(gameId, wordGuess);

    res.status(200).json(guessResponse);
  }
);

export default router;
