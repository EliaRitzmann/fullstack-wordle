import React from "react";
import Cell from "./cell.tsx";

export default function Row({ word, targetWord }: {word: string, targetWord:string }) {
  const letters = word.split("");

  const getColor = (letter: string, index: number): string => {
    if (letter == targetWord[index]) {
      return "bg-correct-green border-correct-green";
    }
    if (targetWord.includes(letter)) {
      return "bg-almost-yellow border-almost-yellow";
    }
    return "bg-background-black border-wrong-gray"
  }

    return (
    <div className="grid grid-cols-[62px_62px_62px_62px_62px] gap-2">
      {letters.map((letter, index) => (
        <Cell key={index} letter={letter} color={getColor(letter, index)}/>
      ))}
    </div>
    )
}