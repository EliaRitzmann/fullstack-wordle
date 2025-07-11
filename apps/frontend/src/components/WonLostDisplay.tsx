import React, { useMemo } from "react";
import { GameGameIdGet200ResponseStatusEnum } from "../api/generated";

interface WonLostDisplayProps {
  state: GameGameIdGet200ResponseStatusEnum;
  correctWord?: string;
  startedAt: Date;
  endedAt?: Date;
}

export const WonLostDisplay: React.FC<WonLostDisplayProps> = ({
  state,
  correctWord,
  startedAt,
  endedAt,
}) => {
  const elapsedTime = useMemo(() => {
    const endTime = endedAt ?? new Date();
    const elapsedSeconds = Math.floor((endTime.getTime() - startedAt.getTime()) / 1000);
    const minutes = Math.floor(elapsedSeconds / 60);
    const seconds = elapsedSeconds % 60;
    return `${minutes} minutes and ${seconds} seconds`;
  }, [startedAt, endedAt]);

  const baseClasses = "stats shadow";
  const textWhite = "text-white";

  const isWon = state === GameGameIdGet200ResponseStatusEnum.Won;

  return (
    <div className="flex justify-center">
      <div className={baseClasses}>
        <div className="stat">
          <div className={`stat-title ${textWhite}`}>
            {isWon ? "Congratulations you've" : "Sorry, but you've"}
          </div>
          <div className={`stat-value ${isWon ? "text-green-800" : "text-error"}`}>
            {isWon ? "WON" : "LOST"}
          </div>
          <div className={`stat-desc ${textWhite}`}>
            {isWon
              ? `in ${elapsedTime}`
              : `The correct word was "${correctWord ?? "unknown"}"`}
          </div>
        </div>
      </div>
    </div>
  );
};
