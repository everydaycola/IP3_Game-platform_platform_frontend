import axios from "axios";
import type {PlatformUser} from "../models/platformUser.ts";

export async function getPlatformUserData(){
    const {data: platformUser} = await axios.get<PlatformUser>('/user')
    return platformUser
}