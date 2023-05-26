import { Router } from 'express';

import homeRouter from './home';
import userRouter from './user/user';
import authRouter from './auth/auth';
import tagRouter from './tags/tag';
import searchResultsRouter from './searchResult/searchResult';

const appRouter = Router();
const generalRouter = Router();

generalRouter.use(homeRouter);
appRouter.use('/users', userRouter);
appRouter.use('/auth', authRouter);
appRouter.use('/tags', tagRouter);
appRouter.use('/searchResults', searchResultsRouter);

export { generalRouter, appRouter };
