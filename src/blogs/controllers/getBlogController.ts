import {NextFunction, Request, Response} from "express";
import {BlogType} from "../../types/blog-types";
import {blogsRepository} from "../blogsRepository";


export const getBlogController = async (
    req: Request,
    res: Response<BlogType[]> ,
    next:NextFunction) => {

    const blogs = await blogsRepository.getAllBlogs()
    res.status(200).json(blogs)

}
