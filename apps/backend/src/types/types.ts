export type GameResponse = {
  gameId: number;
  username: string;
  maxNumberOfGuesses: number;
  wordLength: number;
  status: GameStatus;
  guesses: GuessResponse[];
};

export type GuessResponse = {
  currentTry: number;
  maxTries: number;
  username: string;
  yourGuess: string;
  guessResult: string; // A string like "CXX", indicating feedback for each letter
  status: GameStatus;
};

export type GameStatus = "active" | "won" | "lost";
