import React, { useState } from "react";
import { api } from "../api/client";
import { useActiveGames } from "../hook/useActiveGames";

const MenuPage = () => {
  const [username, setUsername] = useState("");
  const [wordLength, setWordLength] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");
  const { joinGame } = useActiveGames();

  const handleJoin = () => {
    console.log(
      "Joining game with username:",
      username,
      "word length:",
      wordLength,
      "difficulty:",
      difficulty
    );
    api
      .gameStartPost(username, 6, wordLength)
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
        alert("Failed to start game. Please try again.");
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100 p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Game Setup</h2>

        <label className="label">
          <span className="label-text">Username</span>
        </label>
        <input
          type="text"
          placeholder="Enter your username"
          className="input input-bordered w-full mb-4"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <label className="label">
          <span className="label-text">Word Length</span>
        </label>
        <input
          type="number"
          min={3}
          max={10}
          className="input input-bordered w-full mb-4"
          value={wordLength}
          onChange={(e) => setWordLength(Number(e.target.value))}
        />

        <label className="label">
          <span className="label-text">Difficulty</span>
        </label>
        <select
          className="select select-bordered w-full mb-6"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>

        <button
          className="btn btn-primary w-full"
          disabled={!username.trim()}
          onClick={handleJoin}
        >
          Join
        </button>
      </div>
    </div>
  );
};

export default MenuPage;
