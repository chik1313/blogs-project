import {Request, Response} from "express";
import {CommentsViewModel} from "../../types/comment-types";
import {commentsService} from "../../comments/comments-service";
import {commentsQwRepository} from "../../comments/commentsQwRepository";
import {ObjectId} from "mongodb";
import {postsRepository} from "../postsRepository";


export const createCommentByPostIdController = async (
    req: Request<{ id: string }, {}, { content: string }>,
    res: Response<CommentsViewModel>
) => {

    const userId = req.user!._id.toString()
    const postId = req.params.id
    const content = req.body.content

    if (!postId || !ObjectId.isValid(postId)) {
        res.sendStatus(404)
        return;
    }

    const foundPost = await postsRepository.getPostById(new ObjectId(postId));

    if (!foundPost) {
        res.sendStatus(404)
        return
    }

    const commentId = await commentsService.createComment(userId, postId, content)

    if (!commentId) {
        res.sendStatus(404)
        return
    }

    const comment = await commentsQwRepository.getCommentById(commentId)

    if (!comment) {
        res.sendStatus(404)
        return
    }

    const commentForResponse: CommentsViewModel = {
        id: comment._id.toString(),
        content: comment.content,
        commentatorInfo: {
            userId: comment.commentatorInfo.userId,
            userLogin: comment.commentatorInfo.userLogin
        },
        createdAt: comment.createdAt

    }
    res.status(201).json(commentForResponse)

}
