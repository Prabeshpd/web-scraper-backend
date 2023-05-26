import { Response, NextFunction, Request } from 'express';
import httpStatusCode from 'http-status-codes';
import { AuthorizedRequest } from '../middlewares/auth';
import * as searchResultService from '../services/searchResult';

export async function fetch(request: Request, response: Response, next: NextFunction) {
  const authorizedRequest = request as AuthorizedRequest;
  const userId = authorizedRequest.user.id;
  const paginationParams = request.query;

  searchResultService
    .fetchTags(userId, paginationParams)
    .then((data) => response.status(httpStatusCode.OK).json(data))
    .catch((e) => next(e));
}

export async function fetchById(request: Request, response: Response, next: NextFunction) {
  const authorizedRequest = request as AuthorizedRequest;
  const userId = authorizedRequest.user.id;
  const id = +request.params.id;

  searchResultService
    .fetchById(id, userId)
    .then((data) => response.status(httpStatusCode.OK).json(data))
    .catch((e) => next(e));
}
