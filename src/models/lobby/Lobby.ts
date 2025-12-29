import type {Player} from "./Player.ts";

export interface Lobby{
    id:string;
    gameId:string;
    players:Player[],
    creationDate: Date,
    maxPlayers:number;
}