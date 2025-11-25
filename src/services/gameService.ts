import axios from "axios";
import type {CompactGame} from "../models/Game.ts";

export async function findAllGames(){
    const {data: games} = await axios.get<CompactGame[]>('/games')
    return games
}