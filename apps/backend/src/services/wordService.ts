import { Word } from "@prisma/client";
import prisma from "../config/database";

export const getRandomWord = async (wordLength: number): Promise<Word> => {
  const numberOfWordsWithLength = await prisma.word.count({
    where: {
      languageCode: "en",
      wordLength: wordLength,
    },
  });

  if (numberOfWordsWithLength === 0) {
    throw new Error(`No words found with length ${wordLength}`);
  }

  const randomOffset = Math.floor(Math.random() * numberOfWordsWithLength);

  const randomWordObject = await prisma.word.findFirst({
    where: {
      languageCode: "en",
      wordLength: wordLength,
    },
    skip: randomOffset,
  });

  if (!randomWordObject) {
    throw new Error("Failed to find a word");
  }

  return randomWordObject;
};

export const checkIfWordExists = async (word: string): Promise<Boolean> => {
  const wordObject = await prisma.word.findFirst({
    where: {
      languageCode: "en",
      word: word,
    },
  });

  return !!wordObject;
};

export const checkGuess = (word: string, guess: string): string => {
  return Array.from({ length: word.length }, (_, i) => {
    if (word[i].toLowerCase() === guess[i].toLowerCase()) {
      return "+";
    }
    if (word.includes(guess[i])) {
      return "*";
    }
    return "-";
  }).join("");
};
