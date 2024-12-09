import express, { Request, Response } from "express";

const router = express.Router();

router.get("/start", (req: Request, res: Response) => {
  res.status(201).json({ hello: "ich binsss" });
});

export default router;
