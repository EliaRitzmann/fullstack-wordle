import { Game } from "@prisma/client";
import prisma from "../config/database";
import { getRandomWord } from "./wordService";
import { GameResponse, GameStatus } from "../types/types";

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
    id: game.id,
    username: game.username,
    maxNumberOfGuesses: game.numberOfGuesses,
    wordLength: game.word.length,
    status: game.status as GameStatus,
  };

  return gameResponse;
};
