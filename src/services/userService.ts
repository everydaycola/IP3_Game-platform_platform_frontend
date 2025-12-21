import axios from "axios";
import type {PlatformUser, PlatformUserUpdateType} from "../models/platformuser/platformUser.ts";

export async function getPlatformUserData(){
    const {data: platformUser} = await axios.get<PlatformUser>('/user')
    return platformUser
}

export async function updateUserProfile(data: PlatformUserUpdateType){
    const {data: platformUser} = await axios.patch<PlatformUser>('/user', data)
    return platformUser
}