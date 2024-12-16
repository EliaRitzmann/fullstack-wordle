import express, { NextFunction, Request, Response } from "express";
import { getGame, makeGuess, startGame } from "../services/gameService";
import { validateRequest } from "../middlewares/validateRequest";
import {
  getGameByIdSchema,
  postMakeGuessSchema,
  postStartGameSchema,
} from "../schemas/gameSchemas";

const router = express.Router();

/**
 * @swagger
 * /game/start:
 *   post:
 *     summary: Start a new game
 *     description: Start a new game with the given username, maximum number of guesses, and word length.
 *     parameters:
 *       - in: query
 *         name: username
 *         required: true
 *         description: The username of the player. Must be 4-20 characters long and only contain lowercase letters.
 *         schema:
 *           type: string
 *           example: "jerome"
 *       - in: query
 *         name: maxNumberOfGuesses
 *         required: false
 *         description: The maximum number of guesses allowed. Must be between 1 and 10. Defaults to 6.
 *         schema:
 *           type: integer
 *           example: 6
 *       - in: query
 *         name: wordLength
 *         required: false
 *         description: The length of the word to guess. Must be greater than 3. Defaults to 5.
 *         schema:
 *           type: integer
 *           example: 5
 *     responses:
 *       200:
 *         description: Successfully retrieved the game details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gameId:
 *                   type: string
 *                   description: The unique ID of the game.
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 username:
 *                   type: string
 *                   description: The username of the player.
 *                   example: "playerone"
 *                 maxNumberOfGuesses:
 *                   type: integer
 *                   description: The maximum number of guesses allowed for the game.
 *                   example: 6
 *                 wordLength:
 *                   type: integer
 *                   description: The length of the word to guess.
 *                   example: 5
 *                 status:
 *                   type: string
 *                   description: The current status of the game.
 *                   enum:
 *                     - "ACTIVE"
 *                     - "WON"
 *                     - "LOST"
 *                   example: "ACTIVE"
 *                 guesses:
 *                   type: array
 *                   description: List of guesses made by the player.
 *                   items:
 *                     type: object
 *                     properties:
 *                       guessId:
 *                         type: string
 *                         description: The unique ID of the guess.
 *                         example: "550e8400-e29b-41d4-a716-446655440012"
 *                       guessWord:
 *                         type: string
 *                         description: The guessed word.
 *                         example: "apple"
 *                       feedback:
 *                         type: string
 *                         description: Feedback for the guess.
 *                         example: "--++-*"
 *                 correctWord:
 *                   type: string
 *                   description: The correct word for the game (only present if the game is won or lost).
 *                   example: "apple"
 *       400:
 *         description: Bad request due to invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A description of the validation error.
 *                   example: "maxNumberOfGuesses must be between 1 and 10"
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/start",
  validateRequest(postStartGameSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
    } catch (error) {
      next(error);
    }
  }
);

/**
/**
 * @swagger
 * /game/{gameId}:
 *   get:
 *     summary: Retrieve game details
 *     description: Fetch the details of a specific game using its unique gameId.
 *     parameters:
 *       - in: path
 *         name: gameId
 *         required: true
 *         description: The unique identifier of the game. Must be a valid UUID.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *     responses:
 *       200:
 *         description: Successfully retrieved the game details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 gameId:
 *                   type: string
 *                   description: The unique ID of the game.
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 username:
 *                   type: string
 *                   description: The username of the player.
 *                   example: "playerone"
 *                 maxNumberOfGuesses:
 *                   type: integer
 *                   description: The maximum number of guesses allowed for the game.
 *                   example: 6
 *                 wordLength:
 *                   type: integer
 *                   description: The length of the word to guess.
 *                   example: 5
 *                 status:
 *                   type: string
 *                   description: The current status of the game.
 *                   enum:
 *                     - "ACTIVE"
 *                     - "WON"
 *                     - "LOST"
 *                   example: "ACTIVE"
 *                 correctWord:
 *                   type: string
 *                   description: The correct word for the game (only present if the game is won or lost).
 *                   example: "apple"
 *                 guesses:
 *                   type: array
 *                   description: List of guesses made by the player.
 *                   items:
 *                     type: object
 *                     properties:
 *                       guessId:
 *                         type: string
 *                         description: The unique ID of the guess.
 *                         example: "550e8400-e29b-41d4-a716-446655440012"
 *                       currentTry:
 *                         type: integer
 *                         description: The current attempt number for this guess.
 *                         example: 2
 *                       maxTries:
 *                         type: integer
 *                         description: The maximum number of tries allowed for this game.
 *                         example: 6
 *                       username:
 *                         type: string
 *                         description: The username of the player making the guess.
 *                         example: "jerome"
 *                       yourGuess:
 *                         type: string
 *                         description: The word guessed by the player.
 *                         example: "apple"
 *                       guessResult:
 *                         type: string
 *                         description: Feedback for the guess, indicating letter correctness. "-" for not in word, "*" for in word and "+" for correct position.
 *                         example: "--++-*"
 *       400:
 *         description: Bad request due to invalid gameId format.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The validation error message.
 *                   example: "Invalid gameId. Must be a valid UUID."
 *       404:
 *         description: Game not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The error message indicating the game was not found.
 *                   example: "No game found with id 550e8400-e29b-41d4-a716-446655440000."
 *       500:
 *         description: Internal server error.
 */
router.get(
  "/:gameId",
  validateRequest(getGameByIdSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { gameId } = req.params as Record<string, string>;

      const gameResponse = await getGame(gameId);

      res.status(200).json(gameResponse);
    } catch (error) {
      next(error);
    }
  }
);

/**
 * @swagger
 * /game/guess:
 *   post:
 *     summary: Submit a word guess for a game
 *     description: Make a guess for the word in a specific game. The gameId and the wordGuess must be provided.
 *     parameters:
 *       - in: query
 *         name: gameId
 *         required: true
 *         description: The unique identifier of the game. Must be a valid UUID.
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "550e8400-e29b-41d4-a716-446655440000"
 *       - in: query
 *         name: wordGuess
 *         required: true
 *         description: The word being guessed. Must be a non-empty string.
 *         schema:
 *           type: string
 *           example: "apple"
 *     responses:
 *       200:
 *         description: Successfully submitted the guess.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 guessId:
 *                   type: string
 *                   description: The unique ID of the guess.
 *                   example: "550e8400-e29b-41d4-a716-446655440012"
 *                 currentTry:
 *                   type: integer
 *                   description: The current attempt number for this guess.
 *                   example: 2
 *                 maxTries:
 *                   type: integer
 *                   description: The maximum number of tries allowed for this game.
 *                   example: 6
 *                 username:
 *                   type: string
 *                   description: The username of the player making the guess.
 *                   example: "jerome"
 *                 yourGuess:
 *                   type: string
 *                   description: The word guessed by the player.
 *                   example: "apple"
 *                 guessResult:
 *                   type: string
 *                   description: Feedback for the guess, indicating letter correctness. "-" for not in word, "*" for in word and "+" for correct position.
 *                   example: "--++-*"
 *       400:
 *         description: Bad request due to invalid gameId or wordGuess.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: The validation error message.
 *                   example: "Invalid gameId. Must be a valid UUID."
 *       404:
 *         description: Game not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Error indicating the game was not found.
 *                   example: "No game found with id 550e8400-e29b-41d4-a716-446655440000."
 *       500:
 *         description: Internal server error.
 */
router.post(
  "/guess",
  validateRequest(postMakeGuessSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { gameId, wordGuess } = req.query as Record<string, string>;

      const guessResponse = await makeGuess(gameId, wordGuess);

      res.status(200).json(guessResponse);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
