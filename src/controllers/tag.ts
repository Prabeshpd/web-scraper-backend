import { Response, NextFunction, Request } from 'express';
import httpStatusCode from 'http-status-codes';

import * as tagService from '../services/tag';
import {sendQueueMessage} from '../services/queue';
import { AuthorizedRequest } from '../middlewares/auth';

export async function fetch(request: Request, response: Response, next: NextFunction) {
  const authorizedRequest = request as AuthorizedRequest;
  const userId = authorizedRequest.user.id;
  const paginationParams = request.query;

  tagService
    .fetchTags(userId, paginationParams)
    .then((data) => response.status(httpStatusCode.OK).json(data))
    .catch((e) => next(e));
}

export async function createUploadEvent(request: Request, response: Response, next: NextFunction) {
    const authorizedRequest = request as AuthorizedRequest;
    const userId = authorizedRequest.user.id;
    const filePath = request.file?.path || '';
    
    sendQueueMessage('UploadedFile', JSON.stringify({userId, filePath}))
    .then(() => response.status(httpStatusCode.OK).json({msg: 'File Uploaded successfully'}))
    .catch((e) => next(e))
}
