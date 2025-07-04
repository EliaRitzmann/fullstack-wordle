import React, { useState } from "react";
import { api } from "../api/client";
import { useActiveGames } from "../hook/useActiveGames";
import wordleLogoGIF from "../assets/Wordle.gif";

const MenuPage = () => {
  const [username, setUsername] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const [error, setError] = useState(null);
  const { joinGame } = useActiveGames();

  const mapDifficultyToNumberOfTries = (difficulty: string): number => {
    switch (difficulty) {
      case "easy":
        return 6;
      case "medium":
        return 5;
      case "hard":
        return 4;
      default:
        console.error("Invalid difficulty level:", difficulty);
        return 6;
    }
  };

  const handleJoin = () => {
    api
      .gameStartPost(
        username,
        mapDifficultyToNumberOfTries(difficulty),
        wordLength
      )
      .then((response) => {
        const gameId = response.data.gameId;
        if (!gameId) {
          console.error("No game ID returned from server");
          alert("Failed to start game. Please try again.");
          return;
        }
        joinGame(gameId);
        window.location.href = `/game/${gameId}`;
      })
      .catch((error) => {
        console.error("Error starting game:", error);
        setError(error.response?.data?.message || "Failed to start game. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 p-4 gap-12">
      <img src={wordleLogoGIF} alt="Logo" className="w-3xl h-auto" />
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">New Game</h2>

        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          autoFocus
          className="input input-bordered w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">
          <span className="label-text">Word Length</span>
        </label>
        <div className="w-full mb-4">
          <input
            type="range"
            min={4}
            max={14}
            value={wordLength}
            onChange={(e) => setWordLength(Number(e.target.value))}
            className="range w-full"
            step="1"
          />
          <div className="flex justify-between px-2.5 mt-2 text-xs">
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
            <span className="w-2">|</span>
          </div>
          <div className="flex justify-between px-1.5 mt-2 mr-2 text-xs">
            <span className="w-2">4</span>
            <span className="w-2">5</span>
            <span className="w-2">6</span>
            <span className="w-2">7</span>
            <span className="w-2">8</span>
            <span className="w-2">9</span>
            <span className="w-2">10</span>
            <span className="w-2">11</span>
            <span className="w-2">12</span>
            <span className="w-2">13</span>
            <span className="w-2">14</span>
          </div>
        </div>

        <label className="label">
          <span className="label-text">Difficulty</span>
        </label>
        <select
          className="select select-bordered w-full mb-4"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        {error && (
          <div role="alert" className="alert alert-error mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <button
          className="btn btn-primary w-full"
          disabled={!username.trim()}
          onClick={handleJoin}
        >
          Start
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
