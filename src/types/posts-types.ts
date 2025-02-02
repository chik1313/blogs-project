import {ObjectId} from "mongodb";

export type PostViewModel = {
    id: string;
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type ResponsePostType = {
    _id: ObjectId;
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type CreatePostType = {
    title: string
    shortDescription: string
    content: string
    blogId: string
    blogName: string
    createdAt: string,
}
export type PostInputModel = {
    title: string,
    shortDescription: string,
    content: string,
    blogId: string,
    blogName?: string,
}


export type ResponsePostsType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: PostViewModel[]
}

export type QueryInputType = {
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,

}

