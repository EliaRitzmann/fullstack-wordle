import { z } from "zod";

export const postStartGameSchema = z.object({
  query: z.object({
    username: z
      .string()
      .regex(/^[a-z]+$/, "Username must contain only lowercase letters")
      .min(4, "Username must be at least 4 characters")
      .max(20, "Username must be at most 20 characters"),
    maxNumberOfGuesses: z
      .string()
      .transform(Number)
      .refine((n) => n >= 1 && n <= 10, {
        message: "maxNumberOfGuesses must be between 1 and 10",
      })
      .optional(),
    wordLength: z
      .string()
      .transform(Number)
      .refine((n) => n > 3, {
        message: "wordLength must be greater than 3",
      })
      .optional(),
  }),
});

export const getGameByIdSchema = z.object({
  params: z.object({
    gameId: z.string().uuid("Invalid gameId. Must be a valid UUID."),
  }),
});

export const postMakeGuessSchema = z.object({
  query: z.object({
    gameId: z.string().uuid("Invalid gameId. Must be a valid UUID."),
    wordGuess: z.string().min(1, "Guess must be a non-empty string."),
  }),
});
