import request from "supertest";
import { app } from "../../src/server";

describe("Game Integration Tests", () => {
  let gameId: string;

  it("should create a new game", async () => {
    const res = await request(app).post("/game/start").query({
      username: "test",
      maxNumberOfGuesses: "6",
      wordLength: "5",
    });

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("gameId");
    gameId = res.body.gameId;
  });

  it("should fetch the created game", async () => {
    const res = await request(app).get(`/game/${gameId}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject({
      gameId,
      username: "test",
      maxNumberOfGuesses: 6,
      // TODO: Implement wordLength as soon as WordService is implemented
      // wordLength: 5,
    });
  });
});
