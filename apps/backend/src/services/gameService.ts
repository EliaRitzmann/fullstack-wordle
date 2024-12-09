import { Game, Guess } from "@prisma/client";
import prisma from "../config/database";
import { getRandomWord } from "./wordService";
import { GameResponse, GameStatus, GuessResponse } from "../types/types";

export const startGame = async (
  username: string,
  maxNumberOfGuesses: number,
  wordLength: number
): Promise<GameResponse> => {
  const randomWord = await getRandomWord(wordLength);

  const game: Game = await prisma.game.create({
    data: {
      username: username,
      word: randomWord,
      numberOfGuesses: maxNumberOfGuesses,
      status: "active",
    },
  });

  const gameResponse: GameResponse = {
    gameId: game.id,
    username: game.username,
    maxNumberOfGuesses: game.numberOfGuesses,
    wordLength: game.word.length,
    status: game.status as GameStatus,
    guesses: [],
  };

  return gameResponse;
};

export const getGame = async (gameId: number): Promise<GameResponse> => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { guesses: true },
  });

  if (!game) {
    throw new Error(`No game found with id ${gameId}.`);
  }

  const gameResponse: GameResponse = {
    gameId: game.id,
    username: game.username,
    maxNumberOfGuesses: game.numberOfGuesses,
    wordLength: game.word.length,
    status: game.status as GameStatus,
    guesses: game.guesses.map(
      (guess: Guess) =>
        ({
          currentTry: guess.id,
          maxTries: game.numberOfGuesses,
          username: game.username,
          yourGuess: guess.guess,
          guessResult: guess.guessResult,
          status: game.status as GameStatus,
        } as GuessResponse)
    ),
  };
  return gameResponse;
};

export const makeGuess = async (
  gameId: number,
  wordGuess: string
): Promise<GuessResponse> => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { guesses: true },
  });

  if (!game) {
    throw new Error(`No game found with id ${gameId}.`);
  }

  if (game.status !== "active") {
    throw new Error(`Game with id ${gameId} is not active.`);
  }

  const guessResult = checkGuess(game.word, wordGuess);

  const guess: Guess = await prisma.guess.create({
    data: {
      gameId: gameId,
      guess: wordGuess,
      guessResult: guessResult,
    },
  });

  // Update game status if the player has won or lost
  if (guessResult === "+".repeat(game.word.length)) {
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        status: "won",
      },
    });
  } else if (game.numberOfGuesses === game.guesses.length + 1) {
    await prisma.game.update({
      where: {
        id: gameId,
      },
      data: {
        status: "lost",
      },
    });
  }

  const guessResponse: GuessResponse = {
    currentTry: game.guesses.length,
    maxTries: game.numberOfGuesses,
    username: game.username,
    yourGuess: guess.guess,
    guessResult: guess.guessResult,
    status: game.status as GameStatus,
  };

  return guessResponse;
};

const checkGuess = (word: string, guess: string): string => {
  let feedback = "";

  word = word.toLowerCase();
  guess = guess.toLowerCase();

  const wordLetterCount = new Map<string, number>();

  for (const char of word) {
    wordLetterCount.set(char, (wordLetterCount.get(char) || 0) + 1);
  }

  // Step 1: Check for exact matches (correct letter in the correct position)
  for (let i = 0; i < word.length; i++) {
    if (guess[i] === word[i]) {
      feedback += "+";
      wordLetterCount.set(word[i], wordLetterCount.get(word[i])! - 1); // Decrease the count for that letter
    } else {
      feedback += "-";
    }
  }

  // Step 2: Check for letters in the wrong position (correct letter, wrong place)
  for (let i = 0; i < word.length; i++) {
    if (feedback[i] === "-" && wordLetterCount.get(guess[i])! > 0) {
      feedback = feedback.substring(0, i) + "*" + feedback.substring(i + 1); // Update feedback for this letter
      wordLetterCount.set(guess[i], wordLetterCount.get(guess[i])! - 1); // Decrease count for this letter
    }
  }

  return feedback;
};
