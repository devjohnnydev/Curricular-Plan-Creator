import { Router, type IRouter } from "express";
import healthRouter from "./health";
import cronogramaRouter from "./cronograma";

const router: IRouter = Router();

router.use(healthRouter);
router.use(cronogramaRouter);

export default router;
