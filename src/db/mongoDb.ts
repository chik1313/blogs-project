import {SETTINGS} from "../settings";
import {MongoClient} from "mongodb";
import type {Collection} from 'mongodb'
import {SessionType} from "../sessions/types/session-types";
import mongoose, {Schema} from "mongoose";
import {BlogDbType} from "../types/blog-types";
import {CreatePostType} from "../types/posts-types";
import {UserCreateTypeModel, UsersSchemaType} from "../types/users-types";


export let commentsCollection: Collection<any>
export let deviceCollection: Collection<SessionType>
export let countRequestsCollection: Collection<any>

const BlogsSchema = new mongoose.Schema<BlogDbType>({
    name: { type:String , required:true},
    description: { type:String , required:true},
    websiteUrl: { type:String , required:true},
    createdAt: { type:String , required:true},
    isMembership: { type: Boolean , required:true}
})
export const BlogsModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.BLOGS, BlogsSchema)

const PostsSchema = new mongoose.Schema<CreatePostType>({
    title: { type:String, required:true},
    shortDescription: { type:String, required:true},
    content: { type:String, required:true},
    blogId: { type:String, required:true},
    blogName: { type:String, required:true},
    createdAt: { type:String, required:true},
})

export const PostsModel = mongoose.model(SETTINGS.DB_COLLECTION_NAME.POSTS, PostsSchema)

const UsersSchema = new mongoose.Schema<UsersSchemaType>({
    accountData: {
        login: { type:String, required:true},
        email: { type:String, required:true},
        passwordHash: { type:String, required:true},
        createdAt: { type:String, required:true},
    },
    emailConfirmation: {
        confirmationCode: { type:String , required:true},
        expirationDate: { type:Date , required:true},
        isConfirmed: { type:Boolean , required:true},
    },
    passwordRecovery: {
        recoveryCode: { type:String , default: null},
        expirationDate: { type:Date , required:true},
        isConfirmed: { type:Boolean , required:true}
    }
})

export const UsersModel =  mongoose.model(SETTINGS.DB_COLLECTION_NAME.USERS, UsersSchema)

const CommentsSchema = new mongoose.Schema

export async function runDb(url: string): Promise<boolean> {
    let client = new MongoClient(url)
    let db = client.db(SETTINGS.DB_NAME)


    commentsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.COMMENTS)
    deviceCollection = db.collection<SessionType>(SETTINGS.DB_COLLECTION_NAME.TOKEN)
    countRequestsCollection = db.collection<any>(SETTINGS.DB_COLLECTION_NAME.RATE)

    try {
        await mongoose.connect(url);
        /*await client.connect();*/
        /*await db.command({ping: 1});*/
        if (mongoose.connection.readyState !== 1) {
            throw new Error('Error connecting to MongoDB')
        }
        console.log('connected to db')
        return true
    } catch (err) {
        console.error(err);
        await mongoose.disconnect();
        return false;
    }
}
