import Tag from '../models/Tag';
import { extractPaginationParams, PaginationParams, constructPaginationResult } from '../utils/pagination';

export async function fetchTags(userId: number, params: PaginationParams) {
  const href = '/api/v1/tags';
  const { currentPage = 1 } = params;

  const tagCount = await Tag.count(userId);

  const { limit, offset } = extractPaginationParams(params);
  const tags = await Tag.fetch(userId, { limit, offset });

  const paginationResult = constructPaginationResult({
    totalCount: tagCount,
    limit,
    currentPage,
    href
  });

  return { data: tags, metadata: paginationResult };
}
