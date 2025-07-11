import express, { NextFunction, Request, Response } from "express";
import { getLeaderboard } from "../services/leaderboardService";
import { leaderboard } from "../types/types";

const router = express.Router();

/**
 * @swagger
 * /leaderboard:
 *   get:
 *     summary: Get top 10 leaderboard entries
 *     description: Returns the top 10 players who won the game in the shortest time.
 *     tags:
 *       - Leaderboard
 *     responses:
 *       200:
 *         description: A list of top leaderboard entries
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 entries:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       username:
 *                         type: string
 *                         example: johndoe
 *                       startedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-11T14:30:00Z
 *                       endedAt:
 *                         type: string
 *                         format: date-time
 *                         example: 2025-07-11T14:34:21Z
 *                       maxNumberOfGuesses:
 *                         type: integer
 *                         example: 5
 *                       word:
 *                         type: string
 *                         example: apple
 *                       durationSeconds:
 *                         type: number
 *                         format: float
 *                         example: 261.0
 *       500:
 *         description: Internal server error
 */
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const leaderboard: leaderboard = await getLeaderboard();
    res.status(200).json(leaderboard);
  } catch (error) {
    next(error);
  }
});

export default router;
