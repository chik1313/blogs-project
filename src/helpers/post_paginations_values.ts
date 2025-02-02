import {QueryInputType} from "../types/posts-types";


export const postQueryPagingDef = (query: QueryInputType): QueryInputType => {

    let page = query?.pageNumber ? +query.pageNumber : 1;

    return {
        pageNumber: page >= 1 ? page : 1,
        pageSize: query?.pageSize ? +query.pageSize : 10,
        sortBy: query?.sortBy ?? 'createdAt',
        sortDirection: query?.sortDirection === 'asc' ? 'asc' : 'desc',
    }
}
