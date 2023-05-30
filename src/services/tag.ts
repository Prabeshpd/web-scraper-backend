import Tag from '../models/Tag';
import config from '../config';
import { sendQueueMessage } from './queue';
import { extractPaginationParams, PaginationParams, constructPaginationResult } from '../utils/pagination';

const {
  rabbitMQ: { events }
} = config;

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

export async function insertTags(userId: number, tags: string[]) {
  const tagPayload = tags.map((tag) => ({
    name: tag,
    user_id: userId
  }));

  const insertedTags = await Tag.insert(tagPayload);
  await sendQueueMessage(events.searchTags, JSON.stringify({ userId }));

  return insertedTags;
}
