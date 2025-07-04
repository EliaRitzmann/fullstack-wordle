import React from "react";

type GameBoardRowProps = {
  guessResult: string;
  letters: string[];
  wordLength: number;
  isActive?: boolean;
  isInvalid?: boolean;
};

const GameBoardRow = ({
  guessResult,
  letters,
  wordLength,
  isActive,
  isInvalid = false,
}: GameBoardRowProps) => {
  const cells = Array.from({ length: wordLength }).map((_, i) => {
    const char = letters[i] || "";
    const status = guessResult[i]; // '+', '-', '*', or undefined
    let bg = "bg-gray-800";
    if (status === "+") bg = "bg-green-500 text-white";
    else if (status === "*") bg = "bg-yellow-500 text-white";
    else if (status === "-") bg = "bg-gray-500 text-white";
    else if (isActive && char) bg = "bg-blue-200";

    return (
      <div
        key={i}
        className={`w-12 h-12 border border-gray-400 flex items-center justify-center text-xl font-bold uppercase ${bg} ${isInvalid ? "animate-jiggle" : ""}`}
      >
        {char}
      </div>
    );
  });

  return <div className="flex gap-1 justify-center">{cells}</div>;
};

export default GameBoardRow;
