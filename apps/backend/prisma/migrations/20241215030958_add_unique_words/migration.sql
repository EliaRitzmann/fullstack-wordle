/*
  Warnings:

  - A unique constraint covering the columns `[languageCode,word]` on the table `Word` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Word_languageCode_word_key" ON "Word"("languageCode", "word");
