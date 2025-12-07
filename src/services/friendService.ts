import axios from "axios";
import type {FriendList, FriendRequestList} from "../models/apiTypes/FriendList.ts";

export async function findAllFriends(){
    const {data: friends} = await axios.get<FriendList>('/user/friends')
    return friends
}

export async function findAllOpenFriendRequests(){
    const {data: friends} = await axios.get<FriendRequestList>('/user/friends/requests')
    return friends
}