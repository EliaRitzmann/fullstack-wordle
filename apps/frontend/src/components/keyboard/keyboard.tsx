import React from "react";
import Key from "./key.tsx";

export default function Keyboard() {
  return (
    <div className="flex flex-col items-center h-[200px] mx-[8px]">
      {/* Row 1 */}
      <div className="flex mb-2">
        <Key letter="q" color="bg-light-gray" />
        <Key letter="w" color="bg-wrong-gray" />
        <Key letter="e" color="bg-correct-green" />
        <Key letter="r" color="bg-wrong-gray" />
        <Key letter="t" color="bg-correct-green" />
        <Key letter="z" color="bg-light-gray" />
        <Key letter="u" color="bg-light-gray" />
        <Key letter="i" color="bg-wrong-gray" />
        <Key letter="o" color="bg-light-gray" />
        <Key letter="p" color="bg-light-gray" className="mr-0"/>
      </div>

      {/* Row 2 */}
      <div className="flex mb-2">
        <Key letter="a" color="bg-correct-green" />
        <Key letter="s" color="bg-correct-green" />
        <Key letter="d" color="bg-light-gray" />
        <Key letter="f" color="bg-light-gray" />
        <Key letter="g" color="bg-light-gray" />
        <Key letter="h" color="bg-light-gray" />
        <Key letter="j" color="bg-light-gray" />
        <Key letter="k" color="bg-correct-green" />
        <Key letter="l" color="bg-light-gray" className="mr-0"/>
      </div>

      {/* Row 3 */}
      <div className="flex mb-2">
      <Key letter="enter" color="bg-light-gray" className="text-xs w-[68px]" />
        <Key letter="y" color="bg-light-gray" />
        <Key letter="x" color="bg-light-gray" />
        <Key letter="c" color="bg-light-gray" />
        <Key letter="v" color="bg-light-gray" />
        <Key letter="b" color="bg-light-gray" />
        <Key letter="n" color="bg-light-gray" />
        <Key letter="m" color="bg-light-gray" />
        <Key letter="delete" color="bg-light-gray" className="text-xs w-[68px] mr-0"/>
      </div>
    </div>
  );
}
