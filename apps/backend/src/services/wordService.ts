export const getRandomWord = async (wordLength: number) => {
  return "randomWord";
};

export const checkIfWordExists = async (word: string) => {
  return true;
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
