/*
  Warnings:

  - Added the required column `wordLength` to the `Word` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Word" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "languageCode" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "wordLength" INTEGER NOT NULL
);
INSERT INTO "new_Word" ("id", "languageCode", "word") SELECT "id", "languageCode", "word" FROM "Word";
DROP TABLE "Word";
ALTER TABLE "new_Word" RENAME TO "Word";
CREATE UNIQUE INDEX "Word_languageCode_word_key" ON "Word"("languageCode", "word");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
