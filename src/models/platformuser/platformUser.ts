//To not get confused. This is the 'PlatformUser' The 'user' type is the 'JWT user'
import type {UserAchievement} from "../achievement/UserAchievement.ts";

export type PlatformUser = {
    userName: string
    biography: string
    achievements: UserAchievement[]
}