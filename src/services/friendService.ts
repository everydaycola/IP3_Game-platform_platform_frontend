import axios from "axios";
import type {FriendList} from "../models/apiTypes/FriendList.ts";

export async function findAllFriends(){
    const {data: friends} = await axios.get<FriendList>('/user/friends')
    return friends
}

export async function findAllOpenFriendRequests(){
    const {data: friends} = await axios.get<FriendList>('/user/friends/requests')
    return friends
}