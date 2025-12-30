import axios from "axios";
import type {Lobby} from "../models/lobby/Lobby.ts";


export async function findLobby(lobbyId: string){
    const {data: lobby} = await axios.get<Lobby>(`/lobby/${lobbyId}`);
    return lobby;
}
export async function findAllLobbies(){
    const {data: lobbies} = await axios.get<Lobby[]>('/lobby')
    return lobbies
}

export async function patchJoinLobby(lobbyId: string){
    const {data:lobby} = await axios.patch<Lobby>(`/lobby/${lobbyId}`);
    return lobby;
}

export async function createLobby(gameId:string){
    const{data:lobby} = await axios.post<Lobby>('/lobby', {gameId:gameId})
    return lobby;
}