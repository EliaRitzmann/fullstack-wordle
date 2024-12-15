import { checkGuess } from "../../src/services/wordService";

describe("checkGuess", () => {
  it('should return exact matches with "+" for correct letters in correct positions', () => {
    const word = "apple";
    const guess = "apple";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("+++++");
  });

  it('should return "-" for completely incorrect guesses', () => {
    const word = "apple";
    const guess = "zzzzz";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("-----");
  });

  it('should return "*" for correct letters in wrong positions', () => {
    const word = "apple";
    const guess = "pleap";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("*****");
  });

  it('should prioritize exact matches ("+") over wrong position matches ("*")', () => {
    const word = "apple";
    const guess = "apppl";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("+++**");
  });

  it("should handle duplicate letters in the guess correctly", () => {
    const word = "apple";
    const guess = "ppppp";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("*++**");
  });

  it("should handle duplicate letters in the word correctly", () => {
    const word = "ppppp";
    const guess = "apple";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("-++--");
  });

  it("should not be case insensitive", () => {
    const word = "Apple";
    const guess = "apple";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("+++++");
  });

  it("should handle mismatched lengths by truncating the feedback to word length", () => {
    const word = "apple";
    const guess = "applesauce";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("+++++");
  });

  it("should handle correct guesses with only one incorrect guess", () => {
    const word = "apple";
    const guess = "applz";
    const feedback = checkGuess(word, guess);
    expect(feedback).toBe("++++-");
  });
});
