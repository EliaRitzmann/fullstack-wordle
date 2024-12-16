import request from "supertest";
import { app } from "../../src/server";
import { prismaMock } from "../setup";

describe("error handling", () => {
  it("should return 400 for invalid maxNumberOfGuesses", async () => {
    const res = await request(app).post("/game/start").query({
      username: "test",
      maxNumberOfGuesses: "0",
    });

    expect(res.status).toBe(400);
  });

  it("should return 400 for invalid wordLength", async () => {
    const res = await request(app).post("/game/start").query({
      username: "test",
      wordLength: "1",
    });

    expect(res.status).toBe(400);
  });

  it("should return 404 for invalid gameId", async () => {
    const res = await request(app).get(
      "/game/0d4726f0-ff92-49fc-bfc9-ce44952d82f5"
    );
    expect(res.status).toBe(404);
  });
});
