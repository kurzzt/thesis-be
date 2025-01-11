import { PageOptionsDto } from '../dto/page-options.dto';

export function findRawHelper(options: PageOptionsDto, where: any = {}) {
  if (where) {
    return {
      ...(options.page !== undefined && options.pageSize !== undefined
        ? {
            limit: Number(options.pageSize),
            skip: Number(options.page) * Number(options.pageSize),
          }
        : {}),
      ...(options.sortBy
        ? {
            sort: sortFindRawMongoHelper(options.sortBy),
          }
        : {}),
    };
  }
}

const sortFindRawMongoHelper = (sortBy: string) => {
  if (!sortBy) {
    return null;
  }
  let sortKey = sortBy;
  let sortOrder = 1;
  if (sortBy.includes('-')) {
    sortKey = sortBy.split('-')[1];
    if (sortKey === 'id') sortKey = '_id';
    sortOrder = -1;
  }

  return { [sortKey]: sortOrder };
};
