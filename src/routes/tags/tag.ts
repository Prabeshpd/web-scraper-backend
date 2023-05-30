import { Router } from 'express';

import authenticate from '../../middlewares/auth';
import * as tagsController from '../../controllers/tag';

const tagRouter = Router();

tagRouter.post('/', authenticate, tagsController.insertTags);

tagRouter.get('/', authenticate, tagsController.fetch);

export default tagRouter;
