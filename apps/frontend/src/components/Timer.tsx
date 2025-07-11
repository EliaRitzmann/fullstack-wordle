import React, { useEffect, useState } from "react";

type TimerProps = {
  startingTime: Date;
  endingTime?: Date;
};

const Timer: React.FC<TimerProps> = ({ startingTime, endingTime }) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startingTime) return;

    const updateElapsed = () => {
      const now = endingTime ? endingTime.getTime() : new Date().getTime();
      const start = startingTime.getTime();
      const diffInSeconds = Math.floor((now - start) / 1000);
      setElapsed(diffInSeconds);
    };

    updateElapsed(); // Initial calculation
    const interval = setInterval(updateElapsed, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup
  }, [startingTime, endingTime]);

  const minutes = Math.floor(elapsed / 60);
  const seconds = elapsed % 60;

  const counter = `${minutes} minutes and ${seconds} seconds elapsed`;

  return (
    <div className="flex flex-col items-center justify-center my-4 gap-1">
      <p>Time elapsed:</p>
      <span className="countdown font-mono text-4xl">
        <span
          style={{ "--value": minutes } as React.CSSProperties}
          aria-live="polite"
          aria-label={counter}
        >
          {minutes}
        </span>
        m
        <span
          style={{ "--value": seconds } as React.CSSProperties}
          aria-live="polite"
          aria-label={counter}
        >
          {seconds}
        </span>
        s
      </span>
    </div>
  );
};

export default Timer;
