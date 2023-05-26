import { Knex } from 'knex';

import BaseModel from './Model';
import { CamelCaseKeys } from '../types/utils';
import { PaginationQueryParams } from '../utils/pagination';

export interface TagModel {
  id: number;
  user_id: number;
  name: string;
  result_id?: string;
  created_at: string;
  updated_at: string;
}

export type TagDetail = CamelCaseKeys<TagModel>;
export type TagPayload = Omit<TagModel, 'id' | 'created_at' | 'updated_at'>;

class Tag extends BaseModel {
  public static table = 'tags';

  public static async count(user_id: number): Promise<number> {
    const [{ count }] = await this.buildQuery<{ count: number }>((qb: Knex) =>
      qb.count('id as count').from(this.table).where('user_id', user_id)
    );

    return count;
  }

  public static async fetch(user_id: number, paginationParams: PaginationQueryParams) {
    const { limit, offset } = paginationParams;

    return this.buildQuery<TagDetail>((qb) =>
      qb.select().from(this.table).limit(limit).offset(offset).where('user_id', user_id)
    );
  }

  public static async fetchByResultId(result_id: number) {
    return this.buildQuery<TagDetail>((qb) => 
      qb.select().from(this.table).where('results_id', result_id)
    )
  }
}

export default Tag;
