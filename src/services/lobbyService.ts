import axios from "axios";
import type {Lobby} from "../models/lobby/Lobby.ts";
import type {StartedGameResponse} from "../models/lobby/StartedGameResponse.ts";



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
export async function lobbyStartGame(lobby:Lobby){
    const {data} = await axios.post<StartedGameResponse>(`/lobby/${lobby.id}/start`, {
        player1Id: lobby.players[0]?.userId || "",
        player2Id:lobby.players[1]?.userId || ""
    })
    return data;
}