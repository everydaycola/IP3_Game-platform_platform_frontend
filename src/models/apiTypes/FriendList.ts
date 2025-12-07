import type {FriendRelation} from "./FriendRelation.ts";

export type FriendList = {
    id:"",
    friends:FriendRelation[]
};

export type FriendRequestList ={
    friends:FriendRelation[]
};