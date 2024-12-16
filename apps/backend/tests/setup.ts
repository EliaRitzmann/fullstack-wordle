// Jest mock setup
import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";
import prisma from "../src/config/database";
import dotenv from "dotenv";

dotenv.config({ path: ".env.test" });

jest.mock("../src/config/database", () => {
  const prismaMock = mockDeep<PrismaClient>();

  return {
    __esModule: true,
    default: prismaMock,
    connectToDatabase: jest.fn().mockResolvedValue(undefined), // Mock function from database.ts
  };
});

export const prismaMock = prisma as unknown as DeepMockProxy<PrismaClient>;
