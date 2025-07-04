import { useGameMetadata } from "../hook/useGameMetadata";
import { useParams } from "react-router-dom";
import { useActiveGames } from "../hook/useActiveGames";
import { useNavigate } from "react-router-dom";
import Keyboard from "../components/Keyboard";
import GameBoard from "../components/GameBoard";
import { api } from "../api/client";
import wordleLogoImg from "../assets/Wordle.png";

const GamePage = () => {
  const { uuid } = useParams();
  const { removeGameUUID } = useActiveGames();
  const { metadata, error } = useGameMetadata(uuid);
  const navigate = useNavigate();

  const leaveGame = (gameUUID: string | undefined) => {
    if (gameUUID) {
      removeGameUUID(gameUUID);
    }
    navigate("/");
  };

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm flex justify-between">
        <img src={wordleLogoImg} alt="Wordle Logo" className="w-46 h-auto" />
        <div className="flex justify-end gap-2">
          {!error && (
            <p className="text-lg font-semibold">
              Username: {metadata?.username}
            </p>
          )}

          <button
            className="btn btn-sm btn-error"
            onClick={() => leaveGame(uuid)}
          >
            Leave game
          </button>
        </div>
      </div>
      {!error ? (
        <div>
          <GameBoard
            wordLength={metadata?.wordLength || 5}
            maxGuesses={metadata?.maxNumberOfGuesses || 4}
            guesses={metadata?.guesses || []}
            onConfirm={async (guess) => {
              if (!uuid) return;

              try {
                await api.gameGuessPost(uuid, guess);
                window.location.reload();
              } catch (err) {
                console.error("Error submitting guess:", err);
                throw err;
              }
            }}
          />
          <Keyboard
            usedLetters={
              metadata?.guesses
                ?.map((g) => g.yourGuess)
                .join("")
                .toLowerCase()
                .split("") || []
            }
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <div className="alert alert-error shadow-lg">
            <span>Error: {error.message}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
