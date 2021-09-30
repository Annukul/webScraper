import express from 'express';
import { scrape } from '../controllers/scrapeController.js';

const router = express.Router();

router.get("/get", scrape);

export default router;