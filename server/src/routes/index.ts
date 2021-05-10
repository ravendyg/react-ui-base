import { Router } from 'express';

import { userRouter } from './Users';
import { tasksRouter } from './Tasks';

export const apiRouter = Router();
apiRouter.use('/users', userRouter);
apiRouter.use('/tasks', tasksRouter);
