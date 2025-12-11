import axios from "axios";
import type {PlatformUser} from "../models/platformuser/platformUser.ts";

export async function getPlatformUserData(){
    const {data: platformUser} = await axios.get<PlatformUser>('/user')
    return platformUser
}