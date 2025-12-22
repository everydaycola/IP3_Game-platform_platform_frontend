import axios from "axios";
import type {PlatformUser, PlatformUserUpdateType} from "../models/platformuser/platformUser.ts";
import type {OwnedCopy} from "../models/game/OwnedCopy.ts";

export async function getPlatformUserData(){
    const {data: platformUser} = await axios.get<PlatformUser>('/user')
    return platformUser
}

export async function updateUserProfile(data: PlatformUserUpdateType){
    const {data: platformUser} = await axios.patch<PlatformUser>('/user', data)
    return platformUser
}

export async function getOwnedGames(){
    const {data: ownedCopies} = await axios.get<OwnedCopy[]>('/user/library')
    return ownedCopies
}

export async function addCredits(amount: number){
    const {data: response} = await axios.post('/user/credit', {amount: amount})
    return response
}


export async function buyGame(gameId: string){
    const {data: ownedCopy} = await axios.post<OwnedCopy>('/user/buy', {gameId: gameId})
    return ownedCopy
}