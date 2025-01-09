import React from "react";

export default function Key({ letter, color, className }: { letter: string; color: string; className?: string; }) {
  return (
    <div 
      className={`w-[43px] h-[58px] mr-[6px] flex items-center justify-center text-xl rounded text-white font-bold uppercase ${color} ${className || ""}`}
    >
      <span>{letter}</span>
    </div>
  );
}
