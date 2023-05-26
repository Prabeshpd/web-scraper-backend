import Tag from '../models/Tag';
import SearchResult from '../models/SearchResult';
import { extractPaginationParams, PaginationParams, constructPaginationResult } from '../utils/pagination';

export async function fetchTags(userId: number, params: PaginationParams) {
  const href = '/api/v1/tags';
  const { currentPage = 1 } = params;

  const tagCount = await SearchResult.count(userId);

  const { limit, offset } = extractPaginationParams(params);
  const tags = await SearchResult.fetch(userId, { limit, offset });

  const paginationResult = constructPaginationResult({
    totalCount: tagCount,
    limit,
    currentPage,
    href
  });

  return { data: tags, metadata: paginationResult };
}

export async function fetchById(id: number, userId: number) {
  const tag = await Tag.fetchByResultId(id);

  if (!tag.length) {
    throw new Error('No Tag exists for the search');
  }

  if (tag[0].userId !== userId) {
    throw new Error('Unauthorized');
  }

  const result = await SearchResult.getById(id);
  return result;
}
