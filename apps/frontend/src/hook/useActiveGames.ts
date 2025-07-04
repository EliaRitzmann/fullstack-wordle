import { useContext } from "react";
import { ActiveGamesContext } from "../context/ActiveGameContext";

export const useActiveGames = () => {
    const context = useContext(ActiveGamesContext);
    if (!context) {
      throw new Error('useActiveGames must be used within an ActiveGamesProvider');
    }
    return context;
  };