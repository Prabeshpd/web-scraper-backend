import { Router } from 'express';

import * as searchResultController from '../../controllers/searchResult';
import authenticate from '../../middlewares/auth';

const searchResultRouter = Router();

searchResultRouter.get('/', authenticate, searchResultController.fetch);
searchResultRouter.get('/:id', authenticate, searchResultController.fetchById);

export default searchResultRouter;
