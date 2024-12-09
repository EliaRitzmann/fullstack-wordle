export type GameResponse = {
  gameId: string;
  username: string;
  maxNumberOfGuesses: number;
  wordLength: number;
  status: GameStatus;
  guesses: GuessResponse[];
};

export type GuessResponse = {
  guessId: string;
  currentTry: number;
  maxTries: number;
  username: string;
  yourGuess: string;
  guessResult: string; // A string like "CXX", indicating feedback for each letter
  gameStatus?: GameStatus;
};

export type GameStatus = "active" | "won" | "lost";
