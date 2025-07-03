import React, { useState, useRef, useEffect } from "react";
import GameBoardRow from "./GameBoardRow";
import { GameGameIdGet200ResponseGuessesInner } from "../api/generated";

type GameBoardProps = {
  wordLength: number;
  maxGuesses: number;
  guesses: GameGameIdGet200ResponseGuessesInner[];
  onConfirm: (guess: string) => void;
};

const GameBoard: React.FC<GameBoardProps> = ({
    wordLength,
    maxGuesses,
    guesses,
    onConfirm,
  }) => {
    const [currentInput, setCurrentInput] = useState("");
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
  
    const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace") {
        setCurrentInput((prev) => prev.slice(0, -1));
      } else if (/^[a-zA-Z]$/.test(e.key)) {
        if (currentInput.length < wordLength) {
          setCurrentInput((prev) => prev + e.key.toLowerCase());
        }
      } else if (e.key === "Enter") {
        if (currentInput.length !== wordLength) return;
        onConfirm(currentInput);
        setCurrentInput("");
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
  