import { Routes, Route, Navigate } from "react-router-dom";
import GamePage from "../pages/GamePage";
import MenuPage from "../pages/MenuPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<MenuPage />} />
      {/* Route for a specific game by UUID */}
      <Route path="/game/:uuid" element={<GamePage />} />
      {/* Redirect unknown routes to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
