import axios from "axios";
import type {FriendList, FriendRecommendationList, FriendRequestList} from "../models/apiTypes/FriendList.ts";
import type {FriendRelation} from "../models/apiTypes/FriendRelation.ts";

export async function findAllFriends(){
    const {data: friends} = await axios.get<FriendList>('/user/friends')
    return friends
}

export async function findAllOpenFriendRequests(){
    const {data: friends} = await axios.get<FriendRequestList>('/user/friends/requests')
    return friends
}

export async function acceptFriendRequest(friendUserName:string){
    const{data: friend} = await axios.patch<FriendRelation>(`/user/friends/${friendUserName}/accept`)
    return friend;
}

export async function denyFriendRequest(friendUserName:string){
    const{data: friend} = await axios.patch<FriendRelation>(`/user/friends/${friendUserName}/deny`)
    return friend;
}

export async function postFriendRequest(friendUserName:string){
    const{data:friends} = await axios.post<FriendList>(`/user/friends/${friendUserName}`)
    return friends
}

export async function getFriendRecommendations(nameQuery?:string){
    const query = new URLSearchParams();
    if(nameQuery) query.append('nameQuery',nameQuery);

    const {data:friendRecommendations} = await axios.get<FriendRecommendationList>(`/user/friends/recommendations?${query.toString()}`);
    return friendRecommendations;
}