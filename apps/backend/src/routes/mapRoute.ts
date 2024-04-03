import express, { Router, Request, Response } from "express";

const router: Router = express.Router();
router.post("/", async function (req: Request, res: Response) {
  res.sendStatus(200); // Otherwise say it's fine
});

export default router;
