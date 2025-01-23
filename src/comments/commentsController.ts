import {Request, Response} from "express";
import {CommentResponseType} from "../types/comment-types";
import {commentsService} from "./comments-service";

export const commentsController = {
    async getCommentsById (req: Request<{ commentId: string }>, res: Response<CommentResponseType>) {
        const commentId = req.params.commentId;

        if (!commentId) {
            res.sendStatus(404)
            return;
        }

    },
    async updateComment ( req: Request<{ commentId: string } , {} , { content:string }>, res: Response ) {

        const userId = req.user!._id || '' // ???? у нас же айди уникальный идентификатор
        const commentId = req.params.commentId;
        const content = req.body.content;

        if (!commentId) {
            res.sendStatus(404)
            return;
        }

        const updateComment = await commentsService.updateComment(commentId, content)

        if (!updateComment) {
            res.sendStatus(404)
            return;
        } else res.sendStatus(204)

    },
    async deleteComment ( req: Request<{ commentId: string }>, res: Response ) {
        const commentId = req.params.commentId;
    }

}
