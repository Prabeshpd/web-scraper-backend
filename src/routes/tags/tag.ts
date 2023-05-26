import Multer from 'multer';
// import path from 'node:path';
import { Router } from 'express';

import authenticate from '../../middlewares/auth';
import * as tagsController from '../../controllers/tag';

const storage = Multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../files');
  },
  filename: function (req, file, cb) {
    if(!this.filename) throw new Error('No file')
    cb(null, Date.now() + file.originalname); //Appending extension
  }
});

const upload = Multer({ storage: storage });

const tagRouter = Router();

tagRouter.post('/', authenticate, upload.single('tags'), tagsController.createUploadEvent);

tagRouter.get('/', authenticate, tagsController.fetch);

export default tagRouter;
