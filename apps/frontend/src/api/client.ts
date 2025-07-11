import { GameApi, LeaderboardApi, Configuration } from "./generated";

const apiConfig = new Configuration({
  basePath: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000",
});

export const api = new GameApi(apiConfig);
export const leaderboardApi = new LeaderboardApi(apiConfig);
