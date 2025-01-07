import React from "react";
import Row from "./rows.tsx";

export default function Grid() {
    return (
    <div className="align-baseline flex">
        <div className="grid grid-rows-5 gap-2 w-[350px] h-[420px] bg-background-black p-2.5">
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
            <Row />
        </div>
    </div>
    );
  }
