import React from "react";

export default function Cell() {
    return (
      <div className="flex items-center justify-center w-[62.5px] h-[62.5px] border-2 border-wrong-gray bg-background-black">
        {/* Example Content */}
        <span className="text-white text-4xl font-bold"></span>
      </div>
    );
  }