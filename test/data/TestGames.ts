import type {CompactGame} from "../../src/models/game/Game.ts";
import type {FavoriteGame} from "../../src/models/game/FavoriteGame.ts";

export const compactGame1: CompactGame = {
    id: "1",
    name: "Tic Tac Toe",
    icon: "icon.png",
    genre: "Puzzle",
    url: "http://localhost:1234"
}

export const compactGame2: CompactGame = {
    id: "2",
    name: "Go",
    icon: "GoIcon.png",
    genre: "Strategy",
    url: "http://localhost:1235"
}
export const compactGame3: CompactGame = {
    id: "3",
    name: "Chess",
    icon: "ChessIcon.png",
    genre: "Strategy",
    url: "http://localhost:1236"
}

export const compactGameList : CompactGame[] =[compactGame1,compactGame2,compactGame3];
export const emptyCompactGameList: CompactGame[] = [];


export const favoriteGame1: FavoriteGame={
    id:"5",
    gameId:"1"
}

export const favoriteGamesList: FavoriteGame[] = [favoriteGame1];
export const emptyFavoriteGamesList: FavoriteGame[] = [];