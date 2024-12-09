export type GameResponse = {
  id: number;
  username: string;
  maxNumberOfGuesses: number;
  wordLength: number;
  status: GameStatus;
};

export type GuessResponse = {
  id: number;
  username: string;
  guess: string;
  guessResult: string; // A string like "CXX", indicating feedback for each letter
  status: GameStatus;
};

export type GameStatus = "active" | "won" | "lost";
