export type GameResponse = {
  gameId: string;
  username: string;
  maxNumberOfGuesses: number;
  wordLength: number;
  status: GameStatus;
  guesses: GuessResponse[];
  startedAt: Date;
  endedAt?: Date; // Only present if game is won or lost
  correctWord?: string; // Only present if game is won or lost
};

export type GuessResponse = {
  guessId: string;
  currentTry: number;
  maxTries: number;
  username: string;
  yourGuess: string;
  guessResult: string; // A string like "CXX", indicating feedback for each letter
};

export type leaderboardEntry = {
  username: string;
  startedAt: Date;
  endedAt: Date;
  maxNumberOfGuesses: number;
  word: string;
  durationSeconds?: number;
};

export type leaderboard = {
  entries: leaderboardEntry[];
}

export type GameStatus = "active" | "won" | "lost";
