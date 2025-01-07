import React from "react";
import Row from "./rows.tsx";
import Cell from "./cell.tsx";

export default function Grid() {
    return (
    <div className="align-baseline flex">
        <div className="grid grid-rows-5 gap-2 w-[350px] h-[420px] bg-background-black p-2.5">
            <Row word="water" targetWord="skate"/>
            <Row word="skirt" targetWord="skate"/>
            <Row word="stake" targetWord="skate"/>
            <Row word="skate" targetWord="skate"/>
            <Row word="     " targetWord="skate"/>
            <Row word="     " targetWord="skate"/> 
        </div>
    </div>
    );
  }

  