import Cell from "./cell.tsx";

export default function Row({ word, targetWord }: {word: string, targetWord:string }) {
  const letters = word.split("");

  const getColor = (letter: string, index: number): string => {
    if (letter === (" ")) {
      return "bg-background-black border-wrong-gray";
    }
    if (letter === targetWord[index]) {
      return "bg-correct-green border-correct-green";
    }
    if (targetWord.includes(letter)) {
      return "bg-almost-yellow border-almost-yellow";
    }
    return "bg-wrong-gray border-wrong-gray"
  }

    return (
    <div className="grid grid-cols-5 gap-2">
      {letters.map((letter, index) => (
        <Cell key={index} letter={letter} color={getColor(letter, index)}/>
      ))}
    </div>
    )
}