import {ObjectId} from "mongodb";

export type SessionType = {
    _id: ObjectId,
    userId: ObjectId,
    title: string,
    ip: string,
    iat: number,
    exp: number,
}

export type SessionTypeForResponse = {
    ip: string,
    title: string,
    lastActiveDate: string,
    deviceId: string
}
