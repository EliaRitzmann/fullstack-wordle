export type GameResponse = {
  gameId: string;
  username: string;
  maxNumberOfGuesses: number;
  wordLength: number;
  status: GameStatus;
  guesses: GuessResponse[];
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

export type GameStatus = "active" | "won" | "lost";
