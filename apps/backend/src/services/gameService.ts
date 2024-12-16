import { Game, Guess } from "@prisma/client";
import prisma from "../config/database";
import { checkGuess, checkIfWordExists, getRandomWord } from "./wordService";
import { GameResponse, GameStatus, GuessResponse } from "../types/types";
import createHttpError from "http-errors";

export const startGame = async (
  username: string,
  maxNumberOfGuesses: number,
  wordLength: number
): Promise<GameResponse> => {
  const randomWordObject = await getRandomWord(wordLength);

  const game: Game = await prisma.game.create({
    data: {
      username: username,
      word: randomWordObject.word,
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

  let correctWordResponse: string | undefined;

  if (game.status === "won" || game.status === "lost") {
    correctWordResponse = game.word;
  }

  return {
    gameId: game.id,
    username: game.username,
    maxNumberOfGuesses: game.numberOfGuesses,
    wordLength: game.word.length,
    status: game.status as GameStatus,
    correctWord: correctWordResponse,
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

  if ((await checkIfWordExists(wordGuess)) === false) {
    throw createHttpError(
      400,
      "Invalid guess. Word does not exist in the dictionary."
    );
  }

  const currentNumberOfGuesses = game.guesses.length + 1;

  const guessResult = checkGuess(game.word, wordGuess);

  const guess: Guess = await prisma.guess.create({
    data: {
      gameId: gameId,
      guess: wordGuess,
      guessResult: guessResult,
    },
  });

  let newGameState = game.status;

  // Update game status if the player has won or lost
  if (guessResult === "+".repeat(game.word.length)) {
    newGameState = "won";
  } else if (game.numberOfGuesses === currentNumberOfGuesses) {
    newGameState = "lost";
  }

  await prisma.game.update({
    where: {
      id: gameId,
    },
    data: {
      status: newGameState,
    },
  });

  const guessResponse: GuessResponse = {
    guessId: guess.id,
    currentTry: currentNumberOfGuesses,
    maxTries: game.numberOfGuesses,
    username: game.username,
    yourGuess: guess.guess,
    guessResult: guess.guessResult,
    gameStatus: newGameState as GameStatus,
  };

  return guessResponse;
};
