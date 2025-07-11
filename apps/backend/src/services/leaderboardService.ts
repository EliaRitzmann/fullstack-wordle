import prisma from "../config/database";
import { leaderboard } from "../types/types";

export const getLeaderboard = async (): Promise<leaderboard> => {
  const leaderboard =
    await prisma.$queryRaw<leaderboard>`SELECT "username", "word", "startedAt", "endedAt", "numberOfGuesses",
        EXTRACT(EPOCH FROM "endedAt" - "startedAt") AS "durationSeconds"
     FROM "Game"
     WHERE status = 'won'
     ORDER BY "durationSeconds" ASC
     LIMIT 10`;

  return leaderboard;
};
