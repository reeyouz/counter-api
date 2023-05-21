import { Router } from "express";

const router = Router();

router.use('/v1', require('./counter'));

export default router;
