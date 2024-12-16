import { PrismaClient } from "@prisma/client";
import * as fs from "fs";
import * as path from "path";

const prisma = new PrismaClient();

const readWordsFromFile = (filePath: string): string[] => {
  const content = fs.readFileSync(filePath, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);
};

async function populateWords() {
  const languages = ["en"];

  try {
    await prisma.word.deleteMany({});
  } catch (error) {
    console.error("Error deleting words:", error);
  }

  try {
    for (const languageCode of languages) {
      const filePath = path.join(
        __dirname,
        "..",
        "data",
        `wordlist.${languageCode}.txt`
      );

      if (fs.existsSync(filePath)) {
        console.log(`Processing words for language: ${languageCode}`);

        const words = readWordsFromFile(filePath);

        const wordData = words.map((word) => ({
          languageCode: languageCode,
          word: word,
          wordLength: word.length,
        }));

        await prisma.word
          .createMany({
            data: wordData,
          })
          .catch((error) => {
            console.error(
              `Error populating words for language: ${languageCode}`,
              error
            );
          });

        console.log(
          `Successfully populated words for language: ${languageCode}`
        );
      } else {
        console.log(`File not found for language: ${languageCode}`);
      }
    }
  } catch (error) {
    console.error("Error populating words:", error);
  } finally {
    await prisma.$disconnect();
  }
}

populateWords();
