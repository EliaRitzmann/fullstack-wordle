import express, { Request, Response } from 'express';

const router = express.Router();

// Start ein neues Spiel
router.post('/start', (req: Request, res: Response) => {
    const { username } = req.body;

    // Logik für ein neues Spiel
    const gameId = 'new-game-id';
    const wordLength = 5;

    res.status(201).json({ gameId, wordLength });
});

// Rate ein Wort
router.post('/:gameId/guess', (req: Request, res: Response) => {
    const { gameId } = req.params;
    const { guess } = req.body;

    // Logik für das Raten
    const feedback = ['match', 'partial', 'wrong'];
    const remainingAttempts = 5;

    res.status(200).json({ correct: false, feedback, remainingAttempts });
});

export default router;