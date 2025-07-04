import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { ActiveGamesProvider } from "./context/ActiveGameContext";
import Routes from "./routing/Routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <ActiveGamesProvider>
        <Routes />
      </ActiveGamesProvider>
    </BrowserRouter>
  </StrictMode>
);
