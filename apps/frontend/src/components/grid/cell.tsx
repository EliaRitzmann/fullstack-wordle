export default function Cell({ letter, color }: { letter: string, color: string }) {
  return (
    <div className={`flex items-center justify-center w-[62.5px] h-[62.5px] border-2 ${color}`}>
      <span className="text-white text-3xl uppercase font-bold">{letter}</span>
    </div>
  );
}

