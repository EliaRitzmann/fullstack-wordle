import React, { useState, useRef, useEffect } from "react";
import GameBoardRow from "./GameBoardRow";
import { GameGameIdGet200ResponseGuessesInner } from "../api/generated";

type GameBoardProps = {
  wordLength: number;
  maxGuesses: number;
  guesses: GameGameIdGet200ResponseGuessesInner[];
  onConfirm: (guess: string) => void;
  usedLetters: string[];
};

const GameBoard: React.FC<GameBoardProps> = ({
  wordLength,
  maxGuesses,
  guesses,
  onConfirm,
  usedLetters,
}) => {
  const [currentInput, setCurrentInput] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.activeElement !== inputRef.current) {
        inputRef.current?.focus();
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleInvalid = () => {
    setIsInvalid(true);
    setTimeout(() => setIsInvalid(false), 200); // match animation duration
  };

  const handleKey = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setCurrentInput((prev) => prev.slice(0, -1));
    } else if (/^[a-zA-Z]$/.test(e.key)) {
      if (
        currentInput.length < wordLength &&
        !usedLetters.includes(e.key.toLowerCase())
      ) {
        setCurrentInput((prev) => prev + e.key.toLowerCase());
      } else {
        handleInvalid();
      }
    } else if (e.key === "Enter") {
      if (currentInput.length !== wordLength) return;
      try {
        await onConfirm(currentInput);
        setCurrentInput("");
      } catch (error) {
        console.error("Error confirming guess:", error);
        handleInvalid();
      }
    }
  };

  const rows = Array.from({ length: maxGuesses }).map((_, i) => {
    const rowData = guesses[i];
    const isActive = i === guesses.length;

    return (
      <GameBoardRow
        key={i}
        guessResult={rowData?.guessResult || ""}
        letters={
          isActive
            ? currentInput.split("")
            : rowData?.yourGuess?.split("") || []
        }
        wordLength={wordLength}
        isActive={isActive}
        isInvalid={isActive && isInvalid}
      />
    );
  });

  return (
    <div
      className="outline-none space-y-2 p-2"
      onClick={() => inputRef.current?.focus()}
    >
      <input
        ref={inputRef}
        type="text"
        className="absolute opacity-0 pointer-events-none"
        onKeyDown={handleKey}
        autoFocus
      />
      {rows}
    </div>
  );
};

export default GameBoard;
