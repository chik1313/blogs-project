import {ObjectId} from "mongodb";

export type CommentsViewModel = {
    id: string
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
}
export type DbResponseCommentType = {
    _id: ObjectId
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string

}

export type CommentatorInfo = {
    userId: string,
    userLogin: string
}

export type CommentResponseType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: CommentResponseType[]
}

export type DbCommentType = {
    content: string
    commentatorInfo: CommentatorInfo
    createdAt: string
    postId: string
}
