import {postsRepository} from "./postsRepository";
import {CreatePostType, PostInputModel, PostViewModel, ResponsePostsType} from "../types/posts-types";
import {ObjectId} from "mongodb";
import {blogsRepository} from "../blogs/blogsRepository";
import {sortType} from "../types/sort-types";
import {getPostViewModel} from "./output/getPostViewModel";

export const postsService = {

    async getAllPosts (sortData:sortType): Promise<ResponsePostsType>
    {
        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await postsRepository.getAllPosts(sortData)

        const postsCount = await postsRepository.getPostsCount()
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : mappedPosts
        }
    },
    async getPostsFromBlogId ( blogId: string, sortData: sortType ) {

        const { pageNumber , pageSize , sortBy , sortDirection } = sortData

        const posts = await postsRepository.getPostsByBlogId(blogId , sortData)
        if (posts.length < 1) return null

        const postsCount = await postsRepository.getPostsCountById(blogId)
        const mappedPosts = posts.map(getPostViewModel)

        return {
            pagesCount: Math.ceil( postsCount / pageSize),
            page: pageNumber,
            pageSize,
            totalCount: postsCount,
            items : mappedPosts
        }

    },
    async getPostById ( id: string ):Promise<PostViewModel | null> {
        return postsRepository.getPostById( new ObjectId( id ) )
            .then(post => post ?  getPostViewModel(post): null)
    },
    async getPostByMongoID (_id: ObjectId) {
        return postsRepository.getPostById(_id)
            .then(post => post ? getPostViewModel(post) : null)
    },

    async createPost (body: PostInputModel) : Promise<ObjectId | null> {

        let blog = await blogsRepository.getBlogById( new ObjectId(body.blogId) )


        if (!blog) {
            return null
        }


        let newPost: CreatePostType = {
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            blogId: body.blogId,
            blogName: blog.name || " new Name " ,
            createdAt: new Date().toISOString(),
        }

        return await postsRepository.createPost(newPost)

    },
    async updatePost (id: string, body: PostInputModel ) {

        return await postsRepository.updatePost( new ObjectId(id), body )
    },
    async deletePost (id: string) {
        return await postsRepository.deletePost( new ObjectId(id) )
    }

}
