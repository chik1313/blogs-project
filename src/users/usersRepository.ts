import {
    PasswordRecoveryViewType,
    UserCreateTypeModel,
    UserFullDBModel,
    UserFullViewModel,
    UserSchemaType
} from "../types/users-types";
import {usersCollection} from "../db/mongoDb";
import {ObjectId} from "mongodb";
import {userMapper} from "./dto/userMapper";

export class UsersRepository {
    async findUserByLoginOrEmail(login: string, email: string): Promise<UserSchemaType | null> {
        let findUser = await usersCollection.findOne({
            $or: [{login}, {email}]
        })

        if (!findUser) {
            return null
        }
        return findUser

    }

    async getUserById(id: string){
        const user = await usersCollection.findOne({_id: new ObjectId(id)}, {projection: {password: 0}})
        if (!user) {
            return null
        }
        return user
    }

    async getUserByLoginOrEmail (loginOrEmail: string) : Promise<UserFullDBModel | null>{
        const user = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]},{projection: {password: 0}})
        if (!user) {
            return null
        }
        return user
    }

    async createUser(user: UserCreateTypeModel): Promise<string> {
        let res = await usersCollection.insertOne(user)
        return res.insertedId.toString()
    }

    async deleteUser(id: string): Promise<boolean> {
        const deletedRes = await usersCollection.deleteOne({_id: new ObjectId(id)})
        return deletedRes.deletedCount === 1
    }

    async checkUserByLoginOrEmail (loginOrEmail:string):Promise<UserSchemaType | null> {
        let findUser = await usersCollection.findOne({$or: [{login:loginOrEmail}, {email:loginOrEmail}]})

        if (!findUser) {
            return null
        }
        return findUser
    }

    async findUserByConfirmationCode ( code: string ):Promise<UserFullViewModel | null> {
        let findUser = await usersCollection.findOne({"emailConfirmation.confirmationCode": code});
        return findUser ? userMapper(findUser) : null
    }

    async confirmationUserByCode (isConfirmed: boolean  , userId: string) {
        let result = await usersCollection.updateOne(
            { _id: new ObjectId(userId)},
            {
                $set: {"emailConfirmation.isConfirmed": isConfirmed}
            }
        )
        return result.matchedCount === 1;
    }
    async updateConfirmationCode (email:string , confirmationCode:string) {
        let result = await usersCollection.updateOne(
            { email:  email},
            {
                $set: {"emailConfirmation.confirmationCode": confirmationCode}
            }
        )
        return result.matchedCount === 1;
    }
    async updateUserRecoveryCode (email:string, passwordRecoveryData: PasswordRecoveryViewType) {
        const result = await usersCollection.findOneAndUpdate(
            {email:  email},
            {
                $set: { passwordRecovery: passwordRecoveryData}
            }
        )
    }
    async findUserByRecoveryCode ( recoveryCode: string ) : Promise< UserFullViewModel | null> {
        const findUserByCode =  await usersCollection.findOne({"passwordRecovery.recoveryCode": recoveryCode})
        return findUserByCode ? userMapper(findUserByCode) : null
    }

    async updateUserPassword (id:string , password : string) {
        const res = await usersCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { password : password , 'passwordRecovery.isConfirmed': true } }
        )
        return res.matchedCount === 1;
    }
}


