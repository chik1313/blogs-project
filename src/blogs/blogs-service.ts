import {blogsRepository} from "./blogsRepository";
import {BlogInputModel, BlogQueryInputType, BlogViewModel, ResponseBlogType} from "../types/blog-types";
import {ObjectId} from "mongodb";

export const blogsService = {
    async getBlogs(
        query: BlogQueryInputType
    ): Promise<ResponseBlogType> {

        const { pageNumber, pageSize, sortBy, sortDirection, searchNameTerm } = query

        const videos = await blogsRepository.getAllBlogs(
            pageNumber,
            pageSize,
            sortBy,
            sortDirection,
            searchNameTerm,
        )

        const videosCount = await blogsRepository.getBlogCount(searchNameTerm)

        return {
            pagesCount: Math.ceil(videosCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: videosCount,
            items: videos
        }

    },
    async getBlogById(id: string) {
        return await blogsRepository.getBlogById(id)
    },

    async getBlogByUUID(id: ObjectId): Promise<BlogViewModel> {
        return await blogsRepository.getVideoByUUID(id)
    },

    async createBlog(body: BlogInputModel): Promise<ObjectId> {

        const newBlog: BlogViewModel = {
            id: Date.now().toString(),
            name: body.name,
            description: body.description,
            websiteUrl: body.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }

        return await blogsRepository.createBlog(newBlog) // данный запрос возвращается нам айдишку блога в виде insertedId

    },
    async updateBlog(id: string, body: BlogInputModel) {
        return await blogsRepository.updateBlog(id, body)
    },
    async deleteBlog(id: string) {
        return await blogsRepository.deleteBlog(id)
    }
}
