import React from "react";

type KeyboardProps = {
  usedLetters: string[];
};

const Keyboard = ({ usedLetters } : KeyboardProps) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="my-1 flex w-full justify-center gap-1"
        >
          {row.map((letter) => {
            const isUsed = usedLetters.includes(letter);
            const baseClass = "kbd font-semibold uppercase w-14 h-14 text-3xl";
            const colorClass = isUsed ? "bg-gray-800 text-white" : "";

            return (
              <kbd key={letter} className={`${baseClass} ${colorClass}`}>
                {letter}
              </kbd>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Keyboard;
