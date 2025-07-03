import React from "react";

type KeyboardProps = {
  words: string[];
};

const Keyboard = ({ words } : KeyboardProps) => {
  const rows = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"]
  ];

  // Collect all letters from the words
  const usedLetters = new Set(
    words
      .join("")
      .toLowerCase()
      .split("")
  );

  return (
    <div>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="my-1 flex w-full justify-center gap-1"
        >
          {row.map((letter) => {
            const isUsed = usedLetters.has(letter);
            const baseClass = "kbd kbd-xl";
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
