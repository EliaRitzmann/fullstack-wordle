import React, { createContext, useState, useEffect } from 'react';

type ActiveGamesContextType = {
  activeGames: string[];
  joinGame: (uuid: string) => void;
  leaveGame: (uuid: string) => void;
};

const ActiveGamesContext = createContext<ActiveGamesContextType | undefined>(undefined);

const ActiveGamesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeGames, setActiveGames] = useState<string[]>(() => {
    const saved = localStorage.getItem('activeGames');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('activeGames', JSON.stringify(activeGames));
  }, [activeGames]);

  const joinGame = (uuid: string) => {
    setActiveGames(prev => (prev.includes(uuid) ? prev : [...prev, uuid]));
  };

  const leaveGame = (uuid: string) => {
    setActiveGames(prev => prev.filter(id => id !== uuid));
  };

  return (
    <ActiveGamesContext.Provider value={{ activeGames, joinGame, leaveGame }}>
      {children}
    </ActiveGamesContext.Provider>
  );
};

export { ActiveGamesProvider, ActiveGamesContext };