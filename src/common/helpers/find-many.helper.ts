import { PageOptionsDto } from '../dto/page-options.dto';

export const sortAttributeHelper = (sortBy: string, sortShape?: any) => {
  if (!sortBy) {
    return null;
  }
  let sortKey = sortBy;
  let sortOrder = 'asc';
  if (sortBy.includes('-')) {
    sortKey = sortBy.split('-')[1];
    sortOrder = 'desc';
  }

  function changeDeepestKey(obj: any) {
    const key = Object.keys(obj)[0];
    if (obj[key] === true) {
      obj[key] = sortOrder;
    } else {
      changeDeepestKey(obj[key]);
    }
  }

  if (sortShape) {
    if (sortShape[sortKey]) {
      changeDeepestKey(sortShape[sortKey]);
      return sortShape[sortKey];
    } else {
      return null;
    }
  }

  return { [sortKey]: sortOrder };
};

export function findManyHelper(options: PageOptionsDto, where: any = {}) {
  if (where) {
    return {
      ...(options.page !== undefined && options.pageSize !== undefined
        ? {
            take: Number(options.pageSize),
            skip: Number(options.page) * Number(options.pageSize),
          }
        : {}),
      ...(options.sortBy
        ? {
            orderBy: sortAttributeHelper(options.sortBy),
          }
        : {}),
    };
  }
}
