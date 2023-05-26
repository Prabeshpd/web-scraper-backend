import { Knex } from 'knex';

import BaseModel from './Model';
import { CamelCaseKeys } from '../types/utils';
import { PaginationQueryParams } from '../utils/pagination';

export interface SearchResult {
  id: number;
  ad_words_count: number;
  links_count: number;
  html_page: string;
  total_results: string;
  created_at: string;
  updated_at: string;
}

export type SearchResultDetail = CamelCaseKeys<SearchResult>;
export type SearchResultPayload = Omit<SearchResult, 'id' | 'created_at' | 'updated_at'>;

class Tag extends BaseModel {
  public static table = 'search_results';

  public static async count(user_id: number): Promise<number> {
    const [{ count }] = await this.buildQuery<{ count: number }>((qb: Knex) =>
      qb
        .count('tags.id as count')
        .from('tags')
        .where('user_id', user_id)
        .and.whereNotNull('results_id')
        .innerJoin('search_results', 'tags.results_id', '=', 'search_results.id')
    );

    return count;
  }

  public static async fetch(user_id: number, paginationParams: PaginationQueryParams) {
    const { limit, offset } = paginationParams;

    return this.buildQuery<SearchResultDetail>((qb) =>
      qb
        .select()
        .from('tags')
        .limit(limit)
        .offset(offset)
        .where('user_id', user_id)
        .and.whereNotNull('results_id')
        .innerJoin('search_results', 'tags.results_id', '=', 'search_results.id')
    );
  }
}

export default Tag;
