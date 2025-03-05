import jwt, {JwtPayload} from 'jsonwebtoken'
import {SETTINGS} from "../../settings";

export interface RefreshJWTPayload extends JwtPayload{
    userId: string;
    deviceId: string;
    token: string
}
export const jwtService = {
    async createJWT(userId: string): Promise<string> {
        return jwt.sign({userId}, SETTINGS.JWT_SECRET, {expiresIn: '10s'});

    },
    async createRefresh(userId: string, deviceId: string): Promise<string> {
        return jwt.sign({userId, deviceId}, SETTINGS.REFRESH_SECRET, {expiresIn: '20s'});
    },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, SETTINGS.JWT_SECRET)
            const userId = result.userId
            return userId
        } catch (error) {
            return null
        }

    },
     verifyRefreshToken (token:string): RefreshJWTPayload | null {
        try {
            return jwt.verify(token, SETTINGS.REFRESH_SECRET) as (RefreshJWTPayload | null)
        } catch (error) {
            return null
        }
    },
    jwtDecodeToken(token:string) {
        return jwt.decode(token) as JwtPayload
    }
}
