import React from "react";
import Cell from "./cell.tsx";

export default function Row() {
    return (
    <div className="grid grid-cols-[62px_62px_62px_62px_62px] gap-2 align-baseline">
      {/* Hardcoded 5 cells for one row */}
      <Cell />
      <Cell />
      <Cell />
      <Cell />
      <Cell />
    </div>
    )
}