import {ObjectId} from "mongodb";

export type BlogResponseType = {
    _id: ObjectId,
    name: string,
    description: string
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}
export type BlogViewModel = {
    id: string,
    name: string,
    description: string
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}
export type BlogDbType = {
    name: string,
    description: string
    websiteUrl: string
    createdAt: string,
    isMembership: boolean
}
export type BlogInputModel = {
    name: string,
    description: string,
    websiteUrl: string
}

export type ResponseBlogType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: BlogViewModel[]
}

export type BlogQueryInputType = {
    searchNameTerm: string | null,
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,

}

