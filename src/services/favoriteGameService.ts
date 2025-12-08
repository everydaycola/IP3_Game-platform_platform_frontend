import axios from "axios";
import type {Game} from "../models/Game.ts";
import type {FavoriteGame} from "../models/FavoriteGame.ts";


export async function getFavoriteGames(){
    const {data:games} = await axios.get<FavoriteGame[]>(`/games/favorite`)
    return games
}

export async function isFavoriteGame(gameId: string){
    try {
        await axios.get(`/games/favorite/${gameId}`);
        return true;
    } catch (err: unknown) {
        if (axios.isAxiosError(err) && err.response?.status === 404) {
            return false;
        }
        throw err;
    }
}

export async function addFavoriteGame(gameId:string){
    const {data:game} = await axios.post<Game>(`/games/favorite/${gameId}`)
    return game;
}
export async function removeFavoriteGame(gameId:string){
    await axios.delete(`/games/favorite/${gameId}`)
    return true;
}