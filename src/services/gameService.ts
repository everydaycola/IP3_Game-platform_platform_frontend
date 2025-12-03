import axios from "axios";
import type {CompactGame, Game} from "../models/Game.ts";


export async function checkGameReachable(gameUrl: string): Promise<boolean>{
    try{
        await axios.get(gameUrl);
        return true;
    }catch(e){
        return false;
    }
}

export async function getGame(gameId:string){
    const {data:game} = await axios.get<Game>(`/games/${gameId}`)
    return game
}

export async function findAllGames(){
    const {data: games} = await axios.get<CompactGame[]>('/games')
    return games
}

export async function addFavoriteGame(gameId:string){
    const {data:game} = await axios.post<Game>(`/games/favorite/${gameId}`)
    return game;
}
export async function removeFavoriteGame(gameId:string){
    await axios.delete(`/games/favorite/${gameId}`)
    return true;
}