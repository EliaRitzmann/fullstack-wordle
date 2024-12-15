import { Game, Guess } from "@prisma/client";
import prisma from "../config/database";
import { checkGuess, getRandomWord } from "./wordService";
import { GameResponse, GameStatus, GuessResponse } from "../types/types";
import createHttpError from "http-errors";

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

export const getGame = async (gameId: string): Promise<GameResponse> => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { guesses: true },
  });

  if (!game) {
    throw createHttpError(404, `No game found with id ${gameId}.`);
  }

  return {
    gameId: game.id,
    username: game.username,
    maxNumberOfGuesses: game.numberOfGuesses,
    wordLength: game.word.length,
    status: game.status as GameStatus,
    guesses: game.guesses.map(
      (guess: Guess) =>
        ({
          guessId: guess.id,
          currentTry: game.guesses.indexOf(guess) + 1,
          maxTries: game.numberOfGuesses,
          username: game.username,
          yourGuess: guess.guess,
          guessResult: guess.guessResult,
        } as GuessResponse)
    ),
  };
};

export const makeGuess = async (
  gameId: string,
  wordGuess: string
): Promise<GuessResponse> => {
  const game = await prisma.game.findUnique({
    where: {
      id: gameId,
    },
    include: { guesses: true },
  });

  if (!game) {
    throw createHttpError(404, `No game found with id ${gameId}.`);
  }

  if (game.status !== "active") {
    throw createHttpError(400, `Game with id ${gameId} is not active.`);
  }

  if (game.numberOfGuesses === game.guesses.length) {
    throw createHttpError(400, `Game with id ${gameId} has ended.`);
  }

  if (wordGuess.length !== game.word.length) {
    throw createHttpError(
      400,
      `Invalid guess. Must be ${game.word.length} characters long.`
    );
  }

  if (!/^[a-zA-Z]+$/.test(wordGuess)) {
    throw createHttpError(400, "Invalid guess. Must contain only letters.");
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
    guessId: guess.id,
    currentTry: game.guesses.length,
    maxTries: game.numberOfGuesses,
    username: game.username,
    yourGuess: guess.guess,
    guessResult: guess.guessResult,
    gameStatus: game.status as GameStatus,
  };

  return guessResponse;
};
