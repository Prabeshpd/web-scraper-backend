import { Router } from 'express';

import homeRouter from './home';
import userRouter from './user/user';
import authRouter from './auth/auth';

const appRouter = Router();
const generalRouter = Router();

generalRouter.use(homeRouter);
appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);

export { generalRouter, appRouter };
