import {Request, Response, NextFunction} from "express";
import {jwtService} from "../application/jwt-service";
import {usersService} from "../../users/users-service";


export const authBearerMiddleware = async (req: Request, res: Response, next: NextFunction) => {

    if (!req.headers.authorization) {
        res.sendStatus(401)
        return
    }
    const token = req.headers.authorization.split(' ')[1]

    const userId = await jwtService.getUserIdByToken(token)

    if (!userId) {
        res.sendStatus(401)
        return
    }

     req.user = await usersService.getUserById(userId.toString())
     next()
}
