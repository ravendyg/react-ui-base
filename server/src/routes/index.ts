import { Router } from 'express';

import { userRouter } from './Users';


// Export the base-router
export const apiRouter = Router();
apiRouter.use('/user', userRouter);
