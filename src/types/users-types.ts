import {ObjectId} from "mongodb";

export type UserSchemaType = {
    _id: ObjectId
    login: string,
    email: string,
    createdAt: string,
    password: string
}

export type UserSecureType = {
    _id: ObjectId
    login: string,
    email: string,
    createdAt: string,
}


export type UserInputModel = {
    login:string,
    password:string,
    email:string,
}

export type UserCreateType = {
    login: string,
    email: string,
    createdAt: string,
    password: string
}

export type ResponseUserType = {
    pagesCount: number,
    page: number ,
    pageSize: number,
    totalCount: number,
    items: UserSchemaType[]
}

export type UsersQueryInputType = {
    sortBy: string | 'createdAt',
    sortDirection: "asc" | "desc",
    pageNumber: number,
    pageSize: number,
    searchLoginTerm: string | null,
    searchEmailTerm: string | null,
}
