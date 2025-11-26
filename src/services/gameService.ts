import axios from "axios";
import type {CompactGame, Game} from "../models/Game.ts";


export async function getGame(gameId:string){
    const {data:game} = await axios.get<Game>(`/games/${gameId}`)
    return game
}

export async function findAllGames(){
    const {data: games} = await axios.get<CompactGame[]>('/games')
    return games
}